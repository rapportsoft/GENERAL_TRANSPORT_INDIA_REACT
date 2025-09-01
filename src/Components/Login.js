// import React, { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import container1 from "../Images/pxfuel.jpg"
// import container from "../Images/container.jpeg"
// import ButtonGroup from "react-bootstrap/ButtonGroup";
// import Dropdown from "react-bootstrap/Dropdown";
// import "../Components/Style.css";
// import rapport from "../Images/rapportlogo.png";
// import AuthContext from "./AuthProvider";
// import { useNavigate } from "react-router-dom";
// import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
// import { faKey, faRedoAlt, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { ToastContainer, toast } from 'react-toastify';
// import CFSService from "../service/CFSService";
// import useAxios from "./useAxios";


// export default function Login() {
//   const { login } = useContext(AuthContext);

//   const axiosInstance = useAxios();
//   const cfsService = new CFSService(axiosInstance);

//   const [companyName, setCompanyName] = useState([]);
//   const [branchNames, setBranchNames] = useState([]);
//   const [branchid, setBranchId] = useState("B00001");
//   const [companyId, setCompanyId] = useState("C00001");
//   const [errors, setErrors] = useState({});
//   const [user, setUser] = useState('');
//   const [password, setPassword] = useState('');
//   const [otp, setOtp] = useState('');

//   useEffect(() => {
//     getCompanies();


//       getBranchByCompany("C00001");

//   }, []);


//   const getCompanies = async () => {
//     try {
//       const response = await cfsService.getAllCompanies();
//       setCompanyName(response.data);

//       console.log("companies");
//       console.log(response.data);
//     } catch (error) {
//       console.error("Error fetching companies:", error);
//       toast.error('Oops something went wrong!', {
//         position: 'top-center',
//         autoClose: 700,
//       });
//     }
//   };

//   const getBranchByCompany = async (companyId) => {
//     try {
//       const response = await cfsService.getBranchByCompany(companyId);
//       setBranchNames(response.data);
//       console.log("branches");
//       console.log(response.data);
//     } catch (error) {
//       console.error("Error fetching companies:", error);
//       toast.error('Oops something went wrong!', {
//         position: 'top-center',
//         autoClose: 700,
//       });
//     }
//   };

//   const handleUsernameChange = (e) => {
//     setErrors((prevErrors) => {
//       const newErrors = { ...prevErrors };
//       delete newErrors['user'];
//       return newErrors;
//     });
//     setUser(e.target.value);
//   };

//   const handlePasswordChange = (e) => {
//     setErrors((prevErrors) => {
//       const newErrors = { ...prevErrors };
//       delete newErrors['password'];
//       return newErrors;
//     });
//     setPassword(e.target.value);
//   };

//   const handleOTPChange = (event) => {

//     setErrors((prevErrors) => {
//       // Remove the 'otp' error when OTP is entered
//       const newErrors = { ...prevErrors };
//       delete newErrors['otp'];
//       return newErrors;
//     });

//     setOtp(event.target.value);
//   };


//   const handleCompanyIdChange = (e) => {
//     setCompanyId(e.target.value);
//     if (e.target.value) {
//       getBranchByCompany(e.target.value);
//     }
//   };

//   const handleBranchChange = (e) => {

//     setErrors((prevErrors) => {
//       const newErrors = { ...prevErrors };
//       delete newErrors['branch'];
//       return newErrors;
//     });
//     setBranchId(e.target.value);
//   };




//   const handleLogin = async (e) => {

//     const newErrors = {};

//     if (!branchid) {
//       newErrors['branch'] = 'Please Select Branch';
//     }

//     if (!otp) {
//       newErrors['otp'] = 'Please Enter OTP';
//     }
//     if (!user) {
//       newErrors['user'] = 'Please Enter Branch';
//     }

//     if (!password) {
//       newErrors['password'] = 'Please Enter password';
//     }

//     setErrors(newErrors);
//     // Check if there are any errors
//     if (Object.keys(newErrors).length > 0) {
//       return;
//     }
//     e.preventDefault();

