import React, { useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import Table from "react-bootstrap/Table";
import Rate_Chart_Service from "../service/Rate_Chart_Service";
import Swal from "sweetalert2";
import serviceMaster from "../service/serviceMaster";
import { animateScroll as scroll } from "react-scroll";
import AuthContext from "../Components/AuthProvider";
import Pagination from "react-bootstrap/Pagination";
import { useNavigate } from "react-router-dom";
import "../Components/Style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxios from "../Components/useAxios";
import axios from "axios";
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
  Button,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAtom,
  faEye,
  faHandsHoldingCircle,
  faPlus,
  faRefresh,
  faSearch,
  faUserCheck,
} from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  faCheck,
  faSave,
  faTimes,
  faSyncAlt,
} from "@fortawesome/free-solid-svg-icons";
import ipaddress from "../Components/IpAddress";
export default function BillingHeads() {
  const [company_Id, setcompanyId] = useState("");
  const [branch_Id, setbranch_Id] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [taxId, setTaxId] = useState("");
  const [serviceShortDescription, setServiceShortDescription] = useState("");
  const [serviceLongDescription, setServiceLongDescription] = useState("");
  const [serviceUnit, setServiceUnit] = useState("");
  const [serviceUnit1, setServiceUnit1] = useState("");
  const [serviceType, setServiceType] = useState("Rec");
  const [taxApplicable, setTaxApplicable] = useState("N");
  const [taxPercentage, setTaxPercentage] = useState("");
  const [sacCode, setSacCode] = useState("");
  const [rateCalculation, setRateCalculation] = useState("");
  const [status, setStatus] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [approvedBy, setApprovedBy] = useState("");
  const [service, setService] = useState([]);
  const [createdDate, setCreatedDate] = useState("");
  const [editedBy, setEditedBy] = useState("");
  const [editedDate, setEditedDate] = useState("");
  const [approvedDate, setApprovedDate] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [discountDays, setDiscountDays] = useState("");
  const [discountAmount, setDiscountAmount] = useState("");
  const [serviceNewDescription, setServiceNewDescription] = useState("");
  const [serviceChangeDate, setServiceChangeDate] = useState("");
  const [serviceGroup, setServiceGroup] = useState("");
  const [typeOfCharges, setTypeOfCharges] = useState("N");
  const [errors, setErrors] = useState({});
  const [CreatedUser, setCreatedUser] = useState("");
  const [approvedUser, setApprovedUser] = useState("");
  const [isDefaultService, setIsDefaultService] = useState(true);

  const [serviceData, setServiceData] = useState([]);
  const [originalServiceData, setOriginalServiceData] = useState([]);

  // const axios = useAxios();

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

  const [loading, setLoading] = useState(true);
  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(255, 255, 255, 0.8)", // Adjust the opacity and color as needed
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999, // Ensure the overlay is above other elements
    },
  };
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

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const processId = queryParams.get('process_id');

  const foundRights = role !== 'ROLE_ADMIN' ? userRights.find(item => item.process_Id === processId) : null;
  const allowCreate = foundRights?.allow_Create === 'Y';
  const allowRead = foundRights?.allow_Read === 'Y';
  const allowEdit = foundRights?.allow_Update === 'Y';
  const allowDelete = foundRights?.allow_Delete === 'Y';

  useEffect(() => {
    getAllServices(companyid, branchId);
    setcompanyId(companyid);
    setbranch_Id(branchId);
  }, []);

  const getAllServices = async (companyid, branchId) => {
    serviceMaster.getServices(companyid, branchId).then((res) => {
      // console.log(res.data);
      setOriginalServiceData(res.data);
      setServiceData(res.data);
      setLoading(false);
      setService(res.data);
    });
  };

  const makeFieldEmpty = () => {
    setServiceId("");
    setServiceShortDescription("");
    setServiceLongDescription("");
    setServiceUnit("");
    setServiceUnit1("");
    setServiceType("");
    setTaxApplicable("N");
    setTaxPercentage("");
    setSacCode("");
    setRateCalculation("");
    setStatus("");
    setCreatedBy("");
    setApprovedBy("");
    setCreatedDate("");
    setEditedDate("");
    setApprovedDate("");
    setServiceNewDescription("");
    setServiceChangeDate("");
    setServiceGroup("");
    setTypeOfCharges("N");
    setErrors("");
    setServiceType("Rec");
    setDiscountPercentage("");
    setDiscountDays("");
    setDiscountAmount("");
    setcompanyId("");
    setCreatedUser("");
    setApprovedUser("");
    setTaxId("");
    setFormErrors({
      serviceShortDescription: "",
      serviceUnit: "",
      sacCode: "",
      serviceLongDescription: "",
      taxPercentage: "",
    });
  };

  const services = {
    serviceId,
    serviceShortDescription,
    serviceLongDescription,
    serviceUnit,
    serviceUnit1,
    serviceType,
    taxId,
    taxApplicable,
    taxPercentage,
    sacCode,
    status,
    createdBy: userId,
    approvedBy,
    rateCalculation,
    createdDate,
    editedDate,
    serviceGroup,
    serviceChangeDate,
    serviceNewDescription,
    typeOfCharges,
    editedBy,
    editedDate,
    discountPercentage,
    setDiscountDays,
    discountAmount,
    company_Id,
    branch_Id,
  };

  const [formErrors, setFormErrors] = useState({
    serviceShortDescription: "",
    serviceLongDescription: "",
    taxPercentage: "",
    serviceUnit: "",
    serviceUnit1: "",
    sacCode: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items to display per page
  const totalPages = Math.ceil(serviceData.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const itemsToDisplay = serviceData.slice(startIndex, endIndex);

  const [tax, setTaxs] = useState([]);
  const [getTaxId, setTaxIdTax] = useState({});
  const fetchTax = async () => {
    try {
      const response = await fetch(
        `${ipaddress}taxController/getTaxList/${companyid}/${branchId}`
      );
      const data = await response.json();
      const namesMap = {};
      data.forEach((tax) => {
        namesMap[tax.taxId] = tax.taxPercentage;
      });
      setTaxIdTax(namesMap);
      setTaxs(data);
    } catch (error) {
      console.error("Error fetching party names:", error);
    }
  };
  useEffect(() => {
    fetchTax();
  }, []);

  const [searchCriteria, setSearchCriteria] = useState({
    serviceShortDesc: "",
    serviceId: "",
    sacCode: "",
  });

  const handleSearch = () => {
    setLoading(true);
    const filteredServiceData = originalServiceData.filter((service) => {
      const trimmedServiceId = searchCriteria.serviceId.trim();
      const trimmedServiceDesc = searchCriteria.serviceShortDesc.trim();
      const trimmedSacCode = searchCriteria.sacCode.trim();

      const matchServiceId =
        !trimmedServiceId ||
        (service.serviceId &&
          service.serviceId
            .toLowerCase()
            .includes(trimmedServiceId.toLowerCase()));

      const matchServiceShortDescription =
        !trimmedServiceDesc ||
        (service.serviceShortDesc &&
          service.serviceShortDesc
            .toLowerCase()
            .includes(trimmedServiceDesc.toLowerCase()));

      const matchSacCode =
        !trimmedSacCode ||
        (service.sacCode &&
          service.sacCode.toLowerCase().includes(trimmedSacCode.toLowerCase()));

      return matchServiceId && matchServiceShortDescription && matchSacCode;
    });
    setLoading(false);
    setServiceData(filteredServiceData);
    setCurrentPage(1);
    console.log("Filtered Service Data:", filteredServiceData);
  };

  const handleReset = () => {
    setSearchCriteria({
      serviceShortDesc: "",
      serviceId: "",
      sacCode: "",
    });
    // serviceAllData();
    setCurrentPage(1);
    setServiceData(originalServiceData);
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

  const addNewEntry = () => {
    navigate(`/master/billingHeadsAddPage`, { state: { flag: "add" } });
  };

  const EditService = (serviceId) => {
    navigate(`/master/billingHeadsAddPage`, {
      state: { flag: "edit", serviceId: serviceId },
    });
  };
  const deleteService = (id) => {
    Swal.fire({
      title: "Are you sure?",
      html: "Are you sure you want to delete the record?",
      icon: "warning",
      showCancelButton: true,
      customClass: {
        icon: "icon-smaller", // Apply the custom class to the icon
      },
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, close it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(
            `${ipaddress}service/deleteService?companyId=${companyid}&branchId=${branchId}&serviceId=${id}`,
            // null,
            {
              //     headers: {
              //         Authorization: `Bearer ${jwtToken}`
              //     }
            }
          )
          .then((response) => {
            getAllServices(companyid, branchId);
            if (response.data === "success") {
              Swal.fire({
                title: "Deleted!",
                text: "Data deleted successfully!!!",
                icon: "success",
              });
            }
          })
          .catch((error) => { });
      }
    });
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

      <div className="container">
        <h5
          className="pageHead"
          style={{
            fontFamily: "Your-Heading-Font",
            paddingLeft: "4%",
            paddingRight: "-50px",
          }}
        >
          <FontAwesomeIcon
            icon={faHandsHoldingCircle}
            style={{
              marginRight: "8px",
              color: "black", // Set the color to golden
            }}
          />
          Service Master
        </h5>
        <Card>
          <CardBody>
            <Row className="justify-content-end">
              {(role !== 'ROLE_ADMIN' && allowCreate) || (role === 'ROLE_ADMIN') ? (
                <Col xs="auto">
                  <button
                    className="btn btn-outline-success btn-margin newButton"
                    style={{ marginRight: 10 }}
                    id="submitbtn2"
                    onClick={addNewEntry}
                  >
                    <FontAwesomeIcon
                      icon={faPlus}
                      style={{ marginRight: "5px" }}
                    />
                    New Entry
                  </button>
                </Col>
              ) : null}
            </Row>
            <hr
              style={{ margin: "0", marginBottom: "9px", marginTop: "9px" }}
            />
            <Row>
              <Col md={3}>
                <FormGroup>
                  <Label className="forlabel" for="serviceShortDesc">
                    Service Name
                  </Label>
                  <Input
                    type="text"
                    name="serviceShortDesc"
                    value={searchCriteria.serviceShortDesc}
                    // onChange={handleInputChange}
                    onChange={(e) =>
                      setSearchCriteria({
                        ...searchCriteria,
                        serviceShortDesc: e.target.value,
                      })
                    }
                    placeholder="Enter Service Name"
                    maxLength={75}
                  />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label className="forlabel" for="serviceId">
                    Service Id
                  </Label>
                  <Input
                    type="text"
                    maxLength={10}
                    name="serviceId"
                    value={searchCriteria.serviceId}
                    //onChange={handleInputChange}
                    onChange={(e) =>
                      setSearchCriteria({
                        ...searchCriteria,
                        serviceId: e.target.value,
                      })
                    }
                    placeholder="Service Id"
                  />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label className="forlabel" for="sacCode">
                    SAC Code
                  </Label>
                  <Input
                    type="text"
                    name="sacCode"
                    value={searchCriteria.sacCode}
                    //onChange={handleInputChange}
                    maxLength={6}
                    onChange={(e) =>
                      setSearchCriteria({
                        ...searchCriteria,
                        sacCode: e.target.value,
                      })
                    }
                    placeholder="SAC Code"
                  />
                </FormGroup>
              </Col>
              <Col md={3}>
                <div style={{ marginTop: 30 }}>
                  <Button
                    color="success"
                    outline
                    style={{ marginRight: "5px" }}
                    onClick={handleSearch}
                  >
                    <FontAwesomeIcon
                      icon={faSearch}
                      style={{ marginRight: "5px" }}
                    />
                    Search
                  </Button>
                  <Button color="danger" outline onClick={handleReset}>
                    <FontAwesomeIcon
                      icon={faRefresh}
                      style={{ marginRight: "5px" }}
                    />
                    Reset
                  </Button>
                </div>
              </Col>
            </Row>

            <div className="text-center mt-"></div>
            <hr />

            <div className="table-responsive">
              <table className="table table-bordered table-hover tableHeader">
                <thead style={{}}>
                  <tr className="text-center">
                    <th scope="col" style={{}}>
                      Service Id
                    </th>
                    <th scope="col" style={{}}>
                      Service Name
                    </th>
                    <th scope="col" style={{}}>
                      SAC Code
                    </th>
                    <th scope="col" style={{}}>
                      Service Type
                    </th>
                    <th scope="col" style={{}}>
                      Created By
                    </th>
                    <th scope="col" style={{}}>
                      Status
                    </th>
                    <th scope="col" style={{}}>
                      Action
                    </th>
                  </tr>
                </thead>

                {itemsToDisplay.length === 0 ? (
                  <tbody className="text-center">
                    <tr>
                      <td colSpan="8">No Records</td>
                    </tr>
                  </tbody>
                ) : (
                  <tbody>
                    {itemsToDisplay.map((servicemaster, index) => (
                      <tr key={index} className="text-center">
                        <td className="table-column">
                          {servicemaster.serviceId}
                        </td>
                        <td className="table-column">
                          {servicemaster.serviceShortDesc}
                        </td>
                        <td className="table-column">
                          {servicemaster.sacCode}
                        </td>
                        <td className="table-column">
                          {servicemaster.serviceType === "Rec"
                            ? "Receivable"
                            : servicemaster.serviceType === "Imp"
                              ? "Import"
                              : servicemaster.serviceType === "Exp"
                                ? "Export"
                                : servicemaster.serviceType === "All"
                                  ? "All"
                                  : ""}
                        </td>
                        <td className="table-column">
                          {servicemaster.createdBy}
                        </td>
                        <td className="table-column">
                          {servicemaster.status === "A"
                            ? "Approved"
                            : servicemaster.status === "U"
                              ? "Edit"
                              : servicemaster.status === "N"
                                ? "New"
                                : servicemaster.status === "D"
                                  ? "Deleted"
                                  : ""}
                        </td>
                        {/* <td className="text-center">
                          <div className="">
                            <button
                              type="button"
                              className="btn btn-primary dropdown-toggle"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <FontAwesomeIcon
                                icon={faAtom}
                                style={{ marginRight: "5px" }}
                              />
                              Action
                            </button>
                            <ul className="dropdown-menu">
                              <li>
                                <button
                                  className="btn btn-outline-primary btn-margin newButton"
                                  style={{ marginRight: 3 }}
                                  id="submitbtn2"
                                  onClick={() =>
                                    EditService(servicemaster.serviceId)
                                  }
                                >
                                  <FontAwesomeIcon
                                    icon={faEdit}
                                    style={{ marginRight: "5px" }}
                                  />
                                  Edit
                                </button>
                              </li>

                              <li>
                                {" "}
                                <button
                                  className="btn btn-outline-danger btn-margin newButton"
                                  style={{ marginRight: 3 }}
                                  id="submitbtn2"
                                  onClick={() =>
                                    deleteService(servicemaster.serviceId)
                                  }
                                >
                                  <FontAwesomeIcon
                                    icon={faTrash}
                                    style={{ marginRight: "5px" }}
                                  />
                                </button>
                              </li>
                            </ul>
                          </div>
                        </td> */}
                        <td>
                          {(role !== 'ROLE_ADMIN' && allowEdit) || (role === 'ROLE_ADMIN') ? (
                            <button
                              className="btn btn-outline-primary btn-margin newButton"
                              style={{ marginRight: 3 }}
                              id="submitbtn2"
                              onClick={() => EditService(servicemaster.serviceId)}
                            >
                              <FontAwesomeIcon
                                icon={faEdit}
                                style={{ marginRight: "5px" }}
                              />
                            </button>
                          ) : null}

                          {/* {(role !== 'ROLE_ADMIN' && allowDelete) || (role === 'ROLE_ADMIN') ? (
                            <button
                              className="btn btn-outline-danger btn-margin newButton"
                              style={{ marginRight: 3 }}
                              id="submitbtn2"
                              onClick={() =>
                                deleteService(servicemaster.serviceId)
                              }
                            >
                              <FontAwesomeIcon
                                icon={faTrash}
                                style={{ marginRight: "5px" }}
                              />
                            </button>
                          ) : null} */}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
            <div
              style={{ display: "flex", justifyContent: "center" }}
              className=" text-center"
            >
              <Pagination
                style={{
                  display: "flex",
                  justifyContent: "center",
                  color: "gray",
                  marginTop: "5px",
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
                <Pagination.Last onClick={() => handlePageChange(totalPages)} />
              </Pagination>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
