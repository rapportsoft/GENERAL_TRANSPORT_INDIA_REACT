// import AuthContext from '../Components/AuthProvider';
// import { useNavigate } from 'react-router-dom';
// import React, { useEffect, useContext, useState, useRef } from 'react';
// import '../Components/Style.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch, faUserCheck } from '@fortawesome/free-solid-svg-icons';
// import { faEdit } from '@fortawesome/free-solid-svg-icons';
// import { faTrash } from '@fortawesome/free-solid-svg-icons';
// import { faCheck, faSave, faTimes, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Form from 'react-bootstrap/Form';
// import ipaddress from '../Components/IpAddress';
// import InputGroup from 'react-bootstrap/InputGroup';
// import Table from 'react-bootstrap/Table';
// import { Button } from "react-bootstrap";
// import axios from 'axios';
// import { Pagination } from 'react-bootstrap';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'
// import ReactLoading from 'react-loading';
// import {
//   Card,
//   CardBody,
//   FormGroup,
//   Label,
//   Input,

// } from "reactstrap";
// import Select from 'react-select';
// import CFSService from '../service/CFSService';
// import useAxios from '../Components/useAxios';


// export default function UserRights() {

//   const axiosInstance = useAxios();
//   const cfsService = new CFSService(axiosInstance);

//   const styles = {
//     overlay: {
//       position: 'fixed',
//       top: 0,
//       left: 0,
//       width: '100%',
//       height: '100%',
//       backgroundColor: 'rgba(255, 255, 255, 0.8)', // Adjust the opacity and color as needed
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       zIndex: 9999, // Ensure the overlay is above other elements
//     },
//   };

//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();


//   const [mappedUsers, setmappedUsers] = useState([]);
//   const [mappedUser, setmappedUser] = useState(null);
//   const [errors, setErrors] = useState({});
//   const [userRights, setUserRights] = useState([]);

 
//   const {
//     jwtToken,
//     userId,
//     username,
//     branchId,
//     companyid,
//     role,
//     companyname,
//     branchname,
//     isAuthenticated,
//     login,
//     logout,
//   } = useContext(AuthContext);

//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate('/login?message=You need to be authenticated to access this page.');
//     }
//   }, [isAuthenticated, navigate]);

//   const getAllUserRights = async (companyid, branchId, userId) => {

//     setLoading(true);
//     setUserRights([]);
//     try {
//       const response = await cfsService.getAllUsersRights(companyid, branchId, userId,jwtToken);
//       setUserRights(response.data);     
//     } catch (error) {
//       console.error("Error fetching user rights:", error);

//     }
//     finally {
//       setLoading(false);
//     }
//   };

//   // Pagination 
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10; // Number of items to display per page


//   const handleSaveUserRights = async (companyid, branchId, userId, rightsUserId, userRights) => {
//     setCurrentPage(1);
//     setLoading(true);
//     try {
//       const response = await cfsService.saveUserRights(companyid, branchId, userId, rightsUserId, userRights,jwtToken);
//       setUserRights(response.data);
//       toast.success("User Rights Updated Successfully!", {
//         position: 'top-center',
//         autoClose: 1000,
//         style: { width: '26vw' }
//       });
//     } catch (error) {
//       console.error("Error saving user rights:", error);
//       toast.error("Something went wrong!", {
//         position: 'top-center',
//         autoClose: 1000
//       });
//     }
//     finally {
//       setLoading(false);
//     }
//   };

 


