
// import AuthContext from '../Components/AuthProvider';
// import { useNavigate } from 'react-router-dom';
// import React, { useEffect, useState, useContext } from 'react';
// import '../Components/Style.css';
// import ipaddress from "../Components/IpAddress";
// import useAxios from '../Components/useAxios';
// import { axisClasses } from '@mui/x-charts';
// import { BarChart } from '@mui/x-charts';
// import Select from 'react-select';
// import { LineChart, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';
// import { toast } from "react-toastify";
// import { Pagination } from "react-bootstrap";
// import Swal from 'sweetalert2';
// import "../Components/Style.css"
// import {
//     Card,
//     CardBody,
//     Container,
//     Row,
//     Col,
//     Form,
//     FormGroup,
//     Label,
//     Input,
//     Table,
// } from "reactstrap";
// import DatePicker from "react-datepicker";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faIdBadge, faChartGantt, faBold, faBox, faArrowAltCircleLeft, faSearch, faRefresh, faUpload, faFileExcel, faSave, faCheck, faUser, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
// import '../assets/css/style.css'
// import '../Components/Style.css'


// export default function User() {
//     const [loading, setLoading] = useState(false);
//     const styles = {
//         overlay: {
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             width: '100%',
//             height: '100%',
//             backgroundColor: 'rgba(255, 255, 255, 0.8)',
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             zIndex: 9999,
//         },
//         label: {
//             backgroundColor: '#e3eefa',
//             padding: '5px',
//             borderRadius: '4px',
//         }
//     };

//     const navigate = useNavigate();
//     const axios = useAxios();
//     const { isAuthenticated } = useContext(AuthContext);

//     // If the user is not authenticated, redirect to the login page
//     useEffect(() => {
//         if (!isAuthenticated) {

//             navigate('/login?message=You need to be authenticated to access this page.');
//         }
//     }, [isAuthenticated, navigate]);

//     const {
//         jwtToken,
//         userId,
//         username,
//         branchId,
//         companyid,
//         role,
//         companyname,
//         branchname,
//         login,
//         logout,
//         userType
//     } = useContext(AuthContext);

//     const [mappedUser, setMappedUser] = useState([]);
//     const [search, setSearch] = useState('')
//     const [filteredData, setFilteredData] = useState([]);

//     const handleSearchReset = () => {
//         setSearch('');
//         handleSearch('');
//     }

//     const handleSearch = (search) => {
//         setLoading(true);
//         axios.get(`${ipaddress}user/getAllUser?cid=${companyid}&bid=${branchId}&search=${search}`, {
//             headers: {
//                 'Authorization': `Bearer ${jwtToken}`
//             }
//         })
//             .then((response) => {
//                 console.log('users ', response.data);
//                 setLoading(false);
//                 setFilteredData(response.data);
//             })
//             .catch((error) => {
//                 setLoading(false);
//             })
//     }

//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage] = useState(10);

//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
//     const totalPages = Math.ceil(filteredData.length / itemsPerPage);

//     // Function to handle page change
//     const handlePageChange = (page) => {
//         if (page >= 1 && page <= totalPages) {
//             setCurrentPage(page);
//         }
//     };
//     const displayPages = () => {
//         const centerPageCount = 5;
//         const middlePage = Math.floor(centerPageCount / 2);
//         let startPage = currentPage - middlePage;
//         let endPage = currentPage + middlePage;

//         if (startPage < 1) {
//             startPage = 1;
//             endPage = Math.min(totalPages, centerPageCount);
//         }

//         if (endPage > totalPages) {
//             endPage = totalPages;
//             startPage = Math.max(1, totalPages - centerPageCount + 1);
//         }

//         return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
//     };

//     const getMappedUser = () => {
//         console.log('Bearer ', jwtToken);
//         axios.get(`${ipaddress}user/getMappedData?cid=${companyid}&bid=${branchId}`, {
//             headers: {
//                 'Authorization': `Bearer ${jwtToken}`
//             }
//         })
//             .then((response) => {
//                 const mapped = response.data.map(item => ({
//                     value: item.autoId,
//                     label: item.user_Name,
//                 }));
//                 setMappedUser(mapped);
//                 console.log('mapped ', response.data);
//             })
//             .catch((error) => {
//                 console.error('Error fetching mapped user data:', error);
//             });
//     }

//     // const getMappedUser = () => {

//     //     try {
//     //         const response = fetchData(axios.get(`${ipaddress}user/getMappedData?cid=${companyid}&bid=${branchId}`))
//     //         console.log('response ',response);
//     //         const mapped = response.map(item => ({
//     //             value: item.user_Id,
//     //             label: item.user_Name,
//     //         }));
//     //         setMappedUser(mapped);
//     //     } catch (error) {

//     //     }
//     // }


//     useEffect(() => {
//         getMappedUser();
//         handleSearch(search);
//     }, [])

//     const [mapUser, setMapuser] = useState('');
//     const [mapId, setMapId] = useState('');

//     const handlePartyChange = async (selectedOption, { action }) => {

//         if (action === 'clear') {
//             setMapuser('');
//             setMapId('');

//         }
//         else {
//             setMapuser(selectedOption ? selectedOption.label : '');
//             setMapId(selectedOption ? selectedOption.value : '');
//         }
//     }

//     const [user_id, setUser_id] = useState('');
//     const [user_name, setUser_name] = useState('');
//     const [user_pass, setUse_pass] = useState('');
//     const [status, setStatus] = useState('');
//     const [userEmail, setUserEmail] = useState('');
//     const [stopTrans, setStopTrans] = useState('N');
//     const [comments, setComments] = useState('');
//     const [autoId, setAutoId] = useState('');
//     const [flag, setFlag] = useState('add');

//     const [formErrors, setFormErrors] = useState({
//         user_Id: "",
//         user_Name: "",
//         user_Password: "",