//     const params = {
//       username:user,
//       password:password,
//       companyId:companyId,
//       branchid:branchid     
//     }

//     try {

//       const response = await cfsService.login(params,otp);
//       if (response.status === 400) {
//         toast.error("Please enter correct otp", {
//           autoClose: 700
//         })
//       }
//       if (response.status === 200) {
//         const { jwtToken, userId, username, branchId, companyid, role, companyname, branchname, logintype, logintypeid, userType, userRights, parentMenus, childMenus , tabMenus } = response.data;

//         // Store all fields in sessionStorage using the AuthProvider
//         login(jwtToken, userId, username, branchId, companyid, role, companyname, branchname, logintype, logintypeid, userType, userRights, parentMenus, childMenus , tabMenus);
//         // alert('Login successful');
//         toast.success(`Login successful`, {
//           position: 'top-center',
//           autoClose: 600,
//         });
//         if (response.data.logintype === 'Carting Agent' || response.data.logintype === 'Party' || response.data.logintype === 'CHA' || response.data.logintype === 'Console') {
//           navigate("/parent/export");
//         } else {
//           navigate("/parent/dashboard?process_id=P00000");
//         }
//       } else {       
//         toast.error("Login Unsuccessful !!!!", {
//           position: "top-center",
//         });
//       }
//     } catch (error) {
//       //  alert("Login unsuccessful");
//       console.error("Login error:", error);
//       console.log("Login failed");
//       toast.error("Login Unsuccessful !!!!", {
//         position: "top-center",
//       });
//     }
//   };








//   const sectionStyle = {
//     position: 'relative',
//     backgroundColor: '#9A616D',
//     overflow: 'hidden',
//   };

//   const backgroundStyle = {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: '100%',
//     height: '100%',
//     backgroundImage: `url(${container1})`,
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     filter: 'blur(2px)',
//     zIndex: 1,
//   };

//   const contentStyle = {
//     position: 'relative',
//     zIndex: 2,
//   };



//   const navigate = useNavigate();


//   const handleResetPassword = () => {
//     navigate(`/forgot-password`, { state: { compId: 'C00001', branchId: 'B00001' } });

//   };

//   return (

//     <div>
//       <section className="vh-90" style={sectionStyle}>
//         <div style={backgroundStyle}></div>
//         <Container style={contentStyle} className="py-4 h-100">
//           <Row className="d-flex justify-content-center align-items-center h-100">
//             <Col xl={10}>
//               <Card style={{ borderRadius: '25px' }}>
//                 <Row className="form-background g-0">
//                   <Col md={6} lg={5} className="d-none d-md-block">
//                     <img
//                       src={container}
//                       alt="login form"
//                       className="img-fluid"
//                       style={{ borderRadius: '20px 0 0 20px', maxHeight: '100%', maxWidth: '100%' }}
//                     />
//                   </Col>
//                   <Col md={6} lg={7} className="d-flex align-items-center">


//                     <Card.Body className="p-4 p-lg-5 text-black">
//                       <Form style={{ maxWidth: '400px', width: '100%' }}>
//                         <div className="d-flex align-items-center mb-3 pb-1">
//                           <img src={rapport} style={{ width: '100%' }} alt="" />
//                         </div>
//                         <Form.Group className="mt-2">
//                           <Form.Label className="inputHeader">Company Name</Form.Label>
//                           <Form.Select
//                             required
//                             value={companyId}
//                             onChange={handleCompanyIdChange}
//                             className="dw"
//                           >
//                             {/* <option value="">Select Company</option> */}
//                             {companyName.map((cm) => (
//                               <option key={cm.company_Id} value={cm.company_Id}>
//                                 {cm.company_name}
//                               </option>
//                             ))}
//                           </Form.Select>
//                         </Form.Group>
//                         <Form.Group className="mt-2">
//                           <Form.Label className="inputHeader">Branch Name</Form.Label>
//                           <Form.Select
//                             required
//                             value={branchid}
//                             onChange={handleBranchChange}
//                             className="dw"
//                             style={{ height: '40px', borderColor: errors.branch ? '#f52b2b' : '' }}
//                           >
//                             <option value="">Select Branch</option>
//                             {branchNames.map((branch) => (
//                               <option key={branch.branchId} value={branch.branchId}>
//                                 {branch.branchName}
//                               </option>
//                             ))}
//                           </Form.Select>
//                         </Form.Group>
//                         <Form.Group className="mt-2">
//                           <Form.Label className="inputHeader">Username</Form.Label>
//                           <Form.Control
//                             type="text"
//                             value={user}
//                             onChange={handleUsernameChange}
//                             style={{ borderColor: errors.user ? '#f52b2b' : '' }}
//                             required
//                             placeholder="Enter username"
//                             name="user"
//                             autoFocus
//                           />
//                         </Form.Group>
//                         <Form.Group className="mt-2">
//                           <Form.Label className="inputHeader">Password</Form.Label>
//                           <Form.Control
//                             value={password}
//                             type="password"
//                             onChange={handlePasswordChange}
//                             style={{ borderColor: errors.password ? '#f52b2b' : '' }}
//                             required
//                             placeholder="Enter Password"
//                           />                        </Form.Group>

