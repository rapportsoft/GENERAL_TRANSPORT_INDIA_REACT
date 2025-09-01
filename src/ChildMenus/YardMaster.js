


import React, { useEffect, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Table,
  Input,
  FormGroup,
  Card,
  CardBody,
  Button,
  FormFeedback,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  ModalFooter,
  Row,
} from "reactstrap";
import Pagination from "react-bootstrap/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAtom, faEdit, faEye, faLocation, faPlus, faRefresh, faSearch, faTrash, faTruckFast, faXmark } from "@fortawesome/free-solid-svg-icons";
import ReactLoading from 'react-loading';
import AuthContext from "../Components/AuthProvider";
import axios from 'axios';
import ipaddress from "../Components/IpAddress";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Col } from "react-bootstrap";
import useApi from "../Components/TokenService";
import "../Components/Style.css"

export default function YardMaster() {
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
  const { isAuthenticated } = useContext(AuthContext);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const processId = queryParams.get('process_id');

  const foundRights = role !== 'ROLE_ADMIN' ? userRights.find(item => item.process_Id === processId) : null;
  const allowCreate = foundRights?.allow_Create === 'Y';
  const allowRead = foundRights?.allow_Read === 'Y';
  const allowEdit = foundRights?.allow_Update === 'Y';
  const allowDelete = foundRights?.allow_Delete === 'Y';



  const api = useApi();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [allLocationData, setAllLocationData] = useState([]);
  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
    },
    label: {
      backgroundColor: '#e3eefa',
      padding: '5px',
      borderRadius: '4px',
    }
  };

  const initialRow = {
    srNo: 1,
    yardLocationId: '',
    yardLocationDesc: '',
    locationCategory: 'O',
    blockId: '',
    cellNoRow: '',
    cellArea: '',
  };

  const [rows, setRows] = useState([initialRow]);

  const validateRow = (row) => {
    const newErrors = {};
    if (!row.yardLocationId) newErrors.yardLocationId = 'Block Location ID is required';
    if (!row.yardLocationDesc) newErrors.yardLocationDesc = 'Block Description is required';
    if (!row.locationCategory) newErrors.locationCategory = 'Location Category is required';
    if (!row.blockId) newErrors.blockId = 'Cell ID is required';
    if (!row.cellNoRow) newErrors.cellNoRow = 'Stack Row is required';
    if (row.locationCategory === 'C' && !row.cellArea) newErrors.cellArea = 'Stack Area is required for Covered Space';
    return newErrors;
  };

  const [originalsurveyData, setOriginalsurveyData] = useState([]);

  const [searchCriteria, setSearchCriteria] = useState({
    yardLocationId: '',
    blockId: '',
    cellNoRow: '',
  });

  const handleSearch = () => {
    const filteredsurveyData = originalsurveyData.filter((survey) => {
      const trimmedContainerNo = searchCriteria.yardLocationId.trim();
      const trimmedSurveyNo = searchCriteria.blockId.trim();
      const trimmedShippingLine = searchCriteria.cellNoRow.trim();

      const matchContainerNo =
        !trimmedContainerNo ||
        (survey.yardLocationId &&
          survey.yardLocationId.toLowerCase().includes(trimmedContainerNo.toLowerCase()));

      const matchSurveyNo =
        !trimmedSurveyNo ||
        (survey.blockId &&
          survey.blockId.toLowerCase().includes(trimmedSurveyNo.toLowerCase()));

      const matchShippingLineName =
        !trimmedShippingLine ||
        (survey.cellNoRow &&
          survey.cellNoRow.toLowerCase().includes(trimmedShippingLine.toLowerCase()));


      return matchContainerNo && matchSurveyNo && matchShippingLineName;
    });
    setAllLocationData(filteredsurveyData);
    setCurrentPage1(1);
    console.log("Filtered Service Data:", filteredsurveyData);
  };

  const handleResetSearch = () => {
    setSearchCriteria({
      yardLocationId: '',
      blockId: '',
      cellNoRow: '',
      //shippingLine: shippingLineData.length > 0 ? shippingLineData[0].partyName : '', // Set to the first shipping line or empty string if no options
    });

    setCurrentPage1(1);
    setAllLocationData(originalsurveyData);

  };

  // const handleAddRow = async () => {
  //   const firstRow = rows[0];
  //   const validationErrors = validateRow(firstRow);

  //   if (Object.keys(validationErrors).length > 0) {
  //     setErrors(validationErrors);
  //     return;
  //   }

  //   try {
  //     setLoading(true);
  //     const response = await axios.post(`${ipaddress}api/yardblockcells/addLocations/${companyid}/${branchId}/${userId}`, firstRow, {
  //       headers: {
  //         Authorization: `Bearer ${jwtToken}`
  //       }
  //     });

  //     if (response.status === 200) {
  //       const newRow = { ...initialRow, srNo: rows.length + 1 };
  //       setRows([newRow, ...rows]);
  //       toast.success("Locations saved successfully", {
  //         position: 'top-center',
  //         autoClose: 900,
  //       });

  //       getAllLocationData();
  //     }

  //   } catch (error) {
  //     console.error('Failed to save row:', error);

  //     if (error.response.status === 409) {
  //       toast.error("Failed to save locations due to duplicate record", {
  //         position: 'top-center',
  //         autoClose: 900,
  //       });
  //       return;
  //     }

  //     toast.error("Failed to save locations", {
  //       position: 'top-center',
  //       autoClose: 900,
  //     });

  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const handleAddRow = async () => {
    const firstRow = rows[0];
    const validationErrors = validateRow(firstRow);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${ipaddress}api/yardblockcells/addLocations/${companyid}/${branchId}/${userId}`, firstRow, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      });

      if (response.status === 200) {
        const newRow = { ...initialRow, srNo: rows.length + 1 };
        setRows([newRow, ...rows]);
        toast.success("Locations saved successfully", {
          position: 'top-center',
          autoClose: 900,
        });

        getAllLocationData();
      }

    } catch (error) {
      console.error('Failed to save row:', error);

      if (error.response.status === 409) {
        toast.error("Failed to save locations due to duplicate record", {
          position: 'top-center',
          autoClose: 900,
        });
        return;
      }

      toast.error("Failed to save locations", {
        position: 'top-center',
        autoClose: 900,
      });

    } finally {
      setLoading(false);
    }
  };




  const [currentPage1, setCurrentPage1] = useState(1);
  const [itemsPerPage1] = useState(10);

  const indexOfLastItem1 = currentPage1 * itemsPerPage1;
  const indexOfFirstItem1 = indexOfLastItem1 - itemsPerPage1;
  const currentItems1 = allLocationData.slice(indexOfFirstItem1, indexOfLastItem1);
  const totalPages1 = Math.ceil(allLocationData.length / itemsPerPage1);

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

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  const getAllLocationData = () => {
    axios
      .get(`${ipaddress}api/yardblockcells/getAlldataOfLocations/${companyid}/${branchId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      })
      .then((response) => {
        setAllLocationData(response.data);
        setOriginalsurveyData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        toast.error("Error fetching data!", "Error");
      });
  };

  useEffect(() => {
    getAllLocationData();
  }, []);

  const DeleteLocations = async (yardLocationId, blockId, cellNoRow) => {
    const isConfirmed = await Swal.fire({
      titleText: "Are you sure?",
      text: "You won't be able to revert cell row Details!",
      icon: "warning",
      width: "450",
      height: "270",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        titleText: {
          fontSize: "9px",
        },
      },
    });
    if (isConfirmed.isConfirmed) {
      try {
        await axios.delete(
          `${ipaddress}api/yardblockcells/deleteLocations/${companyid}/${branchId}/${yardLocationId}/${blockId}/${cellNoRow}`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`
          }
        }
        );

        toast.success("Cell Row Data Deleted Successfully... ", {
          position: "top-center",
          autoClose: 900,
        });

        getAllLocationData();
      } catch (error) {
        toast.error("Error deleting cell row", { autoClose: 900 });
        console.error("Error deleting cell row:", error);
      }
    }
  };

  const [selectedItem, setSelectedItem] = useState(null); // State to store selected item for modification
  const [existingData, setExistingData] = useState(null); // State to store selected item for modification
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false); // State to manage modal visibility

  const handleModifyModel = (item) => {
    getData(item.yardLocationId, item.blockId, item.cellNoRow)
    setIsModifyModalOpen(true);
  };

  const handleCancelModify = () => {
    setSelectedItem(null);
    setExistingData(null);
    setIsModifyModalOpen(false);
  };

  const getData = (yardLocationId, blockId, cellNoRow) => {
    axios.get(`${ipaddress}api/yardblockcells/getData/${companyid}/${branchId}/${yardLocationId}/${blockId}/${cellNoRow}`)
      .then((response) => {
        setSelectedItem(response.data);
        setExistingData(response.data);
      })
      .catch((error) => {

      })
  }








  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      const response = await axios.put(`${ipaddress}api/yardblockcells/updateLocations/${companyid}/${branchId}/${existingData.yardLocationId}/${existingData.blockId}/${existingData.cellNoRow}`, selectedItem, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      });
      console.log("Saved changes:", response.data);

      if (response.status === 200) {
        toast.success("Changes saved successfully!", {
          position: 'top-center',
          autoClose: 702,
        });
      }
      setIsModifyModalOpen(false); // Close the modal after saving changes
      getAllLocationData();


      // You can perform further actions like refreshing the data
    }
    catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          toast.error("Failed to save locations due to duplicate record...!", {
            position: 'top-center',
            autoClose: 2700,
          });
        } else {
          toast.error(`Failed to save changes! Status: ${error.response.status}`, {
            position: 'top-center',
            autoClose: 2700,
          });
        }
      } else {
        toast.error("Failed to save changes! Network error or server is down.", {
          position: 'top-center',
          autoClose: 702,
        });
      }

    } finally {
      setLoading(false);
    }
  };
  const handleTextChange = (index, field, event) => {
    const { value } = event.target;
    const updatedRows = [...rows];
    updatedRows[index][field] = value;

    // Remove error for the specific field on change
    const newErrors = { ...errors };
    if (newErrors[field]) {
      delete newErrors[field];
    }

    // Conditional validation for Stack Area based on Location Category
    if (field === 'locationCategory' && value !== 'C') {
      delete newErrors.cellArea;
      updatedRows[index].cellArea = '';
    }

    setRows(updatedRows);
    setErrors(newErrors);
  };

  const handleReset = () => {
    setRows([initialRow]);
    setErrors({});
  };


















  return (
    <>
      {loading && (
        <div style={styles.overlay}>
          <div className="loader">
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
        </div>
      )}

      <div className="Container">
        <h5
          className="pageHead"
          style={{
            fontFamily: "Your-Heading-Font",
            paddingLeft: "4%",
            paddingRight: "-50px",
          }}
        >
          <FontAwesomeIcon
            icon={faTruckFast}
            style={{
              marginRight: "8px",
              color: "black",
            }}
          />
          Add Yard Locations
        </h5>

        <Card className="table-responsive">
          <CardBody>
            <div className="d-flex justify-content-start mb-2">
            {(role !== 'ROLE_ADMIN' && allowCreate) || (role === 'ROLE_ADMIN') ? (
              <Button color="success" onClick={handleAddRow} outline style={{ marginRight: '5px' }}>
                <FontAwesomeIcon icon={faPlus} style={{ marginRight: "5px" }} />
                Add Locations
              </Button>
            ):(null)}
              <Button color="danger" onClick={handleReset} outline>
                <FontAwesomeIcon icon={faXmark} style={{ marginRight: "5px" }} />
                Reset
              </Button>
            </div>

            <Table className="custom-table mt-3 table table-bordered border-dark table-striped table-hover table">
              <thead>
                <tr className="text-center">
                  <th colSpan="7" style={{ fontSize: "18px" }}>
                    <FontAwesomeIcon
                      icon={faLocation}
                      style={{ marginRight: 4 }}
                    />
                    Yard Locations
                  </th>
                </tr>
                <tr>
                  <th style={{
                    background: "#1c6c9b",
                    color: "orange",
                    textAlign: "center",
                  }}>Sr No</th>
                  <th style={{
                    background: "#1c6c9b",
                    color: "orange",
                    textAlign: "center",
                  }}>Yard Location ID</th>
                  <th style={{
                    background: "#1c6c9b",
                    color: "orange",
                    textAlign: "center",
                  }}>Yard Description</th>
                  <th style={{
                    background: "#1c6c9b",
                    color: "orange",
                    textAlign: "center",
                  }}>Location Category</th>
                  <th style={{
                    background: "#1c6c9b",
                    color: "orange",
                    textAlign: "center",
                  }}>Cell ID</th>
                  <th style={{
                    background: "#1c6c9b",
                    color: "orange",
                    textAlign: "center",
                  }}>Stack Row</th>
                  <th style={{
                    background: "#1c6c9b",
                    color: "orange",
                    textAlign: "center",
                  }}>Stack Area</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((rowData, index) => (
                  <tr key={index}>
                    <td>
                      <FormGroup>
                        <Input
                          style={{ backgroundColor: '#ccf2ff' }}
                          type="text"
                          value={index + 1}
                          readOnly
                          className="form-control"
                        />
                      </FormGroup>
                    </td>
                    <td>
                      <FormGroup>
                        <Input
                          type="text"
                          value={rowData.yardLocationId}
                          onChange={(e) => handleTextChange(index, 'yardLocationId', e)}
                          className={`form-control ${errors.yardLocationId ? 'is-invalid' : ''}`}
                          style={{
                            backgroundColor: rowData.yardLocationId ? "#e3eefa" : ""
                          }}
                          maxLength={20}
                        />
                        {errors.yardLocationId && <FormFeedback>{errors.yardLocationId}</FormFeedback>}
                      </FormGroup>
                    </td>
                    <td>
                      <FormGroup>
                        <Input
                          type="text"
                          value={rowData.yardLocationDesc}
                          onChange={(e) => handleTextChange(index, 'yardLocationDesc', e)}
                          className={`form-control ${errors.yardLocationDesc ? 'is-invalid' : ''}`}
                          style={{
                            backgroundColor: rowData.yardLocationDesc ? "#e3eefa" : ""
                          }}
                          maxLength={50}
                        />
                        {errors.yardLocationDesc && <FormFeedback>{errors.yardLocationDesc}</FormFeedback>}
                      </FormGroup>
                    </td>
                    <td>
                      <FormGroup>
                        <Input
                          type="select"
                          value={rowData.locationCategory}
                          onChange={(e) => handleTextChange(index, 'locationCategory', e)}
                          className={`form-control ${errors.locationCategory ? 'is-invalid' : ''}`}
                          style={{
                            backgroundColor: rowData.locationCategory ? "#e3eefa" : ""
                          }}
                        >
                          <option value="">Select Space</option>
                          <option value="O">Open Space</option>
                          <option value="C">Covered Space</option>
                        </Input>
                        {errors.locationCategory && <FormFeedback>{errors.locationCategory}</FormFeedback>}
                      </FormGroup>
                    </td>
                    <td>
                      <FormGroup>
                        <Input
                          type="text"
                          value={rowData.blockId}
                          onChange={(e) => handleTextChange(index, 'blockId', e)}
                          className={`form-control ${errors.blockId ? 'is-invalid' : ''}`}
                          style={{
                            backgroundColor: rowData.blockId ? "#e3eefa" : ""
                          }}
                          maxLength={20}
                        />
                        {errors.blockId && <FormFeedback>{errors.blockId}</FormFeedback>}
                      </FormGroup>
                    </td>
                    <td>
                      <FormGroup>
                        <Input
                          type="text"
                          value={rowData.cellNoRow}
                          onChange={(e) => handleTextChange(index, 'cellNoRow', e)}
                          className={`form-control ${errors.cellNoRow ? 'is-invalid' : ''}`}
                          style={{
                            backgroundColor: rowData.cellNoRow ? "#e3eefa" : ""
                          }}
                          maxLength={10}
                        />
                        {errors.cellNoRow && <FormFeedback>{errors.cellNoRow}</FormFeedback>}
                      </FormGroup>
                    </td>
                    <td>
                      <FormGroup>
                        <Input
                          type="text"
                          value={rowData.cellArea}
                          onChange={(e) => handleTextChange(index, 'cellArea', e)}
                          className={`form-control ${errors.cellArea ? 'is-invalid' : ''}`}
                          maxLength={5}
                          style={{
                            backgroundColor: rowData.cellArea ? "#e3eefa" : ""
                          }}
                          disabled={rowData.locationCategory !== 'C'}
                          onKeyPress={(e) => {
                            const validKey = /[0-9.]/.test(e.key);
                            if (!validKey) {
                              e.preventDefault();
                            }
                          }}
                          onPaste={(e) => {
                            const pastedText = e.clipboardData.getData('text');
                            const sanitizedText = pastedText.replace(/[^0-9.]/g, '');
                            document.execCommand('insertText', false, sanitizedText);
                            e.preventDefault();
                          }}
                        />
                        {errors.cellArea && <FormFeedback>{errors.cellArea}</FormFeedback>}
                      </FormGroup>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>

        <Card style={{ marginTop: 4 }}>
          <CardBody>
            <Row>
              <Col md={3}>
                <FormGroup>
                  <Label className="forlabel" for="taxId">
                    Yard Location Id
                  </Label>
                  <Input
                    type="text"
                    name="taxId"
                    value={searchCriteria.yardLocationId}
                    //onChange={handleInputChange}
                    onChange={(e) =>
                      setSearchCriteria({
                        ...searchCriteria,
                        yardLocationId: e.target.value,
                      })
                    }
                    placeholder="Enter Yard Location Id"
                  />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label className="forlabel" for="taxId">
                    Block Id
                  </Label>
                  <Input
                    type="text"
                    name="taxId"
                    value={searchCriteria.blockId}
                    //onChange={handleInputChange}
                    onChange={(e) =>
                      setSearchCriteria({
                        ...searchCriteria,
                        blockId: e.target.value,
                      })
                    }
                    placeholder="Enter Block No"
                  />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label className="forlabel" for="serviceId">
                    Cell Row No
                  </Label>
                  <Input
                    type="text"
                    name="taxId"
                    value={searchCriteria.cellNoRow}
                    //onChange={handleInputChange}
                    onChange={(e) =>
                      setSearchCriteria({
                        ...searchCriteria,
                        cellNoRow: e.target.value,
                      })
                    }
                    placeholder="Enter Cell Row No"
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
                  <Button color="danger" outline onClick={handleResetSearch}>
                    <FontAwesomeIcon
                      icon={faRefresh}
                      style={{ marginRight: "5px" }}
                    />
                    Reset
                  </Button>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Card
          style={{ marginTop: "5px", paddingTop: "9px", textAlign: "left" }}
        >
          <h5
            className="pageHead"
            style={{
              fontFamily: "Your-Heading-Font",
              paddingLeft: "4%",
              paddingRight: "-50px",
            }}
          >
            {" "}
            <FontAwesomeIcon
              icon={faLocation}
              style={{
                marginRight: "8px",
                color: "black", // Set the color to golden
              }}
            />{" "}
            Yard Locations Details
          </h5>

          <CardBody>
            <div className="table-responsive">
              <Table className="table table-bordered border-dark table-striped table-hover table-responsive ">
                <thead style={{ backgroundColor: "#ff9900" }}>
                  <tr>
                    <th>Sr No.</th>
                    <th>Yard Location Id</th>
                    <th>Yard Location Desc</th>
                    <th>Location Category</th>
                    <th>Block Id</th>
                    <th>Cell Row No</th>
                    <th>Cell Area</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>

                </thead>

                <tbody>
                  {currentItems1.map((item, index) =>

                    <tr className="text-center"
                      key={index}
                    >
                      <td className="table-column">{((currentPage1 - 1) * itemsPerPage1) + index + 1}</td>
                      <td>{item.yardLocationId}</td>
                      <td>{item.yardLocationDesc}</td>
                      <td>{
                        item.locationCategory === "C" ? "Covered Space" :
                          item.locationCategory === "O" ? "Open Space" :
                            ""
                      }</td>
                      <td>{item.blockId}</td>
                      <td>{item.cellNoRow}</td>
                      <td>{item.cellArea ? item.cellArea : '0'}</td>
                      <td>{
                        item.status === "N" ? "New" :
                          item.status === "E" ? "Edited" :
                            item.status === "U" ? "Edited" :
                              item.status === "A" ? "Approved" :
                                item.status
                      }</td>
                      <td className="text-center">
                        <div className="">
                          <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            <FontAwesomeIcon icon={faAtom} style={{ marginRight: '5px' }} />
                            Action
                          </button>
                          <ul className="dropdown-menu">
                          {(role !== 'ROLE_ADMIN' && allowEdit) || (role === 'ROLE_ADMIN') ? (
                            <li>
                              <button className="dropdown-item" onClick={() => handleModifyModel(item)}>
                                <FontAwesomeIcon icon={faEdit} style={{ marginRight: "5px" }} />Modify Details
                              </button>
                            </li>):(null)}

                            {/* {(role !== 'ROLE_ADMIN' && allowDelete) || (role === 'ROLE_ADMIN') ? (
                            <li>
                              <button className="dropdown-item"
                                onClick={() =>
                                  DeleteLocations(
                                    item.yardLocationId,
                                    item.blockId,
                                    item.cellNoRow
                                  )
                                }
                              >
                                <FontAwesomeIcon icon={faTrash} style={{ marginRight: "5px" }} />Delete Details
                              </button>
                            </li>
                            ):(null)} */}

                          </ul>
                        </div>
                      </td>
                    </tr>
                  )
                  }
                  {allLocationData.length < 1 && (
                    <tr>
                      <td colSpan="10" className="text-center">No Records Found.</td>
                    </tr>
                  )}
                </tbody>

              </Table>

            </div>

            <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
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
              <Pagination.Last onClick={() => handlePageChange1(totalPages1)} />
            </Pagination>
            {selectedItem && (
              <Modal isOpen={isModifyModalOpen} toggle={handleCancelModify} size="lg">
                <ModalHeader toggle={handleCancelModify} style={{
                  backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font', textAlign: 'center', background: '#26a69a',
                  boxShadow: '0px 5px 10px rgba(0, 77, 64, 0.3)',
                  border: '1px solid rgba(0, 0, 0, 0.3)',
                  borderRadius: '0',
                  backgroundImage: 'radial-gradient( circle farthest-corner at 48.4% 47.5%,  rgba(122,183,255,1) 0%, rgba(21,83,161,1) 90% )',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  //backgroundPosition: 'center',
                  backgroundPosition: 'center',
                }}>
                  <FontAwesomeIcon icon={faEdit} style={{ marginRight: '10px' }} />
                  Modify Details
                </ModalHeader>
                <ModalBody style={{
                  backgroundImage:
                    "url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)",
                  backgroundSize: "cover",
                }}>
                  <Row>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="yardLocationId" className="forlabel">Yard Location Id</Label>
                        <Input
                          type="text"
                          name="yardLocationId"
                          id="yardLocationId"
                          maxLength={20}
                          value={selectedItem.yardLocationId}
                          onChange={(e) => setSelectedItem({ ...selectedItem, yardLocationId: e.target.value })}
                        />
                      </FormGroup>
                    </Col>

                    <Col md={4}>
                      <FormGroup>
                        <Label for="yardLocationDesc" className="forlabel">Yard Location Description</Label>
                        <Input
                          type="text"
                          name="yardLocationDesc"
                          id="yardLocationDesc"
                          maxLength={50}
                          value={selectedItem.yardLocationDesc}
                          onChange={(e) => setSelectedItem({ ...selectedItem, yardLocationDesc: e.target.value })}
                        />
                      </FormGroup>
                    </Col>
                    {/* <Col md={4}>
              <FormGroup>
              <Label for="locationCategory" className="forlabel">Yard Location Category</Label>
              <Input
                type="text"
                name="locationCategory"
                id="locationCategory"
                value={selectedItem.locationCategory}
                onChange={(e) => setSelectedItem({ ...selectedItem, locationCategory: e.target.value })}
              />
            </FormGroup>
              </Col> */}


                    <Col md={4}>
                      <FormGroup>
                        <Label for="locationCategory" className="forlabel">Yard Location Category</Label>
                        <Input
                          type="select"
                          name="locationCategory"
                          id="locationCategory"
                          value={selectedItem.locationCategory}
                          onChange={(e) => setSelectedItem({ ...selectedItem, locationCategory: e.target.value })}
                        >
                          <option value="O">Open Space</option>
                          <option value="C">Covered Space</option>
                        </Input>
                      </FormGroup>
                    </Col>

                  </Row>


                  <Row>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="blockId" className="forlabel">Block Id</Label>
                        <Input
                          type="text"
                          name="blockId"
                          id="blockId"
                          value={selectedItem.blockId}
                          maxLength={20}
                          onChange={(e) => setSelectedItem({ ...selectedItem, blockId: e.target.value })}
                        />
                      </FormGroup>
                    </Col>

                    <Col md={4}>
                      <FormGroup>
                        <Label for="cellNoRow" className="forlabel">Cell No Row</Label>
                        <Input
                          type="text"
                          name="cellNoRow"
                          id="cellNoRow"
                          maxLength={10}
                          value={selectedItem.cellNoRow}
                          onChange={(e) => setSelectedItem({ ...selectedItem, cellNoRow: e.target.value })}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="cellArea" className="forlabel">Cell Area</Label>
                        <Input
                          type="text"
                          name="cellArea"
                          id="cellArea"
                          value={selectedItem.cellArea}
                          onKeyPress={(e) => {
                            const validKey = /[0-9.]/.test(e.key);
                            if (!validKey) {
                              e.preventDefault();
                            }
                          }}
                          maxLength={5}
                          onPaste={(e) => {
                            const pastedText = e.clipboardData.getData('text');
                            const sanitizedText = pastedText.replace(/[^0-9.]/g, '');
                            document.execCommand('insertText', false, sanitizedText);
                            e.preventDefault();
                          }}
                          onChange={(e) => setSelectedItem({ ...selectedItem, cellArea: e.target.value })}
                        />
                      </FormGroup>
                    </Col>

                  </Row>


                  {/* Add more form fields as needed */}
                </ModalBody>
                <ModalFooter style={{
                  backgroundImage:
                    "url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)",
                  backgroundSize: "cover",
                }} r>
                  <Button color="primary" outline
                    onClick={handleSaveChanges}

                  >Save Changes</Button>{' '}
                  <Button color="danger" outline onClick={handleCancelModify}>Cancel</Button>
                </ModalFooter>
              </Modal>
            )}
          </CardBody>


        </Card>
      </div>
    </>
  );
}