//     });


//     console.log('map map ', mapId);

//     const validateEmail = (email) => {
//         // Regular expression for basic email validation
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return emailRegex.test(email);
//     };

//     const saveData = () => {
//         setLoading(true);
//         let errors = {};

//         if (!user_id) {
//             errors.user_Id = "User ID is required."

//             document.getElementById('user_Id').classList.add('error-border');

//         }
//         if (!user_name) {
//             errors.user_Name = "Username is required."
//             document.getElementById('user_Name').classList.add('error-border');
//         }

//         if (!user_pass) {
//             errors.user_Password = "User Password is required."
//             document.getElementById('user_Password').classList.add('error-border');
//         }





//         if (Object.keys(errors).length > 0) {
//             setFormErrors(errors);
//             setLoading(false);
//             return;
//         }

//         if (userEmail) {
//             if (!validateEmail(userEmail)) {
//                 toast.error("Invalid user email.", {
//                     autoClose: 800
//                 })
//                 setLoading(false);
//                 return;
//             }
//         }

//         const formData = {
//             accountNonExpired: true,
//             accountNonLocked: true,
//             approved_By: null,
//             approved_Date: null,
//             authorities: null,
//             autoId: autoId,
//             branch_Id: branchId,
//             comments: comments,
//             company_Id: companyid,
//             created_By: null,
//             created_Date: null,
//             credentialsNonExpired: true,
//             defaultotp: "1000",
//             edited_By: null,
//             edited_Date: null,
//             enabled: true,
//             logintype: "",
//             logintypeid: "",
//             mapped_User: mapUser,
//             mobile: "0",
//             otp: "",
//             password: "",
//             passwordChangeOTP: "",
//             role: "ROLE_USER",
//             status: "A",
//             stop_Trans: stopTrans,
//             user_Email: userEmail,
//             user_Id: user_id,
//             user_Name: user_name,
//             user_Password: user_pass,
//             user_Type: mapId,
//             username: ""
//         }
//         console.log('mapId ', mapId, " ", mapUser);
//         axios.post(`${ipaddress}user/saveUser?cid=${companyid}&bid=${branchId}&userId=${userId}&flag=${flag}`,
//             formData,
//             {
//                 headers: {
//                     'Authorization': `Bearer ${jwtToken}`
//                 }
//             }
//         )
//             .then((response) => {

//                 setLoading(false);
//                 const data = response.data;
//                 console.log('data ', data);
//                 if (data === 'already exist') {
//                     toast.error("User already exist.", {
//                         autoClose: 800
//                     })
//                 }
//                 else if (data === 'not exist') {
//                     toast.error("User not exist.", {
//                         autoClose: 800
//                     })
//                 }

//                 else {
//                     toast.success("Data save successfully", {
//                         autoClose: 800
//                     })
//                     getMappedUser();
//                     setUse_pass(data.user_Password);
//                     setUser_id(data.user_Id);
//                     setUser_name(data.user_Name);
//                     setStatus(data.status);
//                     setUserEmail(data.user_Email);
//                     setAutoId(data.autoId);
//                     setMapUser(data.user_Type, data.mapped_User)
//                     setComments(data.comments);
//                     setFlag('edit');
//                     setFormErrors({
//                         user_Id: "",
//                         user_Name: "",
//                         user_Password: "",


//                     })
//                     document.getElementById('user_Id').classList.remove('error-border');
//                     document.getElementById('user_Name').classList.remove('error-border');
//                     document.getElementById('user_Password').classList.remove('error-border');
//                     handleSearch(search);
//                 }
//             })
//             .catch((error) => {
//                 setLoading(false);
//                 const data = error.response.data;
//                 if (data === 'already exist') {
//                     toast.error("User already exist.", {
//                         autoClose: 800
//                     })
//                 }
//                 else if (data === 'not exist') {
//                     toast.error("User not exist.", {
//                         autoClose: 800
//                     })
//                 }
//                 else if (data === 'email already exist') {
//                     toast.error("User email already exist.", {
//                         autoClose: 800
//                     })
//                 }
//             })
//     }
//     const setMapUser = (id, user) => {
//         console.log("uuuuu ", id, " ", user);
//         setMapuser(user);
//         setMapId(id)
//     }


//     const handleClear = () => {
//         setFormErrors({
//             user_Id: "",
//             user_Name: "",
//             user_Password: "",


//         })
//         document.getElementById('user_Id').classList.remove('error-border');
//         document.getElementById('user_Name').classList.remove('error-border');
//         document.getElementById('user_Password').classList.remove('error-border');

//         setUser_id('');
//         setUser_name('');
//         setUse_pass('');
//         setMapId('');
//         setMapuser('');
//         setStatus('');
//         setUserEmail('');
//         setStopTrans('N');
//         setComments('');
//         setAutoId('');
//         setFlag('add');
//     }

//     const handleEdit = (userid, username, userpass, mapid, mapuser, status, email, stoptrans, comm, autoid) => {
//         console.log(mapid, mapuser);
//         setUser_id(userid);
//         setUser_name(username);
//         setUse_pass(userpass);
//         console.log('map ', mapid);
//         setMapId(mapid);
//         setMapuser(mapuser);
//         setStatus(status);
//         setUserEmail(email);
//         setStopTrans(stoptrans);
//         setComments(comm);
//         setAutoId(autoid);
//         setFlag('edit');
//     }

//     const deleteData = (id) => {
//         Swal.fire({
//             title: 'Are you sure?',
//             html: `Are you sure you want to delete the record?`,
//             icon: 'warning',
//             showCancelButton: true,
//             customClass: {
//                 icon: 'icon-smaller' // Apply the custom class to the icon
//             },
//             confirmButtonColor: '#3085d6',
//             cancelButtonColor: '#d33',
//             confirmButtonText: 'Yes, close it!'
//         }).then((result) => {
//             if (result.isConfirmed) {