//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentUserRights = userRights.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(userRights.length / itemsPerPage);
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const displayPages = () => {
//     const centerPageCount = 5;
//     const middlePage = Math.floor(centerPageCount / 2);
//     let startPage = currentPage - middlePage;
//     let endPage = currentPage + middlePage;

//     if (startPage < 1) {
//       startPage = 1;
//       endPage = Math.min(totalPages, centerPageCount);
//     }

//     if (endPage > totalPages) {
//       endPage = totalPages;
//       startPage = Math.max(1, totalPages - centerPageCount + 1);
//     }

//     return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
//   };

//   const getAllUsers = async () => {
//     setLoading(true);
//     try {
//       const response = await cfsService.getAllUsersToSelect(companyid, branchId,jwtToken);
//       const partyOptions = response.data.map(user => ({
//         value: user.autoId,
//         label: user.user_Name
//       }));
//       setmappedUsers(partyOptions);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//     finally {
//       setLoading(false);
//     }
//   };


//   useEffect(() => {
//     getAllUsers();
//   }, []);

//   // Handle Select UserId
//   const handleUserIdChange = selectedOption => {
//     setmappedUser(selectedOption);
//     if (selectedOption) {
//       getAllUserRights(companyid, branchId, selectedOption.value);
//     } else {
//       setUserRights([]);
//     }
//   };


//   const handleUserRightChange = (e, processId, propertyName) => {
//     const updatedRights = userRights.map(right => {
//       console.log(processId, propertyName);
//       if (right.process_Id === processId) {
//         return { ...right, [propertyName]: e.target.checked ? 'Y' : 'N' };
//       }
//       return right;
//     });
//     setUserRights(updatedRights);
//   };


//   return (
//     <div className='Container'>

//       {loading && (
//         <div style={styles.overlay}>
//           <ReactLoading type="spin" color="#0000FF" height={300} width={80} />
//         </div>
//       )}

//       <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-20px' }} > <FontAwesomeIcon
//         icon={faUserCheck}
//         style={{
//           marginRight: '8px',
//           color: 'black',
//         }}
//       />User Rights</h5>

//       <Card style={{ backgroundColor: "#F8F8F8" }}>
//         <CardBody>
//           <Row>
//             <Col sm={4}>

//               <FormGroup>
//                 <Label className="forlabel" for="branchId">Branch Name</Label>
//                 <Input
//                   type="text"
//                   name="branchname"
//                   id="service"
//                   value={branchname}
//                   readOnly
//                 />
//               </FormGroup>

//             </Col>


//             <Col md={4}>
//               <FormGroup>
//                 <label className="inputHeader" htmlFor="sbRequestId">
//                   Select Mapped User
//                 </label>
//                 <Select
//                   options={mappedUsers}
//                   value={mappedUser}
//                   placeholder="Select Mapped User"
//                   isClearable
//                   id="mappedUser"
//                   className={errors.mappedUser ? 'error-border' : ''}
//                   onChange={handleUserIdChange}
//                 />
//               </FormGroup>
//             </Col>

//             <Col md={4}>
//               <Button
//                 type="submit"
//                 className="newButton"
//                 style={{ marginTop: '23px' }}
//                 variant="outline-primary"
//                 onClick={() => handleSaveUserRights(companyid, branchId, userId, mappedUser.value, userRights)}
//                 disabled={!mappedUser}
//               >
//                 <FontAwesomeIcon
//                   icon={faSave}
//                   style={{ marginRight: "5px" }}
//                 />
//                 Submit
//               </Button>

//             </Col>
//             <hr />
//           </Row>


//           {userRights.length > 0 ? (
//             <Row>
//               <Col md={10}>
//                 <div className="table-responsive">
//                   <Table className="table table-bordered table-hover tableHeader">
//                     <thead className='text-center'>
//                       <tr className='tableHeader' style={{ fontWeight: 'bold', fontSize: '16px' }}>
//                         <th style={{ height: '50px' }}>Parent Menu Process</th>
//                         <th>Read</th>
//                         <th>Add</th>
//                         <th>Edit</th>
//                         <th>Remove</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {currentUserRights.map((pm, index1) => (
//                         <tr key={index1}>
//                           <td>{pm.status}</td>
//                           <td className="text-center">
//                             <div className="mb-1">
//                               <input
//                                 type="checkbox"
//                                 checked={pm.allow_Read === 'Y'}
//                                 onChange={(e) => handleUserRightChange(e, pm.process_Id, 'allow_Read')}
//                                 style={{ width: 20, height: 20 }}
//                               />
//                             </div>
//                           </td>
//                           <td className="text-center">
//                             <div className="mb-1">
//                               <input
//                                 type="checkbox"
//                                 checked={pm.allow_Create === 'Y'}
//                                 onChange={(e) => handleUserRightChange(e, pm.process_Id, 'allow_Create')}
//                                 style={{ width: 20, height: 20 }}
//                               />
//                             </div>
//                           </td>
//                           <td className="text-center">
//                             <div className="mb-1">
//                               <input
//                                 type="checkbox"
//                                 checked={pm.allow_Update === 'Y'}
//                                 onChange={(e) => handleUserRightChange(e, pm.process_Id, 'allow_Update')}
//                                 style={{ width: 20, height: 20 }}
//                               />
//                             </div>
//                           </td>
//                           <td className="text-center">
//                             <div className="mb-1">
//                               <input
//                                 type="checkbox"
//                                 checked={pm.allow_Delete === 'Y'}
//                                 onChange={(e) => handleUserRightChange(e, pm.process_Id, 'allow_Delete')}
//                                 style={{ width: 20, height: 20 }}
//                               />
//                             </div>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </Table>
//                 </div>
//                 <div className="text-center">
//                   <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
//                     <Pagination.First onClick={() => handlePageChange(1)} />
//                     <Pagination.Prev
//                       onClick={() => handlePageChange(currentPage - 1)}
//                       disabled={currentPage === 1}
//                     />
//                     <Pagination.Ellipsis />
//                     {displayPages().map((pageNumber) => (
//                       <Pagination.Item
//                         key={pageNumber}
//                         active={pageNumber === currentPage}
//                         onClick={() => handlePageChange(pageNumber)}
//                       >
//                         {pageNumber}
//                       </Pagination.Item>
//                     ))}
//                     <Pagination.Ellipsis />
//                     <Pagination.Next
//                       onClick={() => handlePageChange(currentPage + 1)}
//                       disabled={currentPage === totalPages}
//                     />
//                     <Pagination.Last onClick={() => handlePageChange(totalPages)} />
//                   </Pagination>
//                 </div>
//               </Col>
//             </Row>
//           ) : null}

//         </CardBody>
//       </Card>

//     </div >
//   );
// }


import AuthContext from '../Components/AuthProvider';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useContext, useState, useRef } from 'react';
import '../Components/Style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faRefresh, faSearch, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheck, faSave, faTimes, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import ipaddress from '../Components/IpAddress';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import { Button } from "react-bootstrap";
import axios from 'axios';
import { Pagination } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import ReactLoading from 'react-loading';
import {
  Card,
  CardBody,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import Select from 'react-select';
import CFSService from '../service/CFSService';
import useAxios from '../Components/useAxios';


export default function UserRights() {

  const axiosInstance = useAxios();
  const cfsService = new CFSService(axiosInstance);

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

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const [mappedUsers, setmappedUsers] = useState([]);
  const [mappedUser, setmappedUser] = useState(null);
  const [userRights, setUserRights] = useState([]);


  const {
    jwtToken,
    userId,
    username,
    branchId,
    companyid,
    role,
    companyname,
    branchname,
    isAuthenticated,
    login,
    logout,
  } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login?message=You need to be authenticated to access this page.');
    }
  }, [isAuthenticated, navigate]);

  const getAllUserRights = async (companyid, branchId, userId) => {

    setLoading(true);
    setUserRights([]);
    try {
      const response = await cfsService.getAllUsersRights(companyid, branchId, userId, jwtToken);
      console.log('response.data ',response.data);
      
      setUserRights(response.data);
    } catch (error) {
      console.error("Error fetching user rights:", error);

    }
    finally {
      setLoading(false);
    }
  };

  // Pagination 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items to display per page


  const handleSaveUserRights = async (companyid, branchId, userId, rightsUserId, userRights) => {

    if (!userRights || userRights.length === 0) {
      toast.warn("No user rights to update!", {
        position: 'top-center',
        autoClose: 1000
      });
      return;
    }

    setCurrentPage(1);
    setLoading(true);
    try {
      const response = await cfsService.saveUserRights(companyid, branchId, userId, rightsUserId, userRights, jwtToken);
      setUserRights(response.data);
      toast.success("User Rights Updated Successfully!", {
        position: 'top-center',
        autoClose: 1000,
        style: { width: '26vw' }
      });
    } catch (error) {
      console.error("Error saving user rights:", error);
      toast.error("Something went wrong!", {
        position: 'top-center',
        autoClose: 1000
      });
    }
    finally {
      setLoading(false);
    }
  };




  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUserRights = userRights.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(userRights.length / itemsPerPage);
  const handlePageChange = (page) => {
    setCurrentPage(page);
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

  const getAllUsers = async () => {
    setLoading(true);
    try {
      const response = await cfsService.getAllUsersToSelect(companyid, branchId, jwtToken);
      const partyOptions = response.data.map(user => ({
        value: user.autoId,
        label: user.user_Name
      }));
      setmappedUsers(partyOptions);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    getAllUsers();
  }, []);

  // Handle Select UserId
  const handleUserIdChange = selectedOption => {
    setmappedUser(selectedOption);
    if (selectedOption) {
      getAllUserRights(companyid, branchId, selectedOption.value);
    } else {
      setUserRights([]);
    }
  };


  const handleUserRightChange = (e, processId, propertyName) => {
    const updatedRights = userRights.map(right => {
      console.log(processId, propertyName);
      if (right.process_Id === processId) {
        return { ...right, [propertyName]: e.target.checked ? 'Y' : 'N' };
      }
      return right;
    });
    setUserRights(updatedRights);
  };


  const [isModalOpenForRightsSearch, setIsModalOpenForRightsSearch] = useState(false);

  const [searchRightsvalues, setSearchRightsvalues] = useState('');
  const [previousData, setPreviousData] = useState([]);

  const [currentPagePre, setCurrentPagePre] = useState(1);
  const itemsPerPagePre = 10; // Number of items to display per page
  const indexOfLastItemPre = currentPagePre * itemsPerPagePre;
  const indexOfFirstItemPre = indexOfLastItemPre - itemsPerPagePre;
  const currentUserRightsPre = previousData.slice(indexOfFirstItemPre, indexOfLastItemPre);
  const totalPagesPre = Math.ceil(previousData.length / itemsPerPagePre);

  const handlePageChangePre = (page) => {
    setCurrentPagePre(page);
  };

  const displayPagesPre = () => {
    const centerPageCount = 5;
    const middlePage = Math.floor(centerPageCount / 2);
    let startPage = currentPage - middlePage;
    let endPage = currentPage + middlePage;

    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(totalPagesPre, centerPageCount);
    }

    if (endPage > totalPagesPre) {
      endPage = totalPagesPre;
      startPage = Math.max(1, totalPagesPre - centerPageCount + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  const clearRightsSearch = (val) => {
    setSearchRightsvalues('');
    searchRightsSearch(mappedUser ? mappedUser.value : '');
  }

  const handleCloseRightsSearch = () => {
    setIsModalOpenForRightsSearch(false);
    setSearchRightsvalues('');
    setPreviousData([]);
    setSelectedItems([]);
  }


  const handleOpenRightsSearch = (userId) => {
    setIsModalOpenForRightsSearch(true);
    setSearchRightsvalues('');
    searchRightsSearch(userId, '');
    setSelectedItems([]);
  }


  const searchRightsSearch = async (userId, searchvalue) => {
    setCurrentPagePre(1);
    setLoading(true);
    try {
      const response = await cfsService.getNotSavedEntriesRights(companyid, branchId, searchvalue, userId, jwtToken);
      setPreviousData(response.data);
      console.log('pre : \n', response.data);
    } catch (error) {
      console.error("Error fetching SB entries:", error);
    } finally {
      setLoading(false);
    }
  };




  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  // Function to handle individual checkbox change
  const handleRowCheckboxChange = (invoice) => {
    const isChecked = selectedItems.some((item) => item.process_Id === invoice.process_Id);

    if (isChecked) {
      const updatedSelectedItems = selectedItems.filter((item) => item.process_Id !== invoice.process_Id);
      setSelectedItems(updatedSelectedItems);
    } else {
      setSelectedItems([...selectedItems, invoice]);
    }
  };

  // Use useEffect to manage selectAll state
  useEffect(() => {
    setSelectAll(selectedItems.length === previousData.length);
  }, [selectedItems, previousData]);

  // Function to handle select all checkbox change
  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(previousData);
    }
    setSelectAll(!selectAll);
  };


  const addToUserRights = async (selectedItems) => {

    if (!selectedItems || selectedItems.length === 0) {
      toast.warn("Select at least one page!", {
        position: 'top-center',
        autoClose: 1000,
        style: { width: '26vw' }
      });
      return; // Exit the function early
    }


    for (const item of selectedItems) {
      const { process_Id } = item;
      const exists = userRights.some(userRight => userRight.process_Id === process_Id);
      if (!exists) {
        userRights.push(item);
      }
    }
    await handleCloseRightsSearch();
    return userRights;
  };

  const allUserRights = userRights || []; 
  const handleUserRightChangeAll = (e, propertyName) => {
    const updatedRights = userRights.map(right => {
      return { ...right, [propertyName]: e.target.checked ? 'Y' : 'N' };
    });
    setUserRights(updatedRights);
  };


  const isChecked = (propertyName) => {
    return allUserRights.every(right => right[propertyName] === 'Y');
  };
  


  return (
    <div className='Container'>

      {loading && (
        <div style={styles.overlay}>
          <ReactLoading type="spin" color="#0000FF" height={300} width={80} />
        </div>
      )}

      <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-20px' }} > <FontAwesomeIcon
        icon={faUserCheck}
        style={{
          marginRight: '8px',
          color: 'black',
        }}
      />User Rights</h5>

      <Card style={{ backgroundColor: "#F8F8F8" }}>
        <CardBody>
          <Row>
            <Col sm={4}>

              <FormGroup>
                <Label className="forlabel" for="branchId">Branch Name</Label>
                <Input
                  type="text"
                  name="branchname"
                  id="service"
                  value={branchname}
                  readOnly
                />
              </FormGroup>

            </Col>


            <Col md={4}>
              <FormGroup>
                <label className="inputHeader" htmlFor="sbRequestId">
                  Select Mapped User
                </label>

                <Select
                  options={mappedUsers}
                  value={mappedUser}
                  // className={errors.mappedUser ? 'error-border' : ''}
                  onChange={handleUserIdChange}
                  placeholder="Select Mapped User"
                  isClearable
                  id="mappedUser"
                   styles={{
                      control: (provided, state) => ({
                        ...provided,
                        height: 32,  // Set the height of the select input
                        minHeight: 32,
                        border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
                        // display: 'flex',
                        // alignItems: 'center',  // Vertically center the content
                        // padding: '0 10px',     // Ensure padding is consistent
                        // borderRadius: '6px',
                        // width: '100%',
                        // boxSizing: 'border-box',
                        // position: 'relative',  // Ensure positioning doesn't cause layout issues
                      }),
            
                      valueContainer: (provided) => ({
                        ...provided,
                        // display: 'flex',
                        alignItems: 'center',  // Vertically center the text
                        padding: '0 8px',
                        height: '100%',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        lineHeight: '28px',
                        maxWidth: 'calc(100% - 20px)',
                        position: 'relative',
                        overflow: 'visible',
                      }),
            
                      input: (provided) => ({
                        ...provided,
                        width: '100%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        outline: 'none', // Avoid outline clashes
                      }),
            
                      singleValue: (provided) => ({
                        ...provided,
                        lineHeight: '32px',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                      }),
            
                      clearIndicator: (provided) => ({
                        ...provided,
                        padding: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        right: 5,
                        top: '50%',
                        transform: 'translateY(-50%)', // Vertically center the clear indicator
                      }),
            
                      indicatorSeparator: () => ({
                        display: 'none', // Remove the separator between indicators
                      }),
            
                      dropdownIndicator: () => ({
                        display: 'none', // Remove the dropdown arrow
                      }),
            
                      placeholder: (provided) => ({
                        ...provided,
                        lineHeight: '32px',
                        color: 'gray',
                      }),
                    }}
                />
              </FormGroup>
            </Col>

            <Col md={4}>
              <Button
                type="submit"
                className="newButton"
                style={{ marginTop: '22px' }}
                variant="outline-primary"
                onClick={() => handleSaveUserRights(companyid, branchId, userId, mappedUser.value, userRights)}
                disabled={!mappedUser}
              >
                <FontAwesomeIcon
                  icon={faSave}
                  style={{ marginRight: "5px" }}
                />
                Submit
              </Button>

              <Button
                type="submit"
                className="newButton"
                style={{ marginTop: '22px', marginLeft: '30px' }}
                variant="outline-primary"
                onClick={() => handleOpenRightsSearch(mappedUser ? mappedUser.value : '')}
                disabled={!mappedUser}
              >
                <FontAwesomeIcon
                  icon={faAdd}
                  style={{ marginRight: "5px" }}
                />
                Add Pages
              </Button>

            </Col>
            <hr />
          </Row>


          {userRights.length > 0 ? (
            <Row>
              <Col md={12}>
                <div className="table-responsive">
                  <Table className="table table-bordered table-hover tableHeader">
                    <thead className='text-center'>
                      <tr className='tableHeader' style={{ fontWeight: 'bold', fontSize: '16px' }}>
                        <th style={{ height: '50px' }}>Process</th>
                        <th>Read

                          <div className="mb-1">
                            <input
                              type="checkbox"
                              checked={isChecked('allow_Read')}
                              onChange={(e) => handleUserRightChangeAll(e, 'allow_Read')}
                              style={{ width: 20, height: 20 }}
                            />
                          </div>


                        </th>
                        <th>Add

                          <div className="mb-1">
                            <input
                              type="checkbox"
                              checked={isChecked('allow_Create')}
                              onChange={(e) => handleUserRightChangeAll(e, 'allow_Create')}
                              style={{ width: 20, height: 20 }}
                            />
                          </div>

                        </th>
                        <th>Edit

                          <div className="mb-1">
                            <input
                              type="checkbox"
                              checked={isChecked('allow_Update')}
                              onChange={(e) => handleUserRightChangeAll(e, 'allow_Update')}
                              style={{ width: 20, height: 20 }}
                            />
                          </div>

                        </th>
                        <th>Remove

                          <div className="mb-1">
                            <input
                              type="checkbox"
                              checked={isChecked('allow_Delete')}
                              onChange={(e) => handleUserRightChangeAll(e, 'allow_Delete')}
                              style={{ width: 20, height: 20 }}
                            />
                          </div>

                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentUserRights.map((pm, index1) => (
                        <tr key={index1}>
                          <td className="text-center">{pm.status}</td>
                          <td className="text-center">
                            <div className="mb-1">
                              <input
                                type="checkbox"
                                checked={pm.allow_Read === 'Y'}
                                onChange={(e) => handleUserRightChange(e, pm.process_Id, 'allow_Read')}
                                style={{ width: 20, height: 20 }}
                              />
                            </div>
                          </td>
                          <td className="text-center">
                            <div className="mb-1">
                              <input
                                type="checkbox"
                                checked={pm.allow_Create === 'Y'}
                                onChange={(e) => handleUserRightChange(e, pm.process_Id, 'allow_Create')}
                                style={{ width: 20, height: 20 }}
                              />
                            </div>
                          </td>
                          <td className="text-center">
                            <div className="mb-1">
                              <input
                                type="checkbox"
                                checked={pm.allow_Update === 'Y'}
                                onChange={(e) => handleUserRightChange(e, pm.process_Id, 'allow_Update')}
                                style={{ width: 20, height: 20 }}
                              />
                            </div>
                          </td>
                          <td className="text-center">
                            <div className="mb-1">
                              <input
                                type="checkbox"
                                checked={pm.allow_Delete === 'Y'}
                                onChange={(e) => handleUserRightChange(e, pm.process_Id, 'allow_Delete')}
                                style={{ width: 20, height: 20 }}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
                <div className="text-center">
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
              </Col>
            </Row>
          ) : null}

        </CardBody>
      </Card>

      {/* USERRIGHT NEW */}

      <Modal Modal isOpen={isModalOpenForRightsSearch} onClose={handleCloseRightsSearch} toggle={handleCloseRightsSearch} style={{ maxWidth: '1100px', fontSize: 14, wioverflow: '-moz-hidden-unscrollable' }}>

        <ModalHeader toggle={handleCloseRightsSearch} style={{
          backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font', textAlign: 'center', background: '#26a69a',
          boxShadow: '0px 5px 10px rgba(0, 77, 64, 0.3)',
          border: '1px solid rgba(0, 0, 0, 0.3)',
          borderRadius: '0',
          backgroundImage: 'radial-gradient( circle farthest-corner at 48.4% 47.5%,  rgba(122,183,255,1) 0%, rgba(21,83,161,1) 90% )',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }} >


          <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', color: 'white' }} > <FontAwesomeIcon
            icon={faSearch}
            style={{
              marginRight: '8px',
              color: 'white',
            }}
          />Search user Rights</h5>

        </ModalHeader>
        <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
          <Row>
            <Col md={6}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  Search by Page Name
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="searchRightsvalues"
                  maxLength={15}
                  name='searchRightsvalues'
                  value={searchRightsvalues}
                  style={{ height: '37px', fontSize: '16px' }}
                  onChange={(e) => setSearchRightsvalues(e.target.value)}
                />

              </FormGroup>
            </Col>
            <Col md={6} style={{ marginTop: 22 }}>
              <button
                className="btn btn-outline-primary btn-margin newButton"
                style={{ marginRight: 10, fontWeight: 'bold' }}
                id="submitbtn2"
                onClick={() => searchRightsSearch(mappedUser ? mappedUser.value : '', searchRightsvalues)}
              >
                <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
                Search
              </button>
              <button
                className="btn btn-outline-danger btn-margin newButton"
                style={{ marginRight: 10, fontWeight: 'bold' }}
                id="submitbtn2"
                onClick={clearRightsSearch}
              >
                <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
                Reset
              </button>

              <button
                className="btn btn-outline-primary btn-margin newButton"
                style={{ marginRight: 10, fontWeight: 'bold' }}
                id="submitbtn2"
                onClick={() => addToUserRights(selectedItems)}
              >
                <FontAwesomeIcon icon={faAdd} style={{ marginRight: "5px" }} />
                Insert Pages
              </button>

            </Col>
          </Row>
          {/* <hr style={{margin: 0, padding: 0}} /> */}


          {previousData.length > 0 ? (
            <Row>
              <Col md={12}>
                <div className="table-responsive">
                  <Table className="table table-bordered table-hover tableHeader">
                    <thead className='text-center'>
                      <tr className='tableHeader' style={{ fontWeight: 'bold', fontSize: '16px' }}>
                        <th style={{ height: '50px' }}> <Input
                          className="form-check-input radios"
                          type="checkbox"
                          style={{ width: '1.2vw', height: '1.2vw' }}
                          checked={selectAll}
                          onChange={() => handleSelectAllChange()}
                        /></th>
                        <th>Process Id</th>
                        <th>Page Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentUserRightsPre.map((pm, index1) => (
                        <tr key={index1}>
                          <td className="text-center"><Input
                            className="form-check-input radios"
                            type="checkbox"
                            style={{ width: '1.2vw', height: '1.2vw' }}
                            name="taxApplicable"
                            checked={selectedItems.some((item) => item.process_Id === pm.process_Id)}
                            onChange={() => handleRowCheckboxChange(pm)}
                          /></td>
                          <td className="text-center">
                            {pm.process_Id}
                          </td>
                          <td className="text-center">
                            {pm.status}
                          </td>

                        </tr>
                      ))}



                    </tbody>
                  </Table>
                </div>
                <div className="text-center">
                  <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
                    <Pagination.First onClick={() => handlePageChangePre(1)} />
                    <Pagination.Prev
                      onClick={() => handlePageChangePre(currentPagePre - 1)}
                      disabled={currentPagePre === 1}
                    />
                    <Pagination.Ellipsis />
                    {displayPagesPre().map((pageNumber) => (
                      <Pagination.Item
                        key={pageNumber}
                        active={pageNumber === currentPagePre}
                        onClick={() => handlePageChangePre(pageNumber)}
                      >
                        {pageNumber}
                      </Pagination.Item>
                    ))}
                    <Pagination.Ellipsis />
                    <Pagination.Next
                      onClick={() => handlePageChangePre(currentPagePre + 1)}
                      disabled={currentPagePre === totalPagesPre}
                    />
                    <Pagination.Last onClick={() => handlePageChangePre(totalPagesPre)} />
                  </Pagination>
                </div>

              </Col>
            </Row>
          ) : null}



          {/* <div className="mt-1 table-responsive ">
            <table className="table table-bordered table-hover tableHeader">
              <thead className='tableHeader'>
                <tr className='text-center'>
                  <th scope="col">#</th>
                  <th scope="col">H_SB_Trans_Id</th>
                  <th scope="col">SB Trans Date</th>
                  <th scope="col">SB No</th>
                  <th scope="col">SB Date</th>
                  <th scope="col">POL</th>

                  <th scope="col">Port Name</th>
                  <th scope="col">POD</th>
                  <th scope="col">Exporter Name</th>
                  <th scope="col">Party_Name</th>
                  <th scope="col">Profit Centre Id</th>

                  <th scope="col">Profitcentre Desc</th>
                  <th scope="col">Status</th>
                </tr>
                <tr className='text-center'>
                  <th scope="col"></th>
                  <th scope="col">{sbSearchData.length}</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <tr className='text-center'>
                  <td>
                    <input type="radio" name="radioGroup" onChange={() => selectCSBSearchRadio('', '', '', '', '', '', '', '', '', '')} value={''} />
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>

                </tr>
                {currentItemsSbSearch.map((item, index) => (
                  <>
                    <tr key={index} className='text-center'>
                      <td>
                        <input type="radio" name="radioGroup" onChange={() => selectCSBSearchRadio(item[0], item[1], item[3], item[10])} value={item[0]} />
                      </td>
                      <td>{item[1]}</td>
                      <td>{formatDate(item[2])}</td>
                      <td>{item[3]}</td>
                      <td>{formatDate(item[4])}</td>
                      <td>{item[5]}</td>
                      <td>{item[6]}</td>
                      <td>{item[7]}</td>
                      <td>{item[8]}</td>
                      <td>{item[9]}</td>
                      <td>{item[10]}</td>
                      <td>{item[11]}</td>
                      <td>{item[12] === 'A' ? 'Approved' : ''}</td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
            <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
              <Pagination.First onClick={() => handlePageChangeSbSearch(1)} />
              <Pagination.Prev
                onClick={() => handlePageChangeSbSearch(currentPageSbSearch - 1)}
                disabled={currentPageSbSearch === 1}
              />
              <Pagination.Ellipsis />

              {displayPagesSbSearch().map((pageNumber) => (
                <Pagination.Item
                  key={pageNumber}
                  active={pageNumber === currentPageSbSearch}
                  onClick={() => handlePageChangeSbSearch(pageNumber)}
                >
                  {pageNumber}
                </Pagination.Item>
              ))}

              <Pagination.Ellipsis />
              <Pagination.Next
                onClick={() => handlePageChangeSbSearch(currentPageSbSearch + 1)}
                disabled={currentPageSbSearch === totalPagesSbSearch}
              />
              <Pagination.Last onClick={() => handlePageChangeSbSearch(totalPagesSbSearch)} />
            </Pagination>
          </div> */}
        </ModalBody>
      </Modal>












    </div >
  );
}