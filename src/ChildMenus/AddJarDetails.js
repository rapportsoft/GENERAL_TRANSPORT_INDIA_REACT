import AuthContext from "../Components/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../Components/Style.css";
import ipaddress from "../Components/IpAddress";
import useAxios from '../Components/useAxios';
import { Pagination } from "react-bootstrap";
import { faEdit, faTrash, faCheck, faSave, faJarWheat,faTimes, faSyncAlt, faCancel, faPrint, faXmark, faFileLines, faChessKing, faBackspace, faPlus, faHandsHolding, faBackward, faPencil, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { toast } from "react-toastify";

const AddJarDetails = ({ item }) => {
  const { jarid, jartype } = useParams();
  console.log('jariddddd ', jarid);

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const axios = useAxios();
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setJarDetail([]);
    setFormErrors(
      {
        jarDtlDesc: "",
        comments: "",
      }
    )
  };

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [editedJarDetail, setEditedJarDetail] = useState({
    jarDtlDesc: "",
    comments: "",
  });
  const toggleEditModal = (item) => {
    setEditingItem(item);
    setEditedJarDetail({
      jarDtlId: item.jarDtlId,
      jarDtlDesc: item.jarDtlDesc,
      comments: item.comments,
    });
    setIsEditModalOpen(!isEditModalOpen);
    setFormErrors(
      {
        jarDtlDesc: "",
        comments: "",
      }
    )
  };
  const [JarListDtl, setJarListDtl] = useState([]);

  const [jarDetail, setJarDetail] = useState({
    companyId: "",
    jarId: jarid,
    jarDtlDesc: "",
    percentage: "",
    refAttribute: "",
    workflowId: "",
    processId: "",
    comments: "",
    createdBy: username,
    createdDate: "",
    editedBy: username,
    editedDate: "",
    approvedBy: username,
    approvedDate: "",
    status: "",
  });

  const getJar = () => {
    axios
      .get(`${ipaddress}jar/getJar/${jarid}/${companyid}`,{
        headers:{
            Authorization:`Bearer ${jwtToken}`
        }
      })
      .then((response) => {
        console.log("GET jar response:", response.data);
        setJar(response.data); // Store the jar element in the state
      })
      .catch((error) => {
        console.error("GET jar error:", error);
      });
  };
  const [jar, setJar] = useState(null);
  console.log(jar);
  useEffect(() => {
    getJar();
  }, []); // Run the effect only once when the component mounts

  const getlist = () => {
    axios
      .get(`${ipaddress}jardetail/jarIdList/${jarid}/${companyid}`,{
        headers:{
            Authorization:`Bearer ${jwtToken}`
        }
      })
      .then((response) => {
        console.log("GET list response:", response.data);
        setJarListDtl(response.data); // Store the list in the state
      })
      .catch((error) => {
        console.error("GET list error:", error);
      });
  };

  console.log(JarListDtl);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setJarDetail((prevJarDetail) => ({
      ...prevJarDetail,
      [name]: value,
    }));
  };

  useEffect(() => {
    getlist();
  }, []);

  const handleSubmit = () => {
   

  const errors = {};


    if (!jarDetail.jarDtlId) {
      errors.jarDtlId = "Jar DTL Id is required.";
    }

    if (!jarDetail.jarDtlDesc) {
      errors.jarDtlDesc = "Jar DTL Desc is required.";
    }

    if (!jarDetail.jarDtlId) {
      document.getElementById('jarDtlId').classList.add('error-border');
    }

    if (!jarDetail.jarDtlDesc) {
      document.getElementById('jarDtlDesc').classList.add('error-border');
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
  
    console.log("Submitted Jar Detail:", jarDetail);
    jarDetail.status = "N";
    axios
      .post(`${ipaddress}jardetail/add/${companyid}/${jarid}`, jarDetail,{
        headers:{
            Authorization:`Bearer ${jwtToken}`
        }
      })
      .then((response) => {
        console.log("Response:", response.data);
        toast.success("Jar Update Successfully", {
          autoClose: 700
        });
        handleApproveAll();
        getlist();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    // Reload the page    getlist();
    setIsModalOpen(false);
  };

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditedJarDetail((prevEditedDetail) => ({
      ...prevEditedDetail,
      [name]: value,
    }));
  };

  const [formErrors, setFormErrors] = useState({
    jarDtlId: "",
    jarDtlDesc: "",
  });

  const handleEditSave = () => {
    const errors = {};


    if (!editedJarDetail.jarDtlId) {
      errors.jarDtlId = "Jar DTL Id is required.";
    }

    if (!editedJarDetail.jarDtlDesc) {
      errors.jarDtlDesc = "Jar DTL Desc is required.";
    }

    if (!editedJarDetail.jarDtlId) {
      document.getElementById('jarDtlId').classList.add('error-border');
    }

    if (!editedJarDetail.jarDtlDesc) {
      document.getElementById('jarDtlDesc').classList.add('error-border');
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const editedData = {
      ...editingItem,
      jarDtlId: editedJarDetail.jarDtlId,
      jarDtlDesc: editedJarDetail.jarDtlDesc, // Updated field
      comments: editedJarDetail.comments, // Updated field

      // Add other fields from editingItem or editedJarDetail as needed
    };
    axios
      .post(`${ipaddress}jardetail/addUpdateStatus`, editedData,{
        headers:{
            Authorization:`Bearer ${jwtToken}`
        }
      })
      .then((response) => {
        console.log("Response:", response.data);
        handleApproveAll();
        toast.success("Jar Update Successfully", {
          autoClose: 700
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.success(error, {
          autoClose: 700
        });
      });

    getlist();
  };

  const handleDelete = async (item) => {
    var getString = `Are you sure to delete this Details `;
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
      axios
        .delete(`${ipaddress}jardetail/delete/${item.jarDtlId}/${companyid}`,{
            headers:{
                Authorization:`Bearer ${jwtToken}`
            }
          })
        .then((response) => {

          toast.success('JarDtlId Deleted Successfully', {
            autoClose: 700
          });
          getlist(); // Update the list after deletion
        })
        .catch((error) => {
          console.error("Delete error:", error);
          toast.success(error, {
            autoClose: 700
          });

        });
    }
  };
  const buttonStyle = {
    marginRight: "8px", // Adjust the margin as needed for your desired spacing
  };
  const handleApproveAll = async () => {
    try {
      const response = await axios.get(`${ipaddress}jardetail/jarIdListUStatus/${jarid}/${companyid}`
      ,{
        headers:{
            Authorization:`Bearer ${jwtToken}`
        }
      });
      // console.log(response.data);
      setJarListDtl(response.data);

      const JarAppoved = await axios.get(`${ipaddress}jar/getJarForUpdate/${jarid}/${companyid}`,{
        headers:{
            Authorization:`Bearer ${jwtToken}`
        }
      });
      // 
      console.log("Jar Approved request successful!");
      setJar(JarAppoved.data);
      // console.log(JarAppoved.data);
      // Handle the response as needed
    } catch (error) {
      console.error("Error:", error);
      // Handle the error as needed
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = JarListDtl.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(JarListDtl.length / itemsPerPage);

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


  return (
    <div>

<h6
          className="pageHead"
          style={{
            fontFamily: "Your-Heading-Font",
            paddingLeft: "4%",
            paddingRight: "-50px",
          }}
        >
          <FontAwesomeIcon
            icon={faLayerGroup}
            style={{
              marginRight: "8px",
              color: "golden", // Set the color to golden
            }}
          />
         Group Of Master
        </h6>

      
      <Card>
        <CardBody>
          {jar ? (
            <div className="table-responsive">
  <table 
 className="table table-bordered table-hover tableHeader" >
    <thead>
      <tr>
        <th style={{  width: "25%" }} scope="col">
          Group ID
        </th>
        <th style={{  width: "25%" }} scope="col">
          Group Type
        </th>
        <th style={{  width: "25%" }} scope="col">
          Group Desc
        </th>
        <th style={{  width: "25%" }} scope="col">
          Group Status
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{jar.jarId}</td>
        <td>{jar.jarType}</td>
        <td>{jar.jarDesc}</td>
        <td>
          {jar.status === "N"
            ? "New"
            : jar.status === "U"
            ? "Edit"
            : jar.status === "A"
            ? "Approved"
            : jar.status}
        </td>
      </tr>
    </tbody>
  </table>
</div>


          ) : (
            <p>Loading jar element...</p>
          )}
<div className="text-right d-flex justify-content-end">
  <button 
  className="btn btn-outline-primary btn-margin newButton me-md-2"
  color="danger" onClick={toggleModal} style={buttonStyle}>
    <FontAwesomeIcon
      icon={faPlus}
      style={{ marginRight: "5px" }}
    />
    Add {jartype}
  </button>
  <button
   className="btn btn-outline-success btn-margin newButton me-md-2"
    style={buttonStyle}
    onClick={handleApproveAll}
  >
    <FontAwesomeIcon
      icon={faCheck}
      style={{ marginRight: "5px" }}
    />
    Submit
  </button>
  <Link to="/master/Jar">
    <button 
     className="btn btn-margin newButton btn-outline-danger me-md-2" >
      <FontAwesomeIcon
        icon={faBackward}
        style={{ marginRight: "5px" }}
      />
      Back
    </button>
  </Link>
</div>



        </CardBody>

        <CardBody>
      <div className="table-responsive">
  <table className="table table-bordered table-hover tableHeader">
    <thead>
      <tr>
        <th style={{  width: "20%" }} scope="col" className="text-center">
          Group Dtl Desc
        </th>
        <th style={{  width: "20%" }} scope="col" className="text-center">
          Group Dtl Id
        </th>
        <th style={{  width: "20%" }} scope="col" className="text-center">
          Group Dtl Comment
        </th>
        <th style={{  width: "20%" }} scope="col" className="text-center">
          Group Dtl Status
        </th>
        <th style={{  width: "20%" }} scope="col" className="text-center">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      {currentItems.map((item) => (
        <tr key={item.id}>
          <td className="text-center">{item.jarDtlDesc}</td>
          <td className="text-center">{item.jarDtlId}</td>
          <td className="text-center">{item.comments}</td>
          <td className="text-center">
            {item.status === "N"
              ? "New"
              : item.status === "U"
                ? "Edit"
                : item.status === "A"
                  ? "Approved"
                  : item.status}
          </td>
          <td className="text-center">
            <button
              type="button"
              className="btn btn-outline-primary me-md-2"
              onClick={() => toggleEditModal(item)}
            >
              <FontAwesomeIcon icon={faEdit}  />
            </button>
            {/* <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => handleDelete(item)}
            >
              <FontAwesomeIcon icon={faTrash}  />
            </button> */}
          </td>
        </tr>
      ))}
    </tbody>
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

        </CardBody>
      </Card>


      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader 
        style={{
            backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font', textAlign: 'center', background: '#26a69a',
            boxShadow: '0px 5px 10px rgba(0, 77, 64, 0.3)',
            border: '1px solid rgba(0, 0, 0, 0.3)',
            borderRadius: '0',
            backgroundImage: 'radial-gradient( circle farthest-corner at 48.4% 47.5%,  rgba(122,183,255,1) 0%, rgba(21,83,161,1) 90% )',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            //backgroundPosition: 'center',
        }}
        toggle={toggleModal}> Add New {jartype} </ModalHeader>
        <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>
          <FormGroup>
            <Label for="jarDtlId">
              Group Dtl ID<span style={{color: 'red'}}>*</span>
            </Label>
            <Input
              type="text"
              name="jarDtlId"
              id="jarDtlId"
              value={jarDetail.jarDtlId}
              onChange={handleInputChange}
            />
            <div style={{ color: 'red' }} className="error-message">{formErrors.GroupDtlId}</div>

          </FormGroup>
          <FormGroup>
            <Label for="jarDtlDesc" >
              Group Dtl Desc<span style={{color: 'red'}}>*</span>
            </Label>
            <Input
              type="text"
              name="jarDtlDesc"
              id="jarDtlDesc"
              value={jarDetail.jarDtlDesc}
              onChange={handleInputChange}
            />
                       <div style={{ color: 'red' }} className="error-message">{formErrors.jarDtlDesc}</div>


          </FormGroup>
          <FormGroup>
            <Label for="comments" >
              Group Comments
            </Label>
            <Input
              type="text"
              name="comments"
              id="comments"
              value={jarDetail.comments}
              onChange={handleInputChange}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter style={{
              backgroundImage:
                "url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)",
              backgroundSize: "cover",
            }}>
          <button
            type="button"
            className="btn btn-outline-success btn-margin newButton me-md-2"
            onClick={handleSubmit}
          >
            <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
            SUBMIT
          </button>
          <button
            type="button"
            className="btn btn-margin newButton btn-outline-danger me-md-2"
            onClick={toggleModal}
          >
            <FontAwesomeIcon icon={faCancel} style={{ marginRight: "5px" }} />
            CANCEL
          </button>
        </ModalFooter>
      </Modal>
      <></>
      <Modal isOpen={isEditModalOpen} toggle={toggleEditModal}>
        <ModalHeader 
        style={{
            backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font', textAlign: 'center', background: '#26a69a',
            boxShadow: '0px 5px 10px rgba(0, 77, 64, 0.3)',
            border: '1px solid rgba(0, 0, 0, 0.3)',
            borderRadius: '0',
            backgroundImage: 'radial-gradient( circle farthest-corner at 48.4% 47.5%,  rgba(122,183,255,1) 0%, rgba(21,83,161,1) 90% )',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            //backgroundPosition: 'center',
        }}
        toggle={toggleEditModal}>
          <FontAwesomeIcon
                        icon={faPencil}
                        style={{ marginRight: "5px" }}
                      />
          Update {jartype} for {editedJarDetail.jarDtlId}
        </ModalHeader>
        <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>
          <FormGroup>
          

            <Label className="forlabel" for="isoCodeSearch">
            Group Dtl ID<span style={{color: 'red'}}>*</span>
                    </Label>
            <Input
              readOnly
              type="text"
              name="jarDtlId"
              id="jarDtlId"
              value={editedJarDetail.jarDtlId}
              onChange={handleEditInputChange}
              style={{ backgroundColor: "#f0e7e6" }} // Apply gray background color
            />
 
          </FormGroup>

          <FormGroup>
            

            <Label className="forlabel" for="isoCodeSearch">
            Group Dtl Desc<span style={{color: 'red'}}>*</span>
                    </Label>
            <Input
              type="text"
              name="jarDtlDesc"
              id="jarDtlDesc"
              value={editedJarDetail.jarDtlDesc}
              onChange={handleEditInputChange}
            />
             <div style={{ color: 'red' }} className="error-message">{formErrors.jarDtlDesc}</div>
          </FormGroup>
          <FormGroup>
           

            <Label className="forlabel" for="isoCodeSearch">
            Group Comments
                    </Label>
            <Input
              type="text"
              name="comments"
              id="comments"
              value={editedJarDetail.comments}
              onChange={handleEditInputChange}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter style={{
              backgroundImage:
                "url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)",
              backgroundSize: "cover",
            }}>
          <Button outline color="success" onClick={handleEditSave}
            className="btn btn-outline-success btn-margin newButton me-md-2"
          >
            <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
            Save
          </Button>
          <Button outline color="danger" onClick={toggleEditModal}>
            <FontAwesomeIcon icon={faBackward} style={{ marginRight: "5px" }} />
            Back
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
export default AddJarDetails;