//                 axios.post(`${ipaddress}user/deleteUser?cid=${companyid}&bid=${branchId}&id=${id}`, null, {
//                     headers: {
//                         Authorization: `Bearer ${jwtToken}`
//                     }
//                 })
//                     .then((response) => {

//                         if (response.data === 'success') {
//                             Swal.fire({
//                                 title: "Deleted!",
//                                 text: "Data deleted successfully!!!",
//                                 icon: "success"
//                             });
//                             handleSearch(search)
//                         }

//                     })
//                     .catch((error) => {

//                     })

//             }
//         });
//     }

//     return (
//         <>
//             {loading && (
//                 <div style={styles.overlay}>
//                     <div className="loader">
//                         <div className="truckWrapper">
//                             <div className="truckBody">
//                                 <svg
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     fill="none"
//                                     viewBox="0 0 198 93"
//                                     className="trucksvg"
//                                 >
//                                     <path
//                                         strokeWidth="3"
//                                         stroke="#282828"
//                                         fill="#F83D3D"
//                                         d="M135 22.5H177.264C178.295 22.5 179.22 23.133 179.594 24.0939L192.33 56.8443C192.442 57.1332 192.5 57.4404 192.5 57.7504V89C192.5 90.3807 191.381 91.5 190 91.5H135C133.619 91.5 132.5 90.3807 132.5 89V25C132.5 23.6193 133.619 22.5 135 22.5Z"
//                                     ></path>
//                                     <path
//                                         strokeWidth="3"
//                                         stroke="#282828"
//                                         fill="#7D7C7C"
//                                         d="M146 33.5H181.741C182.779 33.5 183.709 34.1415 184.078 35.112L190.538 52.112C191.16 53.748 189.951 55.5 188.201 55.5H146C144.619 55.5 143.5 54.3807 143.5 53V36C143.5 34.6193 144.619 33.5 146 33.5Z"
//                                     ></path>
//                                     <path
//                                         strokeWidth="2"
//                                         stroke="#282828"
//                                         fill="#282828"
//                                         d="M150 65C150 65.39 149.763 65.8656 149.127 66.2893C148.499 66.7083 147.573 67 146.5 67C145.427 67 144.501 66.7083 143.873 66.2893C143.237 65.8656 143 65.39 143 65C143 64.61 143.237 64.1344 143.873 63.7107C144.501 63.2917 145.427 63 146.5 63C147.573 63 148.499 63.2917 149.127 63.7107C149.763 64.1344 150 64.61 150 65Z"
//                                     ></path>
//                                     <rect
//                                         strokeWidth="2"
//                                         stroke="#282828"
//                                         fill="#FFFCAB"
//                                         rx="1"
//                                         height="7"
//                                         width="5"
//                                         y="63"
//                                         x="187"
//                                     ></rect>
//                                     <rect
//                                         strokeWidth="2"
//                                         stroke="#282828"
//                                         fill="#282828"
//                                         rx="1"
//                                         height="11"
//                                         width="4"
//                                         y="81"
//                                         x="193"
//                                     ></rect>
//                                     <rect
//                                         strokeWidth="3"
//                                         stroke="#282828"
//                                         fill="#DFDFDF"
//                                         rx="2.5"
//                                         height="90"
//                                         width="121"
//                                         y="1.5"
//                                         x="6.5"
//                                     ></rect>
//                                     <rect
//                                         strokeWidth="2"
//                                         stroke="#282828"
//                                         fill="#DFDFDF"
//                                         rx="2"
//                                         height="4"
//                                         width="6"
//                                         y="84"
//                                         x="1"
//                                     ></rect>
//                                 </svg>
//                             </div>
//                             <div className="truckTires">
//                                 <svg
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     fill="none"
//                                     viewBox="0 0 30 30"
//                                     className="tiresvg"
//                                 >
//                                     <circle
//                                         strokeWidth="3"
//                                         stroke="#282828"
//                                         fill="#282828"
//                                         r="13.5"
//                                         cy="15"
//                                         cx="15"
//                                     ></circle>
//                                     <circle fill="#DFDFDF" r="7" cy="15" cx="15"></circle>
//                                 </svg>
//                                 <svg
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     fill="none"
//                                     viewBox="0 0 30 30"
//                                     className="tiresvg"
//                                 >
//                                     <circle
//                                         strokeWidth="3"
//                                         stroke="#282828"
//                                         fill="#282828"
//                                         r="13.5"
//                                         cy="15"
//                                         cx="15"
//                                     ></circle>
//                                     <circle fill="#DFDFDF" r="7" cy="15" cx="15"></circle>
//                                 </svg>
//                             </div>
//                             <div className="road"></div>
//                             <svg
//                                 xmlSpace="preserve"
//                                 viewBox="0 0 453.459 453.459"
//                                 xmlnsXlink="http://www.w3.org/1999/xlink"
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 id="Capa_1"
//                                 version="1.1"
//                                 fill="#000000"
//                                 className="lampPost"
//                             >
//                                 <path
//                                     d="M252.882,0c-37.781,0-68.686,29.953-70.245,67.358h-6.917v8.954c-26.109,2.163-45.463,10.011-45.463,19.366h9.993
//             c-1.65,5.146-2.507,10.54-2.507,16.017c0,28.956,23.558,52.514,52.514,52.514c28.956,0,52.514-23.558,52.514-52.514
//             c0-5.478-0.856-10.872-2.506-16.017h9.992c0-9.354-19.352-17.204-45.463-19.366v-8.954h-6.149C200.189,38.779,223.924,16,252.882,16
//             c29.952,0,54.32,24.368,54.32,54.32c0,28.774-11.078,37.009-25.105,47.437c-17.444,12.968-37.216,27.667-37.216,78.884v113.914
//             h-0.797c-5.068,0-9.174,4.108-9.174,9.177c0,2.844,1.293,5.383,3.321,7.066c-3.432,27.933-26.851,95.744-8.226,115.459v11.202h45.75
//             v-11.202c18.625-19.715-4.794-87.527-8.227-115.459c2.029-1.683,3.322-4.223,3.322-7.066c0-5.068-4.107-9.177-9.176-9.177h-0.795
//             V196.641c0-43.174,14.942-54.283,30.762-66.043c14.793-10.997,31.559-23.461,31.559-60.277C323.202,31.545,291.656,0,252.882,0z
//             M232.77,111.694c0,23.442-19.071,42.514-42.514,42.514c-23.442,0-42.514-19.072-42.514-42.514c0-5.531,1.078-10.957,3.141-16.017
//             h78.747C231.693,100.736,232.77,106.162,232.77,111.694z"
//                                 ></path>
//                             </svg>
//                         </div>
//                     </div>
//                 </div>
//             )}
//             <div className='Container'>
//                 <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-20px' }} > <FontAwesomeIcon
//                     icon={faUser}
//                     style={{
//                         marginRight: '8px',
//                         color: 'black', // Set the color to golden
//                     }}
//                 />User</h5>
//                 <Card style={{ backgroundColor: "#F8F8F8" }}>
//                     <CardBody>
//                         <Row>