//                         <Row noGutters>
//                           <Col xs={9}>
//                             <Form.Group className="mt-2" controlId="otp">
//                               <Form.Label className="inputHeader">OTP</Form.Label>
//                               <Form.Control
//                                 value={otp}
//                                 type="otp"
//                                 onChange={handleOTPChange}
//                                 required
//                                 placeholder="Enter OTP"
//                                 style={{ borderColor: errors.otp ? '#f52b2b' : '' }}
//                               />
//                             </Form.Group>
//                           </Col>
//                           <Col xs={3}>
//                             <Button
//                               type="button"
//                               className="newButton buttonDown"
//                               variant="outline-primary"
//                               tabIndex='-1'
//                             > <FontAwesomeIcon
//                                 icon={faRedoAlt}
//                                 style={{ marginRight: "5px" }}
//                               />
//                               OTP
//                             </Button>
//                           </Col>
//                         </Row>

//                         <div className="text-center mt-3">
//                           <Button
//                             type="button"
//                             className="newButton"
//                             variant="outline-primary"
//                             style={{ marginRight: '10px' }}
//                             onClick={(e) => handleLogin(e)}
//                           >
//                             <FontAwesomeIcon
//                               icon={faSignInAlt}
//                               style={{ marginRight: "5px" }}
//                             />
//                             Login
//                           </Button>

//                           <Button
//                             type="button"
//                             className="newButton"
//                             fullWidth
//                             style={{ marginRight: '10px' }}
//                             variant="outline-primary"
//                             onClick={handleResetPassword}
//                           >
//                             <FontAwesomeIcon
//                               icon={faKey}
//                               style={{ marginRight: "5px" }}
//                             />
//                             Forgot Password
//                           </Button>
//                         </div>


//                         {/* <div className="pt-1 mb-3">
//                           <a className="small text-muted" href="#!">Forgot password?</a>
//                         </div> */}
//                       </Form>
//                     </Card.Body>

//                   </Col>
//                 </Row>
//               </Card>
//             </Col>
//           </Row>
//         </Container>
//       </section>
//     </div>
//   );
// }








