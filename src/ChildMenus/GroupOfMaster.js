import AuthContext from '../Components/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import '../Components/Style.css';
import ipaddress from "../Components/IpAddress";
import axios from "axios";
import { axisClasses } from '@mui/x-charts';
import { BarChart } from '@mui/x-charts';
import Select from 'react-select';
import { LineChart, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';
import { Pagination } from "react-bootstrap"
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
  Modal, ModalBody, ModalFooter, ModalHeader,
} from "reactstrap";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge, faChartGantt, faBold, faBox, faArrowAltCircleLeft, faSearch, faRefresh, faUpload, faFileExcel, faSave, faCheck, faDownload, faTrash, faGroupArrowsRotate, faPlus, faEdit, faHandsHolding, faJarWheat, faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/style.css';
import '../Components/Style.css';
import { Button } from "react-bootstrap";
import { toast } from 'react-toastify';
import { FaLayerGroup } from 'react-icons/fa';
export default function GroupOfMaster() {
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
    userRights
  } = useContext(AuthContext);

  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const [jarList, setJarList] = useState([]);
  const [orgJarList, setOrgJarList] = useState([]);
  const [formData, setFormData] = useState({
    companyId: "",
    jarId: "",
    jarDesc: "",
    soundexDesc: " ",
    jarType: " ",
    detailAutoFlag: "",
    importAppl: " ",
    reference1: " ",
    reference2: " ",
    workflowId: " ",
    processId: " ",
    comments: " ",
    createdDate: "",
    createdBy: " ",
    editedBy: " ",
    approvedBy: " ",
    editedDate: " ",
    approvedDate: " ",
    status: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setFormData([]);
    setFormErrors(
      {
        jarType: "",
        jarDesc: "",

      }
    )
  };

  const handleClear = () => {
    setFormData({
      jarType: '',
      jarDesc: '',
      comments: '',
    });
    setFormErrors("");
    setJarType('');
    setJarDesc('');
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditButtonClick = (item) => {
    console.log(item);

    return <addJarDetail item={item} />;
  };

  const [formErrors, setFormErrors] = useState({
    jarType: "",
    jarDesc: "",


  });

  const handleSubmit = () => {

    setLoading(true)
    const errors = {};

    if (!formData.jarType) {
      errors.jarType = "Jar Type is required.";
    }

    if (!formData.jarDesc) {
      errors.jarDesc = "Jar Desc is required.";
    }

    if (!formData.jarType) {
      document.getElementById('jarType').classList.add('error-border');
    }

    if (!formData.jarDesc) {
      document.getElementById('jarDesc').classList.add('error-border');
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    formData.approvedBy = userId;
    formData.editedBy = userId;
    formData.createdBy = userId;
    console.log("Form Data:", formData);
    axios
      .post(`${ipaddress}jar/addJar/${companyid}`, formData,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`
          }
        })
      // Replace with your API endpoint
      .then((response) => {
        console.log("POST response:", response.data);
        getlist();
        toast.success(response.data, "success");
      })
      .catch((error) => {
        toast.error(error.response.data, "error");
      }).finally(
        () => {
          setLoading(false);
        }
      );
    // Reload the page
    toggleModal();
  };
  const getlist = () => {
    axios
      .get(`${ipaddress}jar/list/${companyid}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      })
      .then((response) => {
        console.log("GET list response:", response.data);
        setJarList(response.data); // Store the list in the state
        setOrgJarList(response.data);
      })
      .catch((error) => {
        console.error("GET list error:", error);
      });
  };

  useEffect(() => {
    getlist();
  }, []); // Fetch the list when the component mounts

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(
        "/login?message=You need to be authenticated to access this page."
      );
    }
  }, [isAuthenticated, navigate]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = jarList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(jarList.length / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
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

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  const [jarType, setJarType] = useState('');
  const [jarDesc, setJarDesc] = useState('');

  const [searchCriteria, setSearchCriteria] = useState({
    jarType: "",
    jarDesc: "",
  });

  // const handleSearch = () => {
  //   const filteredJarData = orgJarList.filter((service) => {
  //     const trimmedJarType = searchCriteria.jarType.trim();
  //     const trimmedJarDesc = searchCriteria.jarDesc.trim();
  //     const matchJarType =
  //       !trimmedJarType ||
  //       (service.jarType &&
  //         service.jarType
  //           .toLowerCase()
  //           .includes(trimmedJarType.toLowerCase()));

  //     const matchJarDescription =
  //       !trimmedJarDesc ||
  //       (service.jarDesc &&
  //         service.jarDesc
  //           .toLowerCase()
  //           .includes(trimmedJarDesc.toLowerCase()));
  //     return matchJarType && matchJarDescription ;
  //   });

  //   setJarList(filteredJarData);
  //   setCurrentPage(1);
  //   console.log("Filtered Service Data:", filteredJarData);
  // };


  const handleSearch = () => {
    setLoading(true);
    try {
      const filteredJarData = orgJarList.filter((service) => {
        const trimmedJarType = searchCriteria.jarType.trim();
        const trimmedJarDesc = searchCriteria.jarDesc.trim();

        const matchJarType =
          !trimmedJarType ||
          (service.jarType &&
            service.jarType.toLowerCase().includes(trimmedJarType.toLowerCase()));

        const matchJarDescription =
          !trimmedJarDesc ||
          (service.jarDesc &&
            service.jarDesc.toLowerCase().includes(trimmedJarDesc.toLowerCase()));

        return matchJarType && matchJarDescription;
      });

      setJarList(filteredJarData);
      setCurrentPage(1);
      console.log("Filtered Service Data:", filteredJarData);
    } catch (error) {
      console.error("Error during search:", error);
      // You can handle the error more gracefully here, e.g., by displaying an error message to the user
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSearchCriteria({
      jarDesc: "",
      jarType: "",
    });
    setCurrentPage(1);
    setJarList(orgJarList);
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

  const location = useLocation();


  const queryParams = new URLSearchParams(location.search);
  const processId = queryParams.get('process_id');

  const foundRights = role !== 'ROLE_ADMIN' ? userRights.find(item => item.process_Id === processId) : null;
  const allowCreate = foundRights?.allow_Create === 'Y';
  const allowRead = foundRights?.allow_Read === 'Y';
  const allowEdit = foundRights?.allow_Update === 'Y';
  const allowDelete = foundRights?.allow_Delete === 'Y';


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
      <div className='Container'>
        <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-20px' }} >
          <FontAwesomeIcon
            icon={faLayerGroup}
            style={{
              marginRight: '8px',
              color: 'black', // Set the color to golden
            }}
          />
          Group Of Master
        </h5>



        <Card>
          <CardBody className="text-end" style={{ paddingBottom: '-5px' }} >
          {(role !== 'ROLE_ADMIN' && allowCreate) || (role === 'ROLE_ADMIN') ? (
            <button
              className="btn btn-outline-success btn-margin newButton"
              onClick={toggleModal}

            >
              <FontAwesomeIcon
                icon={faPlus}
                style={{ marginRight: "5px" }}
              />
              Add New
            </button>
          ):(null)}
            <hr />
            <Row>
              <Col md={3}>
                <FormGroup>
                  <label className="forlabel bold-label" htmlFor="GroupType" style={{ float: 'left' }}>
                    Group Type
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="jarType"
                    maxLength={15}
                    // value={jarType}
                    // onChange={(e) => setJarType(e.target.value)}
                    name="jarType"
                    value={searchCriteria.jarType}
                    // onChange={handleInputChange}
                    onChange={(e) =>
                      setSearchCriteria({
                        ...searchCriteria,
                        jarType: e.target.value,
                      })
                    }
                  />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <label className="forlabel bold-label" htmlFor="jarDesc" style={{ float: 'left' }}>
                    Group Desc
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="jarDesc"
                    maxLength={15}
                    name="jarDesc"
                    value={searchCriteria.jarDesc}
                    // onChange={handleInputChange}
                    onChange={(e) =>
                      setSearchCriteria({
                        ...searchCriteria,
                        jarDesc: e.target.value,
                      })
                    }
                  />


                </FormGroup>
              </Col>
              <Col md={3} style={{ marginTop: 24 }}>
                <button
                  className="btn btn-outline-success btn-margin newButton"
                  style={{ marginRight: 10 }}
                  id="submitbtn2"
                  onClick={() => handleSearch()}
                >
                  <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
                  Search
                </button>
                <button
                  className="btn btn-outline-danger btn-margin newButton"
                  style={{ marginRight: 10 }}
                  id="submitbtn2"
                  onClick={() => handleReset()}
                >
                  <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
                  Reset
                </button>
              </Col>
            </Row>
            <hr />
            <div className="table-responsive">
              <table className="table table-bordered table-hover tableHeader">
                <thead className=" text-center"   >
                  <tr>
                    <th scope="col">
                      Group Id
                    </th>

                    <th scope="col">
                      Group Type
                    </th>
                    <th scope="col">
                      Group Desc
                    </th>
                    <th scope="col">
                      Group Status
                    </th>
                    {/* style={{ background: "#BADDDA" }} */}
                    <th scope="col" className="text-center">
                      Action
                    </th>
                  </tr>
                </thead>

                {currentItems.length === 0 ? (
                  <tbody className="text-center">
                    <tr>
                      <td colSpan="5">No Records</td>
                    </tr>
                  </tbody>
                ) : (
                  <tbody className=" text-center">
                    {currentItems.map((item, index) => (
                      <tr key={index}>
                        <td>{item.jarId}</td>
                        <td>{item.jarType}</td>
                        <td>{item.jarDesc}</td>
                        <td>
                          {item.status === "N"
                            ? "New"
                            : item.status === "U"
                              ? "Edit"
                              : item.status === "A"
                                ? "Approved"
                                : item.status}
                        </td>
                       
                        <td className="text-center">
                          <Link to={`/master/AddJarDetails/${item.jarId}/${item.jarType}`}>
                            <button type="button" className="btn btn-outline-primary">

                              <FontAwesomeIcon
                                icon={faEdit}
                                style={{ marginRight: "px" }}
                              />
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
              <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
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


            {/* Modal for adding data */}
            {/* Modal for adding data */}
            <Modal isOpen={isModalOpen} toggle={toggleModal}>
              <ModalHeader style={{
                backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font', textAlign: 'center', background: '#26a69a',
                boxShadow: '0px 5px 10px rgba(0, 77, 64, 0.3)',
                border: '1px solid rgba(0, 0, 0, 0.3)',
                borderRadius: '0',
                backgroundImage: 'radial-gradient( circle farthest-corner at 48.4% 47.5%,  rgba(122,183,255,1) 0%, rgba(21,83,161,1) 90% )',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                //backgroundPosition: 'center',
                backgroundPosition: 'center',
              }} toggle={toggleModal}>Add Group Type  <FontAwesomeIcon
                  icon={faJarWheat}
                  style={{ marginRight: "5px" }}
                /></ModalHeader>
              <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>
                <FormGroup>
                  <Label for="jarType">Group Type<span style={{ color: 'red' }}>*</span></Label>
                  <Input
                    type="text"
                    name="jarType"
                    id="jarType"
                    value={formData.jarType}
                    onChange={handleInputChange}
                    required
                  />
                  <div style={{ color: 'red' }} className="error-message">{formErrors.jarType}</div>

                </FormGroup>
                <FormGroup>
                  <Label for="jarDesc">Group Description<span style={{ color: 'red' }}>*</span></Label>
                  <Input
                    type="text"
                    name="jarDesc"
                    id="jarDesc"
                    value={formData.jarDesc}
                    onChange={handleInputChange}
                    required
                  />
                  <div style={{ color: 'red' }} className="error-message">{formErrors.jarDesc}</div>

                </FormGroup>
                <FormGroup>
                  <Label for="comments">Group Comment</Label>
                  <Input
                    type="text"
                    name="comments"
                    id="comments"
                    value={formData.comments}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </ModalBody>
              <ModalFooter style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>
                <button
                  type="button"
                  className="btn btn-outline-success btn-margin newButton me-md-2"
                  onClick={handleSubmit}
                >
                  <FontAwesomeIcon
                    icon={faSave}
                    style={{ marginRight: "5px" }}
                  />
                  Save
                </button>

                <button
                  type="button"
                  className="btn btn-margin newButton btn-outline-danger me-md-2"
                  onClick={handleClear}
                >
                  <FontAwesomeIcon
                    icon={faRefresh}
                    style={{ marginRight: "5px" }}
                  />
                  Clear
                </button>
              </ModalFooter>
            </Modal>
          </CardBody>
        </Card>

      </div>
    </>
  );
}