//                             <Col md={3}>
//                                 <FormGroup>
//                                     <label className="forlabel" htmlFor="userId">
//                                         User ID <span className='error-message'>*</span>
//                                     </label>
//                                     <input
//                                         className="form-control"
//                                         type="text"
//                                         id="user_Id"
//                                         maxLength={100}
//                                         value={user_id}
//                                         disabled={flag==='edit'}
//                                         onChange={(e) => setUser_id(e.target.value)}
//                                     />
//                                     <div style={{ color: 'red' }} className="error-message">{formErrors.user_Id}</div>

//                                 </FormGroup>
//                             </Col>
//                             <Col md={3}>
//                                 <FormGroup>
//                                     <label className="forlabel" htmlFor="userName">
//                                         User Name <span className='error-message'>*</span>
//                                     </label>
//                                     <input
//                                         className="form-control"
//                                         type="text"
//                                         id="user_Name"
//                                         maxLength={255}
//                                         value={user_name}
//                                         onChange={(e) => setUser_name(e.target.value)}
//                                     />
//                                     <div style={{ color: 'red' }} className="error-message">{formErrors.user_Name}</div>

//                                 </FormGroup>
//                             </Col>
//                             <Col md={3}>
//                                 <FormGroup>
//                                     <label className="forlabel" htmlFor="userPassword">
//                                         User Password <span className='error-message'>*</span>
//                                     </label>
//                                     <input
//                                         className="form-control"
//                                         type="password"
//                                         id="user_Password"
//                                         maxLength={30}
//                                         value={user_pass}
//                                         onChange={(e) => setUse_pass(e.target.value)}
//                                     />
//                                     <div style={{ color: 'red' }} className="error-message">{formErrors.user_Password}</div>

//                                 </FormGroup>
//                             </Col>
//                             <Col md={3}>
//                                 <FormGroup>
//                                     <label className="forlabel" htmlFor="status">
//                                         Status
//                                     </label>
//                                     <input
//                                         className="form-control"
//                                         type="text"
//                                         id="status"
//                                         readOnly
//                                         style={{ backgroundColor: "#E0E0E0" }}
//                                         maxLength={15}
//                                         value={status === 'A' ? "Approved" : ""}
//                                     />


//                                 </FormGroup>
//                             </Col>
//                         </Row>
//                         <Row>

//                             <Col md={3}>
//                                 <FormGroup>
//                                     <label className="forlabel" htmlFor="userEmail">
//                                         User Email
//                                     </label>
//                                     <input
//                                         className="form-control"
//                                         type="email"
//                                         id="user_Email"
//                                         maxLength={50}
//                                         value={userEmail}
//                                         onChange={(e) => setUserEmail(e.target.value)}
//                                     />


//                                 </FormGroup>
//                             </Col>
//                             <Col md={3}>
//                                 <FormGroup>
//                                     <label className="forlabel" htmlFor="mappedUSer">
//                                         Mapped user
//                                     </label>
//                                     <Select
//                                         options={mappedUser}
//                                         placeholder="Select Mapped User"
//                                         isClearable
//                                         id="mappeduser"
//                                         onChange={handlePartyChange}
//                                         value={{ value: mapId, label: mapUser }}
//                                         styles={{
//                                             control: (provided, state) => ({
//                                                 ...provided,
//                                                 border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
//                                                 boxShadow: 'none',
//                                                 '&:hover': {
//                                                     border: '1px solid #ccc'
//                                                 }
//                                             }),
//                                             indicatorSeparator: () => ({
//                                                 display: 'none'
//                                             }),
//                                             dropdownIndicator: () => ({
//                                                 display: 'none'
//                                             }),
//                                             placeholder: (provided) => ({
//                                                 ...provided,
//                                                 display: 'flex',
//                                                 color: 'gray',
//                                             }),
//                                         }}
//                                     />


//                                 </FormGroup>
//                             </Col>
//                             <Col md={3}>
//                                 <FormGroup>
//                                     <label className="forlabel" htmlFor="status">
//                                         Stop trans
//                                     </label>
//                                     <Input
//                                         type="select" value={stopTrans} onChange={(e) => setStopTrans(e.target.value)}>

//                                         <option value="N">No</option>
//                                         <option value="Y">Yes</option>
//                                     </Input>