import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import container1 from "../Images/pxfuel.jpg"
import container from "../Images/container.jpeg"
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import "../Components/Style.css";
import rapport from "../Images/rapportlogo.png";
import AuthContext from "./AuthProvider";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { faKey, faRedoAlt, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from 'react-toastify';
import CFSService from "../service/CFSService";
import useAxios from "./useAxios";


export default function Login() {
  const { login } = useContext(AuthContext);

  const axiosInstance = useAxios();
  const cfsService = new CFSService(axiosInstance);

  const [companyName, setCompanyName] = useState([]);
  const [branchNames, setBranchNames] = useState([]);
  const [branchid, setBranchId] = useState("B00001");
  const [companyId, setCompanyId] = useState("C00001");
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');

  useEffect(() => {
    getCompanies();


    getBranchByCompany("C00001");

  }, []);


  const getCompanies = async () => {
    try {
      const response = await cfsService.getAllCompanies();
      setCompanyName(response.data);

      console.log("companies");
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching companies:", error);
      toast.error('Oops something went wrong!', {
        position: 'top-center',
        autoClose: 700,
      });
    }
  };

  const getBranchByCompany = async (companyId) => {
    try {
      const response = await cfsService.getBranchByCompany(companyId);
      setBranchNames(response.data);
      console.log("branches");
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching companies:", error);
      toast.error('Oops something went wrong!', {
        position: 'top-center',
        autoClose: 700,
      });
    }
  };

  const handleUsernameChange = (e) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors['user'];
      return newErrors;
    });
    setUser(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors['password'];
      return newErrors;
    });
    setPassword(e.target.value);
  };

  const handleOTPChange = (event) => {

    setErrors((prevErrors) => {
      // Remove the 'otp' error when OTP is entered
      const newErrors = { ...prevErrors };
      delete newErrors['otp'];
      return newErrors;
    });

    setOtp(event.target.value);
  };


  const handleCompanyIdChange = (e) => {
    setCompanyId(e.target.value);
    if (e.target.value) {
      getBranchByCompany(e.target.value);
    }
  };

  const handleBranchChange = (e) => {

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors['branch'];
      return newErrors;
    });
    setBranchId(e.target.value);
  };




  const handleLogin = async (e) => {

    const newErrors = {};

    if (!branchid) {
      newErrors['branch'] = 'Please Select Branch';
    }

    if (!otp) {
      newErrors['otp'] = 'Please Enter OTP';
    }
    if (!user) {
      newErrors['user'] = 'Please Enter Branch';
    }

    if (!password) {
      newErrors['password'] = 'Please Enter password';
    }

    setErrors(newErrors);
    // Check if there are any errors
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    e.preventDefault();

    const params = {
      username: user,
      password: password,
      companyId: companyId,
      branchid: branchid
    }

    try {

      const response = await cfsService.login(params, otp);
      if (response.status === 400) {
        toast.error("Please enter correct otp", {
          autoClose: 700
        })
      }
      if (response.status === 200) {
        const { jwtToken, userId, username, branchId, companyid, role, companyname, branchname, logintype, logintypeid, userType, userRights, parentMenus, childMenus, tabMenus } = response.data;

        // Store all fields in sessionStorage using the AuthProvider
        login(jwtToken, userId, username, branchId, companyid, role, companyname, branchname, logintype, logintypeid, userType, userRights, parentMenus, childMenus, tabMenus);
        // alert('Login successful');
        toast.success(`Login successful`, {
          position: 'top-center',
          autoClose: 600,
        });
        const dashBoardExist = parentMenus.filter(item => item.processId === "P00000").length > 0 ? true : false;

        if (!dashBoardExist) {
          navigate("/parent/demo");
        } else {
          navigate("/parent/dashboard?process_id=P00000");
        }
      } else {
        toast.error("Login Unsuccessful !!!!", {
          position: "top-center",
        });
      }
    } catch (error) {
      //  alert("Login unsuccessful");
      console.error("Login error:", error);
      console.log("Login failed");
      toast.error("Login Unsuccessful !!!!", {
        position: "top-center",
      });
    }
  };








  const sectionStyle = {
    position: 'relative',
    backgroundColor: '#9A616D',
    overflow: 'hidden',
  };

  const backgroundStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `url(${container1})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'blur(2px)',
    zIndex: 1,
  };

  const contentStyle = {
    position: 'relative',
    zIndex: 2,
  };



  const navigate = useNavigate();


  const handleResetPassword = () => {
    navigate(`/forgot-password`, { state: { compId: 'C00001', branchId: 'B00001' } });

  };

  return (

    <div>
      <section className="vh-100" style={sectionStyle}>
        <div style={backgroundStyle}></div>
        <Container style={contentStyle} className="py-4 h-100">
          <Row className="d-flex justify-content-center align-items-center h-100">
            <Col xl={8}>
              <Card style={{ borderRadius: '25px', marginTop: 36 }}>
                <Row className="form-background g-0">
                  <Col md={6} lg={5} className="d-none d-md-block">
                    <img
                      src={container}
                      alt="login form"
                      className="img-fluid"
                      style={{ borderRadius: '20px 0 0 20px', maxHeight: '100%', maxWidth: '100%' }}
                    />
                  </Col>
                  <Col md={6} lg={7} className="d-flex align-items-center">

                    <Card.Body className="p-4 p-lg-5 text-black">
                      <Form style={{ maxWidth: '400px', width: '100%' }}>
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <img src={rapport} style={{ width: '100%' }} alt="" />
                        </div>
                        <Form.Group className="mt-2">
                          <Form.Label className="inputHeader">Company Name</Form.Label>
                          <Form.Select
                            required
                            value={companyId}
                            onChange={handleCompanyIdChange}
                            className="dw"
                          >
                            {/* <option value="">Select Company</option> */}
                            {companyName.map((cm) => (
                              <option key={cm.company_Id} value={cm.company_Id}>
                                {cm.company_name}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                        <Form.Group className="mt-2">
                          <Form.Label className="inputHeader">Branch Name</Form.Label>
                          <Form.Select
                            required
                            value={branchid}
                            onChange={handleBranchChange}
                            className="dw"
                            style={{ height: '40px', borderColor: errors.branch ? '#f52b2b' : '' }}
                          >
                            <option value="">Select Branch</option>
                            {branchNames.map((branch) => (
                              <option key={branch.branchId} value={branch.branchId}>
                                {branch.branchName}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                        <Form.Group className="mt-2">
                          <Form.Label className="inputHeader">Username</Form.Label>
                          <Form.Control
                            type="text"
                            value={user}
                            onChange={handleUsernameChange}
                            style={{ borderColor: errors.user ? '#f52b2b' : '' }}
                            required
                            placeholder="Enter username"
                            name="user"
                            autoFocus
                          />
                        </Form.Group>
                        <Form.Group className="mt-2">
                          <Form.Label className="inputHeader">Password</Form.Label>
                          <Form.Control
                            value={password}
                            type="password"
                            onChange={handlePasswordChange}
                            style={{ borderColor: errors.password ? '#f52b2b' : '' }}
                            required
                            placeholder="Enter Password"
                          />                        </Form.Group>

                        <Row noGutters>
                          <Col xs={9}>
                            <Form.Group className="mt-2" controlId="otp">
                              <Form.Label className="inputHeader">OTP</Form.Label>
                              <Form.Control
                                value={otp}
                                type="otp"
                                onChange={handleOTPChange}
                                required
                                placeholder="Enter OTP"
                                style={{ borderColor: errors.otp ? '#f52b2b' : '' }}
                              />
                            </Form.Group>
                          </Col>
                          <Col xs={3}>
                            <Button
                              type="button"
                              className="newButton buttonDown"
                              variant="outline-primary"
                              tabIndex='-1'
                            > <FontAwesomeIcon
                                icon={faRedoAlt}
                                style={{ marginRight: "5px" }}
                              />
                              OTP
                            </Button>
                          </Col>
                        </Row>

                        <div className="text-center mt-3">
                          <Button
                            type="button"
                            className="newButton"
                            variant="outline-primary"
                            style={{ marginRight: '10px' }}
                            onClick={(e) => handleLogin(e)}
                          >
                            <FontAwesomeIcon
                              icon={faSignInAlt}
                              style={{ marginRight: "5px" }}
                            />
                            Login
                          </Button>

                          <Button
                            type="button"
                            className="newButton"
                            fullWidth
                            style={{ marginRight: '10px' }}
                            variant="outline-primary"
                            onClick={handleResetPassword}
                          >
                            <FontAwesomeIcon
                              icon={faKey}
                              style={{ marginRight: "5px" }}
                            />
                            Forgot Password
                          </Button>
                        </div>


                        {/* <div className="pt-1 mb-3">
                          <a className="small text-muted" href="#!">Forgot password?</a>
                        </div> */}
                      </Form>
                    </Card.Body>

                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );


}