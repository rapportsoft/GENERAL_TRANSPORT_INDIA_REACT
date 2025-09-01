import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ipaddress from "../Components/IpAddress";
import {
  Row,
  Col,
  Input,
  Form,
  FormGroup,
  Label,
  Card,
  CardBody,
  Modal,
  Table,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
} from "reactstrap";
import AuthContext from "../Components/AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsRotate,
  faArrowsToEye,
  faAtom,
  faBackward,
  faBoxesStacked,
  faEdit,
  faEye,
  faFileAlt,
  faFolderPlus,
  faMagnifyingGlass,
  faPlus,
  faSave,
  faTrash,
  faTruckArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { MDBIcon } from "mdbreact";
import { Pagination } from "react-bootstrap";
import useAxios from '../Components/useAxios';
export default function IsoContainer() {

  const axios = useAxios();
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


  const queryParams = new URLSearchParams(location.search);
  const processId = queryParams.get('process_id');

  const foundRights = role !== 'ROLE_ADMIN' ? userRights.find(item => item.process_Id === processId) : null;
  const allowCreate = foundRights?.allow_Create === 'Y';
  const allowRead = foundRights?.allow_Read === 'Y';
  const allowEdit = foundRights?.allow_Update === 'Y';
  const allowDelete = foundRights?.allow_Delete === 'Y';

  const [showModal, setShowModal] = useState(false);
  const [isAddOnly, setIsAddOnly] = useState(false);

  const handleOpenModal = () => {
    handleReset();
    resetFieldErrors();
    setIsAddOnly(true);
    setIsViewReadOnly(false);
    setIsModifyOnly(false);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetFieldErrors();
  };
  const [cSizeList, setcSizeList] = useState([]);

  useEffect(() => {
    fetch(`${ipaddress}jardetail/jarIdList/J00004/${companyid}`)
      .then((response) => response.json())
      .then((data) => setcSizeList(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const [cTypeList, setcTypeList] = useState([]);
  const [isoContainerList, setisoContainerList] = useState([]);

  useEffect(() => {
    fetch(`${ipaddress}jardetail/jarIdList/J00005/${companyid}`)
      .then((response) => response.json())
      .then((data) => setcTypeList(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const [isoContainer, setisoContainer] = useState({
    companyId: companyid,
    isoCode: null,
    containerType: null,
    containerSize: null,
    tareWeight: null,
    reeferType: "N",
    openTopType: "N",
    createdBy: userId,
    editedBy: userId,
    approvedBy: userId,
    status: "A",
  });
  const [isoContainerSearch, setisoContainerSearch] = useState({
    isoCodeSearch: null,
    containerTypeSearch: null,
    containerSizeSearch: null,
    tareWeightSearch: null,
  });

  const { isoCodeSearch, containerTypeSearch, containerSizeSearch } =
    isoContainerSearch;
  const {
    companyId,
    isoCode,
    containerType,
    containerSize,
    tareWeight,
    reeferType,
    openTopType,
    createdBy,
    editedBy,
    approvedBy,
    status,
  } = isoContainer;

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSearchReset = () => {
    setFormData(initialFormData);
    handleGetData();
    setCurrentPage1(1);
  };

  const handleReset = () => {
    setisoContainer({
      companyId: companyid,
      isoCode: "",
      containerType: "",
      containerSize: "",
      tareWeight: "",
      reeferType: "N",
      openTopType: "N",
      createdBy: userId,
      editedBy: userId,
      approvedBy: userId,
      status: "A",
    });
    resetFieldErrors();
    handleGetData();
  };
  const [fieldErrors, setFieldErrors] = useState({
    isoCode: false,
    containerSize: false,
    containerType: false,
    tareWeight: false,
  });
  const resetFieldErrors = () => {
    setFieldErrors({
      isoCode: false,
      containerSize: false,
      containerType: false,
      tareWeight: false,
    });
  };
  function roundTo3Decimals(number) {
    const roundedNumber = Number(number).toFixed(3);
    return roundedNumber;
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setisoContainer((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === "isoCode") {
      setisoContainer((prevData) => ({
        ...prevData,
        isoCode: value.toUpperCase(),
      }));
    }
    setFieldErrors((prevFieldErrors) => ({
      ...prevFieldErrors,
      [name]: false,
    }));
  };
  const [isSaveClicked, setIsSaveClicked] = useState(false);

  const handleSave = () => {
    const UpperValue = isoCode.toUpperCase();
    let hasError = false;
    if (isoContainer.isoCode === null || isoContainer.isoCode === "") {
      setFieldErrors((prevFieldErrors) => ({
        ...prevFieldErrors,
        isoCode: "ISo code is required!",
      }));
      hasError = true;
    } else {
      const isObjectPresent = isoContainerList.some(
        (item) => item.isoCode === UpperValue
      );

      if (isObjectPresent) {
        setFieldErrors((prevFieldErrors) => ({
          ...prevFieldErrors,
          isoCode: "This Iso Code Is Already Present !",
        }));
        hasError = true;
      } else {
      }
    }
    if (
      isoContainer.containerSize === null ||
      isoContainer.containerSize === ""
    ) {
      setFieldErrors((prevFieldErrors) => ({
        ...prevFieldErrors,
        containerSize: "Container Size is required!",
      }));
      hasError = true;
    }
    if (
      isoContainer.containerType === null ||
      isoContainer.containerType === ""
    ) {
      setFieldErrors((prevFieldErrors) => ({
        ...prevFieldErrors,
        containerType: "Container Type is required!",
      }));
      hasError = true;
    }
    if (isoContainer.tareWeight === null || isoContainer.tareWeight === "") {
      setFieldErrors((prevFieldErrors) => ({
        ...prevFieldErrors,
        tareWeight: "Tare weight  is required!",
      }));
      hasError = true;
    }

    if (!hasError) {
      setIsSaveClicked(true);
      console.log(isoContainer);
      handleAddIsoContainer(isoContainer);
      handleReset();
      handleCloseModal();
    }
    //First Save
  };

  const handleAddIsoContainer = async () => {
    const item = isoContainer;

    item.tareWeight = roundTo3Decimals(tareWeight);
    console.log(tareWeight);

    try {
      const Response = await axios.post(
        `${ipaddress}IsoContainer/add`,
        item,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      // console.log("PartyAddress added successfFiso ully:", Response.data);
      toast.success(`Record added successfully`, {
        autoClose: 900,
      });
      setIsUpdateClicked(false);
      setIsSaveClicked(false);

      // handleGetData(item.partyId);
    } catch (error) {
      console.error("Error adding party address:", error);
      toast.error(`Error Ouccur record Not added`, {
        autoClose: 900,
      });
    }
    handleGetData();
  };
  const handleUpdateIsoContainer = async () => {
    const item = isoContainer;
    try {
      const Response = await axios.post(
        `${ipaddress}IsoContainer/add`,
        item, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
      );
      toast.success(`Record Updated successfully`, {
        autoClose: 900,
      });
      setIsUpdateClicked(false);
      setIsSaveClicked(false);
    } catch (error) {
      console.error("Error adding party address:", error);
      toast.error(`Error Ouccur record Not added`, {
        autoClose: 900,
      });
    }
    handleGetData();
  };
  const [isUpdateClicked, setIsUpdateClicked] = useState(false);

  const hadleAddUpdatedIsoContainer = async () => {
    let hasError = false;
    if (
      isoContainer.containerSize === null ||
      isoContainer.containerSize === ""
    ) {
      setFieldErrors((prevFieldErrors) => ({
        ...prevFieldErrors,
        containerSize: "Container Size is required!",
      }));
      hasError = true;
    }
    if (
      isoContainer.containerType === null ||
      isoContainer.containerType === ""
    ) {
      setFieldErrors((prevFieldErrors) => ({
        ...prevFieldErrors,
        containerType: "Container Type is required!",
      }));
      hasError = true;
    }
    if (isoContainer.tareWeight === null || isoContainer.tareWeight === "") {
      setFieldErrors((prevFieldErrors) => ({
        ...prevFieldErrors,
        tareWeight: "Tare weight  is required!",
      }));
      hasError = true;
    }

    if (!hasError) {
      console.log(isoContainer);
      setIsUpdateClicked(true);
      handleUpdateIsoContainer(isoContainer);
      handleReset();
      handleCloseModal();
    }
  };
  const initialFormData = {
    isoCodeSearch: "",
    containerTypeSearch: "",
    containerSizeSearch: "",
  };

  const [formData, setFormData] = useState({ initialFormData });

  const handleSearch = () => {
    const queryParams = {

      // isoCodeSearch: formData.isoCodeSearch
      // ? (
      //     isoCodeSearch && formData.isoCodeSearch.trim() &&
      //     isoCodeSearch.toUpperCase().includes(formData.isoCodeSearch.trim().toUpperCase())
      //   )
      // : "",


      isoCodeSearch: formData.isoCodeSearch
        ? formData.isoCodeSearch.trim()
        : "",
      containerTypeSearch: formData.containerTypeSearch
        ? formData.containerTypeSearch.trim()
        : "",
      containerSizeSearch: formData.containerSizeSearch
        ? formData.containerSizeSearch.trim()
        : "",
    };

    // Remove null or undefined parameters
    const filteredParams = Object.fromEntries(
      Object.entries(queryParams).filter(
        ([_, value]) => value !== "" && value !== undefined
      )
    );
    if (Object.keys(filteredParams).length === 0) {
      console.log("All parameters are null or undefined");
    } else {
      console.log(filteredParams);
      axios
        .get(`${ipaddress}IsoContainer/searchQuery/${companyid}`, {
          params: filteredParams,
          headers: {
            Authorization: `Bearer ${jwtToken}`
          }
        })
        .then((response) => {
          console.log(response.data);
          setisoContainerList(response.data);
          setCurrentPage1(1);
        })
        .catch((error) => {
          console.error("AxiosError:", error);
        });
    }
  };

  const handleDelete = async (item) => {


    // var  getString =`Are you sure to delete this party ${item.partyName}`;// not work some error
    var getString = `Are you sure to delete this ISO Container `;
    const isConfirmed = await Swal.fire({
      titleText: "Are you sure?", // Use titleText instead of title
      text: getString,
      icon: "warning",
      width: "450",
      height: "270",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        titleText: {
          fontSize: "9px", // Set the desired font size
          // You can add more styles here if needed
        },
      },
    });
    if (isConfirmed.isConfirmed) {
      try {
        await axios.post(`${ipaddress}IsoContainer/delete`, item);
        toast.error(`Iso Container deleted successfully: ${item.isoCode}`, {
          autoClose: 900,
        });
        handleGetData();
      } catch (error) {
        toast.error("Error deleting party", { autoClose: 900 });
        console.error("Error deleting service:", error);
      }
    }
  };

  const [isModifyOnly, setIsModifyOnly] = useState(false);
  const handleEdit = (item) => {
    resetFieldErrors();
    setIsAddOnly(false);
    setIsViewReadOnly(false);
    setIsModifyOnly(true);
    setisoContainer(item);
    setShowModal(true);
  };

  const [isReadOnly, setIsViewReadOnly] = useState(false);
  const handleView = (item) => {
    resetFieldErrors();
    setIsAddOnly(false);
    setIsViewReadOnly(true);
    setIsModifyOnly(false);
    setShowModal(true);
    setisoContainer(item);
  };

  const handleGetData = () => {
    fetch(`${ipaddress}IsoContainer/list/${companyid}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => response.json())
      .then((data) => setisoContainerList(data))
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    handleGetData();
  }, []);
  const [currentPage1, setCurrentPage1] = useState(1);
  const [itemsPerPage1] = useState(10);

  const indexOfLastItem1 = currentPage1 * itemsPerPage1;
  const indexOfFirstItem1 = indexOfLastItem1 - itemsPerPage1;

  const currentItems1 = isoContainerList.slice(
    indexOfFirstItem1,
    indexOfLastItem1
  );
  const totalPages1 = Math.ceil(isoContainerList.length / itemsPerPage1);

  // Function to handle page change
  const handlePageChange1 = (page) => {
    if (page >= 1 && page <= totalPages1) {
      setCurrentPage1(page);
    }
  };
  const displayPages1 = () => {
    const centerPageCount = 5;
    const middlePage = Math.floor(centerPageCount / 2);
    let startPage = currentPage1 - middlePage;
    let endPage = currentPage1 + middlePage;

    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(totalPages1, centerPageCount);
    }

    if (endPage > totalPages1) {
      endPage = totalPages1;
      startPage = Math.max(1, totalPages1 - centerPageCount + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  return (
    <>
      <>
        <div className="Container">
          {/* <h5
            className="pageHead"
            style={{
              fontFamily: "Your-Heading-Font",
              paddingLeft: "4%",
              paddingRight: "-50px",
            }}
          >
            <FontAwesomeIcon
              icon={faFileAlt}
              style={{
                marginRight: "8px",
                color: "black", // Set the color to golden
              }}
            />{" "}
            ISO Container Master
          </h5> */}
          <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-20px' }} > <FontAwesomeIcon
            icon={faFileAlt}
            style={{
              marginRight: '8px',
              color: 'black', // Set the color to golden
            }}
          /> ISO Container Master</h5>
          <Card>
            <CardBody>
              {(role !== 'ROLE_ADMIN' && allowCreate) || (role === 'ROLE_ADMIN') ? (
                <div
                  className="text-end"
                  style={{ marginTop: "0px", marginBottom: "10px" }}
                >
                  <Button
                    type=""
                    color="success"
                    className="btn btn-outline-primary btn-margin newButton text-end"
                    onClick={handleOpenModal}
                    outline

                  >
                    <FontAwesomeIcon
                      icon={faPlus}
                      style={{ marginRight: "5px" }}
                    />
                    New Entry
                  </Button>
                </div>) : (null)}
              <hr />
              <Row>
                <Col md={3}>
                  <FormGroup>
                    <Label className="forlabel" for="isoCodeSearch">
                      ISO Code
                    </Label>
                    <Input
                      type="text"
                      maxLength={4}
                      name="isoCodeSearch"
                      placeholder="Enter ISO Code"
                      value={
                        formData.isoCodeSearch
                          ? formData.isoCodeSearch.toUpperCase()
                          : ""
                      }
                      // value={
                      //   formData.isoCodeSearch
                      //     ? formData.isoCodeSearch
                      //         .replace(/\s/g, "")
                      //         .toUpperCase()
                      //     : ""
                      // }
                      onChange={handleSearchChange}
                    />
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label className="forlabel" for="containerSizeSearch">
                      Container Size
                    </Label>
                    <Input
                      type="select"
                      name="containerSizeSearch"
                      value={formData.containerSizeSearch || ""}
                      onChange={handleSearchChange}
                      placeholder="Enter Container Size"
                    >
                      <option value="">Select Container Size</option>
                      {cSizeList.map((Size, index) => (
                        <option kay={index} value={Size.jarDtlId}>
                          {Size.jarDtlDesc}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label className="forlabel" for="containerTypeSearch">
                      Container Type
                    </Label>
                    <Input
                      type="select"
                      name="containerTypeSearch"
                      placeholder="Enter Container Type"
                      value={formData.containerTypeSearch || ""}
                      onChange={handleSearchChange}
                    >
                      <option value="">Select Container Type</option>
                      {cTypeList.map((type, index) => (
                        <option kay={index} value={type.jarDtlId}>
                          {type.jarDtlId}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <div style={{ marginTop: 30 }}>
                    <Button
                      onClick={handleSearch}
                      color="success"
                      className="btn btn-outline-primary btn-margin newButton"
                      outline
                      style={{ marginRight: "5px" }}
                    >
                      <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        style={{ marginRight: "5px" }}
                      />
                      Search
                    </Button>
                    <Button
                      className="btn btn-outline-danger btn-margin newButton"
                      color="danger"
                      onClick={handleSearchReset}
                      style={{ marginRight: 5 }}
                      outline
                    >
                      <FontAwesomeIcon
                        icon={faArrowsRotate}
                        style={{ marginRight: "5px" }}
                      />
                      Reset
                    </Button>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>

          <Card style={{ marginTop: "5px" }}>

            {/* <h5
              className="pageHead"
              style={{
                fontFamily: "Your-Heading-Font",
                paddingLeft: "4%",
                paddingTop: "9px",
                marginLeft: "10px",
              }}
            ><FontAwesomeIcon
            icon={faBoxesStacked}
            style={{ marginRight: "5px" }}
          />
              ISO Container Details
            </h5> */}
            <p className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-20px' }} > <FontAwesomeIcon
              icon={faBoxesStacked}
              style={{
                marginRight: '4px',
                color: 'black', // Set the color to golden
              }}
            /> ISO Container Details</p>
            <CardBody style={{ paddingTop: "0px" }}>
              <div className="table-responsive">
                <table className="table table-bordered table-hover tableHeader">
                  <thead style={{ backgroundColor: "#ff9900" }}>
                    <tr>
                      <th
                        style={{

                          textAlign: "center",
                        }}
                      >
                        Sr No
                      </th>
                      <th
                        style={{
                          //
                          textAlign: "center",
                        }}
                      >
                        ISO Code
                      </th>
                      <th
                        style={{

                          textAlign: "center",
                        }}
                      >
                        Size
                      </th>
                      <th
                        style={{

                          textAlign: "center",
                        }}
                      >
                        Type
                      </th>
                      <th
                        style={{

                          textAlign: "center",
                        }}
                      >
                        Tare Weight
                      </th>

                      <th
                        style={{

                          textAlign: "center",
                        }}
                      >
                        Status
                      </th>

                      <th

                        className="text-center"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  {currentItems1.length === 0 ? (
                    <tbody className="text-center">
                      <tr>
                        <td colSpan="8">No records found</td>
                      </tr>
                    </tbody>
                  ) : (
                    currentItems1.map((item, index) => (
                      <tbody>
                        <tr className="text-center">
                          <td>
                            {(currentPage1 - 1) * itemsPerPage1 + index + 1}
                          </td>
                          <td>{item.isoCode}</td>
                          <td>{item.containerSize}</td>
                          <td>{item.containerType}</td>
                          <td>{+item.tareWeight}</td>
                          <td>
                            {item.status === "N"
                              ? "New"
                              : item.status === "U"
                                ? "Update"
                                : item.status === "A"
                                  ? "Approve"
                                  : "Status Not Updated"}
                          </td>
                          {/* Add more table data */}
                          <td className="text-center">
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
                                {(role !== 'ROLE_ADMIN' && allowRead) || (role === 'ROLE_ADMIN') ? (
                                  <li>
                                    <button
                                      className="dropdown-item"
                                      onClick={() => handleView(item)}
                                    >
                                      <FontAwesomeIcon
                                        icon={faEye}
                                        style={{ marginRight: "5px" }}
                                      />
                                      View Details
                                    </button>
                                  </li>) : (null)}
                                {(role !== 'ROLE_ADMIN' && allowEdit) || (role === 'ROLE_ADMIN') ? (
                                  <li>
                                    <button
                                      className="dropdown-item"
                                      onClick={() => handleEdit(item)}
                                    >
                                      <FontAwesomeIcon
                                        icon={faEdit}
                                        style={{ marginRight: "5px" }}
                                      />
                                      Modify Details
                                    </button>
                                  </li>) : (null)}

                                {/* {(role !== 'ROLE_ADMIN' && allowDelete) || (role === 'ROLE_ADMIN') ? (

                                  <li>
                                    <button
                                      className="dropdown-item"
                                      onClick={() => handleDelete(item)}
                                    >
                                      <FontAwesomeIcon
                                        icon={faTrash}
                                        style={{ marginRight: "5px" }}
                                      />
                                      Delete Details
                                    </button>
                                  </li>) : (null)} */}



                              </ul>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    ))
                  )}
                </table>
                <Pagination
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    color: "gray",
                  }}
                >
                  <Pagination.First onClick={() => handlePageChange1(1)} />
                  <Pagination.Prev
                    onClick={() => handlePageChange1(currentPage1 - 1)}
                    disabled={currentPage1 === 1}
                  />
                  <Pagination.Ellipsis />

                  {displayPages1().map((pageNumber) => (
                    <Pagination.Item
                      key={pageNumber}
                      active={pageNumber === currentPage1}
                      onClick={() => handlePageChange1(pageNumber)}
                    >
                      {pageNumber}
                    </Pagination.Item>
                  ))}

                  <Pagination.Ellipsis />
                  <Pagination.Next
                    onClick={() => handlePageChange1(currentPage1 + 1)}
                    disabled={currentPage1 === totalPages1}
                  />
                  <Pagination.Last
                    onClick={() => handlePageChange1(totalPages1)}
                  />
                </Pagination>
              </div>
            </CardBody>
          </Card>
          {/* open mode here */}
          <Modal
            isOpen={showModal}
            toggle={handleCloseModal}
            style={{ maxWidth: 900 }}
          >
            <ModalHeader
              toggle={handleCloseModal}
              style={{
                backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font', textAlign: 'center', background: '#26a69a',
                boxShadow: '0px 5px 10px rgba(0, 77, 64, 0.3)',
                border: '1px solid rgba(0, 0, 0, 0.3)',
                borderRadius: '0',
                backgroundImage: 'radial-gradient( circle farthest-corner at 48.4% 47.5%,  rgba(122,183,255,1) 0%, rgba(21,83,161,1) 90% )',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                //backgroundPosition: 'center',
                backgroundPosition: 'center',
              }}
            >
              {/* <FontAwesomeIcon icon="fa-solid fa-truck-arrow-right" style={{ marginRight: '9px' }}/> */}
              <FontAwesomeIcon
                icon={faTruckArrowRight}
                style={{ marginRight: "9px" }}
              />
              {isAddOnly ? "Add ISO Container" : ""}
              {isModifyOnly ? "Modify ISO Container Details" : ""}
              {isReadOnly ? "View ISO Container Details" : ""}
            </ModalHeader>
            <ModalBody
              style={{
                backgroundImage:
                  "url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)",
                backgroundSize: "cover",
              }}
            >
              <Form>
                <Row>
                  <Col md={4}>
                    <FormGroup>
                      <Label className="forlabel" for="isoCode">
                        ISO Code<span style={{ color: "red" }}> *</span>
                      </Label>
                      <Input
                        placeholder="Enter Iso Code"
                        maxLength={4}
                        type="text"
                        disabled={isReadOnly}
                        name="isoCode"
                        readOnly={isModifyOnly}
                        style={{
                          backgroundColor: isModifyOnly ? "#e3eefa" : " ",
                        }}
                        className={`form-control inputField ${fieldErrors.isoCode ? "is-invalid" : ""
                          }`}
                        value={isoCode ? isoCode.toUpperCase() : ""}
                        onChange={handleInputChange}
                      />

                      {fieldErrors.isoCode && (
                        <div className="invalid-feedback">
                          {fieldErrors.isoCode}
                        </div>
                      )}
                    </FormGroup>
                  </Col>

                  <Col md={4}>
                    <FormGroup>
                      <Label className="forlabel" for="containerSize">
                        Container Size <span style={{ color: "red" }}> *</span>
                      </Label>
                      <Input
                        disabled={isReadOnly}
                        type="select"
                        name="containerSize"
                        className={`form-control inputField ${fieldErrors.containerSize ? "is-invalid" : ""
                          }`}
                        // value={containerSize}
                        value={
                          isReadOnly
                            ? isoContainer.containerSize
                            : containerSize
                        }
                        onChange={handleInputChange}
                        readOnly={isReadOnly}
                        style={{
                          backgroundColor: isReadOnly ? "#e3eefa" : " ",
                        }}
                      >
                        <option value="">Select Container Size</option>
                        {cSizeList.map((size, index) => (
                          <option key={index} value={size.jarDtlId}>
                            {size.jarDtlDesc}
                          </option>
                        ))}
                      </Input>
                      {fieldErrors.containerSize && (
                        <div className="invalid-feedback">
                          {/* Container Size is required */}
                          {fieldErrors.containerSize}
                        </div>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label className="forlabel" for="containerType">
                        Container Type<span style={{ color: "red" }}> *</span>
                      </Label>
                      <Input
                        disabled={isReadOnly}
                        type="select"
                        name="containerType"
                        value={containerType}
                        onChange={handleInputChange}
                        className={`form-control inputField ${fieldErrors.containerType ? "is-invalid" : ""
                          }`}
                        readOnly={isReadOnly}
                        style={{
                          backgroundColor: isReadOnly ? "#e3eefa" : " ",
                        }}
                      >
                        <option value="">Select Container Type</option>
                        {cTypeList.map((type, index) => (
                          <option kay={index} value={type.jarDtlId}>
                            {type.jarDtlId}
                          </option>
                        ))}
                      </Input>
                      {fieldErrors.containerType && (
                        <div className="invalid-feedback">
                          {/* Container Type is required */}
                          {fieldErrors.containerType}
                        </div>
                      )}
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col md={4}>
                    <FormGroup>
                      <Label className="forlabel" for="tareWeight">
                        Tare Weight<span style={{ color: "red" }}> *</span>
                      </Label>
                      <Input
                        type="number"
                        name="tareWeight"
                        className={`form-control inputField ${fieldErrors.tareWeight ? "is-invalid" : ""
                          }`}
                        value={tareWeight}
                        onChange={handleInputChange}
                        readOnly={isReadOnly}
                        style={{
                          backgroundColor: isReadOnly ? "#e3eefa" : " ",
                        }}
                        placeholder="Enter Container Tare Weigth "
                      />
                      {fieldErrors.tareWeight && (
                        <div className="invalid-feedback">
                          {/* Tare Weigth is required */}
                          {fieldErrors.tareWeight}
                        </div>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </ModalBody>
            <ModalFooter
              style={{
                backgroundImage:
                  "url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)",
                backgroundSize: "cover",
              }}
            >
              <div className="d-flex justify-content-center"></div>
              <div className="d-flex justify-content-center">
                {isAddOnly && (
                  <div className="d-flex justify-content-center">
                    <Button
                      color="success"
                      className="btn btn-outline-primary btn-margin newButton"
                      disabled={isSaveClicked}
                      outline
                      onClick={handleSave}
                    >
                      <FontAwesomeIcon
                        icon={faSave}
                        style={{ marginRight: "5px" }}
                      />
                      Save
                    </Button>
                    <Button
                      color="danger"
                      className="btn btn-outline-danger btn-margin newButton"
                      onClick={handleReset}
                      style={{ marginLeft: "10px" }}
                      outline
                    >
                      <FontAwesomeIcon
                        icon={faArrowsRotate}
                        style={{ marginRight: "5px", marginLeft: "9px" }}
                      />
                      Reset
                    </Button>
                  </div>
                )}
                {isReadOnly && (
                  <Button
                    color="danger"
                    onClick={handleCloseModal}
                    style={{ marginLeft: "20px" }}
                    outline
                  >
                    <FontAwesomeIcon
                      icon={faBackward}
                      style={{ marginRight: "5px", marginLeft: "1px" }}
                    />
                    Back
                  </Button>
                )}
                {isModifyOnly && (
                  <>
                    <Button
                      color="success"
                      outline
                      disabled={isUpdateClicked}
                      onClick={hadleAddUpdatedIsoContainer}
                      style={{ marginRight: "5px" }}
                    >
                      <FontAwesomeIcon
                        icon={faSave}
                        style={{ marginRight: "5px" }}
                      />
                      Save
                    </Button>
                    <Button
                      color="danger"
                      onClick={handleCloseModal}
                      style={{ marginRight: "5px" }}
                      outline
                    >
                      <FontAwesomeIcon
                        icon={faBackward}
                        style={{ marginRight: "5px", marginLeft: "1px" }}
                      />
                      Back
                    </Button>
                  </>
                )}
              </div>
            </ModalFooter>
          </Modal>
        </div>
      </>
    </>
  );
}