//                                 </FormGroup>
//                             </Col>
//                             <Col md={3}>
//                                 <FormGroup>
//                                     <label className="forlabel" htmlFor="userEmail">
//                                         Comments
//                                     </label>
//                                     <Input
//                                         className="form-control"
//                                         type="textarea"
//                                         id="comments"
//                                         maxLength={150}
//                                         value={comments}
//                                         onChange={(e) => setComments(e.target.value)}
//                                     />


//                                 </FormGroup>
//                             </Col>
//                         </Row>
//                         <Row className='text-center'>
//                             <Col style={{ marginTop: 24 }}>
//                                 <button
//                                     onClick={saveData}
//                                     className="btn btn-outline-primary btn-margin newButton"
//                                     style={{ marginRight: 10 }}
//                                     id="submitbtn2"
//                                 >
//                                     <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
//                                     Submit
//                                 </button>
//                                 <button
//                                     className="btn btn-outline-danger btn-margin newButton"
//                                     style={{ marginRight: 10 }}
//                                     id="submitbtn2"
//                                     onClick={handleClear}
//                                 >
//                                     <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
//                                     Reset
//                                 </button>
//                             </Col>
//                         </Row>
//                         <hr />
//                         <Row>
//                             <Col md={3}>
//                                 <FormGroup>
//                                     <label className="forlabel" htmlFor="userEmail">
//                                         Search By UserId / UserName
//                                     </label>
//                                     <Input
//                                         className="form-control"
//                                         type="text"
//                                         id="comments"
//                                         maxLength={15}
//                                         value={search}
//                                         onChange={(e) => setSearch(e.target.value)}
//                                     />


//                                 </FormGroup>
//                             </Col>
//                             <Col md={3} style={{ marginTop: 24 }}>
//                                 <button
//                                     className="btn btn-outline-success btn-margin newButton"
//                                     style={{ marginRight: 10 }}
//                                     id="submitbtn2"
//                                     onClick={() => handleSearch(search)}
//                                 >
//                                     <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
//                                     Search
//                                 </button>
//                                 <button
//                                     className="btn btn-outline-danger btn-margin newButton"
//                                     style={{ marginRight: 10 }}
//                                     id="submitbtn2"
//                                     onClick={handleSearchReset}
//                                 >
//                                     <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
//                                     Reset
//                                 </button>
//                             </Col>
//                         </Row>
//                         <Row>
//                             <div className='mt-1 table-responsive'>
//                                 <table className="table table-bordered table-hover tableHeader">
//                                     <thead className="tableHeader">
//                                         <tr>
//                                             <th scope="col" className="text-center" style={{ color: 'black' }}>#</th>
//                                             <th scope="col" className="text-center" style={{ color: 'black' }}>User Id</th>
//                                             <th scope="col" className="text-center" style={{ color: 'black' }}>User Name</th>
//                                             <th scope="col" className="text-center" style={{ color: 'black' }}>Mapped user</th>
//                                             <th scope="col" className="text-center" style={{ color: 'black' }}>Status</th>
//                                             <th scope="col" className="text-center" style={{ color: 'black' }}>Action</th>

//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {currentItems.map((item, index) => (
//                                             <tr key={index} className="text-center">
//                                                 <th scope="row">{((currentPage - 1) * itemsPerPage) + index + 1}</th>
//                                                 <td>{item.user_Id}</td>
//                                                 <td>{item.user_Name}</td>
//                                                 <td>{item.mapped_User}</td>
//                                                 <td>{item.status === 'A' ? 'Approved' : item.status === 'D' ? 'Deleted' : ""}</td>
//                                                 <td>
//                                                     <button
//                                                         className="btn btn-outline-primary btn-margin newButton"
//                                                         style={{ marginRight: 10 }}
//                                                         id="submitbtn2"
//                                                         onClick={() => handleEdit(item.user_Id, item.user_Name, item.user_Password, item.user_Type, item.mapped_User, item.status, item.user_Email, item.stop_Trans, item.comments, item.autoId)}
//                                                     >
//                                                         <FontAwesomeIcon icon={faEdit} style={{ marginRight: "5px" }} />

//                                                     </button>
//                                                     {/* <button
//                                                         className="btn btn-outline-danger btn-margin newButton"
//                                                         onClick={() => deleteData(item.autoId)}
//                                                         id="submitbtn2"

//                                                     >
//                                                         <FontAwesomeIcon icon={faTrash} style={{ marginRight: "5px" }} />

//                                                     </button> */}
//                                                 </td>

//                                             </tr>

//                                         ))}
//                                     </tbody>
//                                 </table>
//                                 <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
//                                     <Pagination.First onClick={() => handlePageChange(1)} />
//                                     <Pagination.Prev
//                                         onClick={() => handlePageChange(currentPage - 1)}
//                                         disabled={currentPage === 1}
//                                     />
//                                     <Pagination.Ellipsis />

//                                     {displayPages().map((pageNumber) => (
//                                         <Pagination.Item
//                                             key={pageNumber}
//                                             active={pageNumber === currentPage}
//                                             onClick={() => handlePageChange(pageNumber)}
//                                         >
//                                             {pageNumber}
//                                         </Pagination.Item>
//                                     ))}

//                                     <Pagination.Ellipsis />
//                                     <Pagination.Next
//                                         onClick={() => handlePageChange(currentPage + 1)}
//                                         disabled={currentPage === totalPages}
//                                     />
//                                     <Pagination.Last onClick={() => handlePageChange(totalPages)} />
//                                 </Pagination>
//                             </div>
//                         </Row>
//                     </CardBody>
//                 </Card>
//             </div >

//         </>
//     )
// }




import AuthContext from '../Components/AuthProvider';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import '../Components/Style.css';
import ipaddress from "../Components/IpAddress";
import useAxios from '../Components/useAxios';
import { axisClasses } from '@mui/x-charts';
import { BarChart } from '@mui/x-charts';
import Select from 'react-select';
import { LineChart, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';
import { toast } from "react-toastify";
import { Pagination } from "react-bootstrap";
import Swal from 'sweetalert2';
import "../Components/Style.css"
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge, faChartGantt, faBold, faBox, faArrowAltCircleLeft, faSearch, faRefresh, faUpload, faFileExcel, faSave, faCheck, faUser, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/style.css'
import '../Components/Style.css'


export default function User() {
    const [loading, setLoading] = useState(false);
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

    const navigate = useNavigate();
    const axios = useAxios();
    const { isAuthenticated } = useContext(AuthContext);

    // If the user is not authenticated, redirect to the login page
    useEffect(() => {
        if (!isAuthenticated) {

            navigate('/login?message=You need to be authenticated to access this page.');
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
        userType
    } = useContext(AuthContext);

    const [mappedUser, setMappedUser] = useState([]);
    const [search, setSearch] = useState('')
    const [filteredData, setFilteredData] = useState([]);

    const handleSearchReset = () => {
        setSearch('');
        handleSearch('');
    }

    const handleSearch = (search) => {
        setLoading(true);
        axios.get(`${ipaddress}user/getAllUser?cid=${companyid}&bid=${branchId}&search=${search}`, {
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                console.log('users ', response.data);
                setLoading(false);
                setFilteredData(response.data);
            })
            .catch((error) => {
                setLoading(false);
            })
    }

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

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

    const getMappedUser = () => {
        console.log('Bearer ', jwtToken);
        axios.get(`${ipaddress}user/getMappedData?cid=${companyid}&bid=${branchId}`, {
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const mapped = response.data.map(item => ({
                    value: item.autoId,
                    label: item.user_Name,
                }));
                setMappedUser(mapped);
                console.log('mapped ', response.data);
            })
            .catch((error) => {
                console.error('Error fetching mapped user data:', error);
            });
    }

    // const getMappedUser = () => {

    //     try {
    //         const response = fetchData(axios.get(`${ipaddress}user/getMappedData?cid=${companyid}&bid=${branchId}`))
    //         console.log('response ',response);
    //         const mapped = response.map(item => ({
    //             value: item.user_Id,
    //             label: item.user_Name,
    //         }));
    //         setMappedUser(mapped);
    //     } catch (error) {

    //     }
    // }


    useEffect(() => {
        getMappedUser();
        handleSearch(search);
    }, [])

    const [mapUser, setMapuser] = useState('');
    const [mapId, setMapId] = useState('');

    const handlePartyChange = async (selectedOption, { action }) => {

        if (action === 'clear') {
            setMapuser('');
            setMapId('');

        }
        else {
            setMapuser(selectedOption ? selectedOption.label : '');
            setMapId(selectedOption ? selectedOption.value : '');
        }
    }

    const [user_id, setUser_id] = useState('');
    const [user_name, setUser_name] = useState('');
    const [user_pass, setUse_pass] = useState('');
    const [status, setStatus] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [stopTrans, setStopTrans] = useState('N');
    const [comments, setComments] = useState('');
    const [autoId, setAutoId] = useState('');
    const [flag, setFlag] = useState('add');

    const [formErrors, setFormErrors] = useState({
        user_Id: "",
        user_Name: "",
        user_Password: "",

    });


    console.log('map map ', mapId);

    const validateEmail = (email) => {
        // Regular expression for basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const saveData = () => {

        let errors = {};

        if (!user_id) {
            errors.user_Id = "User ID is required."

            document.getElementById('user_Id').classList.add('error-border');

        }
        if (!user_name) {
            errors.user_Name = "Username is required."
            document.getElementById('user_Name').classList.add('error-border');
        }

        if (!user_pass) {
            errors.user_Password = "User Password is required."
            document.getElementById('user_Password').classList.add('error-border');
        }


        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            setLoading(false);
            return;
        }

        if (userEmail) {
            if (!validateEmail(userEmail)) {
                toast.error("Invalid user email.", {
                    autoClose: 800
                })
                setEmailError('Please enter a valid email address.');
                return;
            }
            else {
                setEmailError('');
            }
        }


        setLoading(true);

        const formData = {
            accountNonExpired: true,
            accountNonLocked: true,
            approved_By: null,
            approved_Date: null,
            authorities: null,
            autoId: autoId,
            branch_Id: branchId,
            comments: comments,
            company_Id: companyid,
            created_By: null,
            created_Date: null,
            credentialsNonExpired: true,
            defaultotp: "1000",
            edited_By: null,
            edited_Date: null,
            enabled: true,
            logintype: "",
            logintypeid: "",
            mapped_User: mapUser,
            mobile: "0",
            otp: "",
            password: "",
            passwordChangeOTP: "",
            role: "ROLE_USER",
            status: "A",
            stop_Trans: stopTrans,
            user_Email: userEmail,
            user_Id: user_id,
            user_Name: user_name,
            user_Password: user_pass,
            user_Type: mapId,
            username: ""
        }
        axios.post(`${ipaddress}user/saveUser?cid=${companyid}&bid=${branchId}&userId=${userId}&flag=${flag}`,
            formData,
            {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }
            }
        )
            .then((response) => {

                setLoading(false);
                const data = response.data;
                console.log('data ', data);
                if (data === 'already exist') {
                    toast.error("User already exist.", {
                        autoClose: 800
                    })
                }
                else if (data === 'not exist') {
                    toast.error("User not exist.", {
                        autoClose: 800
                    })
                }

                else {
                    toast.success("Data save successfully", {
                        autoClose: 800
                    })
                    getMappedUser();
                    setUse_pass(data.user_Password);
                    setUser_id(data.user_Id);
                    setUser_name(data.user_Name);
                    setStatus(data.status);
                    setUserEmail(data.user_Email);
                    setAutoId(data.autoId);
                    setMapUser(data.user_Type, data.mapped_User)
                    setComments(data.comments);
                    setFlag('edit');
                    setFormErrors({
                        user_Id: "",
                        user_Name: "",
                        user_Password: "",


                    })
                    document.getElementById('user_Id').classList.remove('error-border');
                    document.getElementById('user_Name').classList.remove('error-border');
                    document.getElementById('user_Password').classList.remove('error-border');
                    handleSearch(search);
                }
            })
            .catch((error) => {
                setLoading(false);
                const data = error.response.data;
                if (data === 'already exist') {
                    toast.error("User already exist.", {
                        autoClose: 800
                    })
                }
                else if (data === 'not exist') {
                    toast.error("User not exist.", {
                        autoClose: 800
                    })
                }
                else if (data === 'email already exist') {
                    toast.error("User email already exist.", {
                        autoClose: 800
                    })
                }
            })
    }
    const setMapUser = (id, user) => {
        console.log("uuuuu ", id, " ", user);
        setMapuser(user);
        setMapId(id)
    }


    const handleClear = () => {
        setFormErrors({
            user_Id: "",
            user_Name: "",
            user_Password: "",


        })
        document.getElementById('user_Id').classList.remove('error-border');
        document.getElementById('user_Name').classList.remove('error-border');
        document.getElementById('user_Password').classList.remove('error-border');

        setUser_id('');
        setUser_name('');
        setUse_pass('');
        setMapId('');
        setMapuser('');
        setStatus('');
        setUserEmail('');
        setStopTrans('N');
        setComments('');
        setAutoId('');
        setFlag('add');
    }

    const handleEdit = (userid, username, userpass, mapid, mapuser, status, email, stoptrans, comm, autoid) => {
        console.log(mapid, mapuser);
        setUser_id(userid);
        setUser_name(username);
        setUse_pass(userpass);
        console.log('map ', mapid);
        setMapId(mapid);
        setMapuser(mapuser);
        setStatus(status);
        setUserEmail(email);
        setStopTrans(stoptrans);
        setComments(comm);
        setAutoId(autoid);
        setFlag('edit');
    }

    const deleteData = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            html: `Are you sure you want to delete the record?`,
            icon: 'warning',
            showCancelButton: true,
            customClass: {
                icon: 'icon-smaller' // Apply the custom class to the icon
            },
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, close it!'
        }).then((result) => {
            if (result.isConfirmed) {

                axios.post(`${ipaddress}user/deleteUser?cid=${companyid}&bid=${branchId}&id=${id}`, null, {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`
                    }
                })
                    .then((response) => {

                        if (response.data === 'success') {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Data deleted successfully!!!",
                                icon: "success"
                            });
                            handleSearch(search)
                        }

                    })
                    .catch((error) => {

                    })

            }
        });
    }

    const [emailError, setEmailError] = useState('');


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
            <div className='Container'>
                <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-20px' }} > <FontAwesomeIcon
                    icon={faUser}
                    style={{
                        marginRight: '8px',
                        color: 'black', // Set the color to golden
                    }}
                />User</h5>
                <Card style={{ backgroundColor: "#F8F8F8" }}>
                    <CardBody>
                        <Row>

                            <Col md={3}>
                                <FormGroup>
                                    <label className="forlabel" htmlFor="userId">
                                        User Id <span className='error-message'>*</span>
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="user_Id"
                                        maxLength={10}
                                        value={user_id}
                                        disabled={flag === 'edit'}
                                        onChange={(e) => setUser_id(e.target.value)}
                                    />
                                    <div style={{ color: 'red' }} className="error-message">{formErrors.user_Id}</div>

                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <label className="forlabel" htmlFor="userName">
                                        User Name <span className='error-message'>*</span>
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="user_Name"
                                        maxLength={200}
                                        value={user_name}
                                        onChange={(e) => setUser_name(e.target.value)}
                                    />
                                    <div style={{ color: 'red' }} className="error-message">{formErrors.user_Name}</div>

                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <label className="forlabel" htmlFor="userPassword">
                                        User Password <span className='error-message'>*</span>
                                    </label>
                                    <input
                                        className="form-control"
                                        type="password"
                                        id="user_Password"
                                        maxLength={30}
                                        value={user_pass}
                                        onChange={(e) => setUse_pass(e.target.value)}
                                    />
                                    <div style={{ color: 'red' }} className="error-message">{formErrors.user_Password}</div>

                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <label className="forlabel" htmlFor="status">
                                        Status
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="status"
                                        readOnly
                                        style={{ backgroundColor: "#E0E0E0" }}
                                        maxLength={15}
                                        value={status === 'A' ? "Approved" : ""}
                                    />


                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>

                            <Col md={3}>
                                <FormGroup>
                                    <label className="forlabel" htmlFor="userEmail">
                                        User Email
                                    </label>
                                    {/* <input
                                        className="form-control"
                                        type="email"
                                        id="user_Email"
                                        maxLength={50}
                                        value={userEmail}
                                        onChange={(e) => setUserEmail(e.target.value)}
                                    /> */}


                                    <input
                                        className="form-control"
                                        type="email"
                                        id="user_Email"
                                        maxLength={50}
                                        value={userEmail}
                                        // onChange={(e) => setUserEmail(e.target.value)}

                                        onChange={(e) => {
                                            const email = e.target.value;
                                            setUserEmail(email);
                        
                                            // Inline email validation
                                            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                            if (email && !regex.test(email)) {
                                                
                                            } else {
                                                setEmailError('');
                                            }
                                        }}

                                    />
                                    {emailError && <div style={{ color: 'red' }}>{emailError}</div>}


                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <label className="forlabel" htmlFor="mappedUSer">
                                        Mapped user
                                    </label>
                                    <Select
                                        options={mappedUser}
                                        placeholder="Select Mapped User"
                                        isClearable
                                        id="mappeduser"
                                        onChange={handlePartyChange}
                                        value={{ value: mapId, label: mapUser }}
                                        styles={{
                                            control: (provided, state) => ({
                                                ...provided,
                                                height: 32, // Set height
                                                minHeight: 32, // Set minimum height
                                                border: state.isFocused ? "1px solid #ccc" : "1px solid #ccc",
                                                boxShadow: "none",
                                                display: 'flex',
                                                alignItems: 'center', // Align items vertically
                                                padding: 0, // Remove padding to control height
                                                "&:hover": {
                                                    border: "1px solid #ccc",
                                                },
                                                borderRadius: '6px', // Add border radius
                                                "&:hover": {
                                                    border: "1px solid #ccc",
                                                },
                                            }),
                                            valueContainer: (provided) => ({
                                                ...provided,
                                                height: '100%', // Full height of the control
                                                display: 'flex',
                                                alignItems: 'center', // Align items vertically
                                                padding: '0 0.75rem', // Match padding
                                            }),
                                            singleValue: (provided) => ({
                                                ...provided,
                                                lineHeight: '32px', // Center text vertically
                                            }),
                                            indicatorSeparator: () => ({
                                                display: "none",
                                            }),
                                            dropdownIndicator: () => ({
                                                display: "none",
                                            }),
                                            placeholder: (provided) => ({
                                                ...provided,
                                                lineHeight: '32px', // Center placeholder text vertically
                                                color: "gray",
                                            }),
                                            clearIndicator: (provided) => ({
                                                ...provided,
                                                padding: 2, // Remove padding
                                                display: 'flex',
                                                alignItems: 'center', // Align clear indicator vertically
                                            }),
                                        }}
                                    />


                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <label className="forlabel" htmlFor="status">
                                        Stop trans
                                    </label>
                                    <Input
                                        type="select" value={stopTrans} onChange={(e) => setStopTrans(e.target.value)}
                                        className={`form-control`}
                                    >
                                        <option value="N">No</option>
                                        <option value="Y">Yes</option>
                                    </Input>


                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <label className="forlabel" htmlFor="userEmail">
                                        Comments
                                    </label>
                                    <Input
                                        className="form-control"
                                        type="textarea"
                                        id="comments"
                                        maxLength={150}
                                        value={comments}
                                        onChange={(e) => setComments(e.target.value)}
                                    />


                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className='text-center'>
                            <Col style={{ marginTop: 10 }}>
                                <button
                                    onClick={saveData}
                                    className="btn btn-outline-primary btn-margin newButton"
                                    style={{ marginRight: 10 }}
                                    id="submitbtn2"
                                >
                                    <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
                                    Submit
                                </button>
                                <button
                                    className="btn btn-outline-danger btn-margin newButton"
                                    style={{ marginRight: 10 }}
                                    id="submitbtn2"
                                    onClick={handleClear}
                                >
                                    <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
                                    Reset
                                </button>
                            </Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col md={3}>
                                <FormGroup>
                                    <label className="forlabel" htmlFor="userEmail">
                                        Search By UserId / UserName
                                    </label>
                                    <Input
                                        className="form-control"
                                        type="text"
                                        id="comments"
                                        maxLength={15}
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />


                                </FormGroup>
                            </Col>
                            <Col md={3} style={{ marginTop: 24 }}>
                                <button
                                    className="btn btn-outline-success btn-margin newButton"
                                    style={{ marginRight: 10 }}
                                    id="submitbtn2"
                                    onClick={() => handleSearch(search)}
                                >
                                    <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
                                    Search
                                </button>
                                <button
                                    className="btn btn-outline-danger btn-margin newButton"
                                    style={{ marginRight: 10 }}
                                    id="submitbtn2"
                                    onClick={handleSearchReset}
                                >
                                    <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
                                    Reset
                                </button>
                            </Col>
                        </Row>
                        <Row>
                            <div className='mt-1 table-responsive'>
                                <table className="table table-bordered table-hover tableHeader">
                                    <thead className="tableHeader">
                                        <tr>
                                            <th scope="col" className="text-center" style={{ color: 'black' }}>#</th>
                                            <th scope="col" className="text-center" style={{ color: 'black' }}>User Id</th>
                                            <th scope="col" className="text-center" style={{ color: 'black' }}>User Name</th>
                                            <th scope="col" className="text-center" style={{ color: 'black' }}>Mapped user</th>
                                            <th scope="col" className="text-center" style={{ color: 'black' }}>Status</th>
                                            <th scope="col" className="text-center" style={{ color: 'black' }}>Action</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentItems.map((item, index) => (
                                            <tr key={index} className="text-center">
                                                <th scope="row">{((currentPage - 1) * itemsPerPage) + index + 1}</th>
                                                <td>{item.user_Id}</td>
                                                <td>{item.user_Name}</td>
                                                <td>{item.mapped_User}</td>
                                                <td>{item.status === 'A' ? 'Approved' : item.status === 'D' ? 'Deleted' : ""}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-outline-primary btn-margin newButton"
                                                        style={{ marginRight: 10 }}
                                                        id="submitbtn2"
                                                        onClick={() => handleEdit(item.user_Id, item.user_Name, item.user_Password, item.user_Type, item.mapped_User, item.status, item.user_Email, item.stop_Trans, item.comments, item.autoId)}
                                                    >
                                                        <FontAwesomeIcon icon={faEdit} style={{ marginRight: "5px" }} />

                                                    </button>
                                                    {/* <button
                                                        className="btn btn-outline-danger btn-margin newButton"
                                                        onClick={() => deleteData(item.autoId)}
                                                        id="submitbtn2"

                                                    >
                                                        <FontAwesomeIcon icon={faTrash} style={{ marginRight: "5px" }} />

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
                        </Row>
                    </CardBody>
                </Card>
            </div >

        </>
    )
}
