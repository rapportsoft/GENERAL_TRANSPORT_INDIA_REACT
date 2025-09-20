import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import container1 from "../Images/pxfuel.jpg"
import container from "../Images/container.jpeg"
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import "../Components/Style.css";
import rapport from "../Images/transport_india_logo.png";
import AuthContext from "./AuthProvider";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { faBackward, faKey, faRedoAlt, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cfsService from "../service/CFSService";
import { ToastContainer, toast } from 'react-toastify';
import useAxios from '../Components/useAxios';

export default function ForgotPassword() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const axios = useAxios();

    const sectionStyle = {
        position: 'relative',
        backgroundColor: '#9A616D',
        overflow: 'hidden',  // Ensure the content doesn't overflow
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
        filter: 'blur(10px)',  // Adjust the blur level as needed
        zIndex: 1,
    };

    const contentStyle = {
        position: 'relative',
        zIndex: 2,
    };


    const [password, setPassword] = useState('');



 const axiosInstance = useAxios();
  const CFSService = new cfsService(axiosInstance);






    const [companies, setCompanies] = useState([]);
    const [branches, setBranches] = useState([]);
    const [companyName, setCompanyName] = useState([]);
    const [branchNames, setBranchNames] = useState([]);
    const location = useLocation();
    const RecriveCompanyId = location.state?.companyId;
    const RecriveBranchId = location.state?.branchid;
    const reactPageName = 'Forgot-Password';
    const [branchid, setBranchId] = useState('');
    const [companyId, setCompanyId] = useState('');
    const [userId, setUserId] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [enterOtp, setEnterOtp] = useState(false);



    const [confirmPassword2, setConfirmPassword2] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [backToLogin, setBackToLogin] = useState(false);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (confirmPassword2 !== '' && e.target.value !== confirmPassword2) {
            setPasswordsMatch(false);
        } else {
            setPasswordsMatch(true);
        }
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword2(e.target.value);
        if (password !== e.target.value) {
            setPasswordsMatch(false);
        } else {
            setPasswordsMatch(true);
        }
    };


    const handleSubmitPassword = () => {


        if (confirmPassword2.trim() === '' || password.trim() === '') {
            toast.error('Please Enter Password!', {
                position: 'top-center',
                autoClose: 800,
            });
            return;
        }





        if (passwordsMatch) {
            CFSService.updatePassword(companyId, branchid, userId, password)
                .then((res) => {
                    if (res.data === true) {

                        toast.success('Password updated successfully!', {
                            position: 'top-center',
                            autoClose: 800,
                        });
                        setBackToLogin(true);
                        // toast.success('Password updated successfully!');
                    } else {
                        // toast.error('Error updating password.');
                        toast.error('Error updating password!', {
                            position: 'top-center',
                            autoClose: 800,
                        });
                    }
                })
                .catch((error) => {
                    // Handle any API request error
                    toast.error('Error updating password!', {
                        position: 'top-center',
                        autoClose: 800,
                    });
                    console.error('Error updating password:', error);
                });
        } else {
            toast.error('Entered Password and Confirm Password Should Be Same!', {
                position: 'top-center',
                autoClose: 800,
                toastId: 'customErrorToast', // Give a custom ID to refer to this toast
                style: {
                    width: 'auto', // Set width to 'auto' to allow the message to fit in one line
                    whiteSpace: 'nowrap', // Prevent the message from wrapping
                    maxWidth: '80%', // Set a maximum width to prevent it from getting too wide
                },
            });

            // toast.error('Enterd PAssword and Confirm Password Should BE Same.');
        }



    };




    const handleBackToLogin = () => {
        navigate("/login");
    };



    useEffect(() => {
        const fetchData = async () => {
            try {
                const companiesResponse = await CFSService.getAllCompanies1(reactPageName);
                setCompanies(companiesResponse.data);

                if (RecriveCompanyId) {
                    const branchesResponse = await CFSService.getBranchesOfCompany2(reactPageName);
                    setBranches(branchesResponse.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [reactPageName, RecriveCompanyId]);


    useEffect(() => {
        const handleDefaultCompany = async () => {
            if (companies.length === 1) {
                const selectedCompanyId = companies[0].company_Id;
                setCompanyId(selectedCompanyId);
                try {
                    const branchesResponse = await CFSService.getBranchesOfCompany2(selectedCompanyId, reactPageName);
                    setBranches(branchesResponse.data);
                } catch (error) {
                    console.error('Error fetching branches:', error);
                }
            }
        };

        handleDefaultCompany(); // Call the function to set default company and fetch branches
    }, [companies]); // Run this effect when companies array changes


    useEffect(() => {
        if (branchid) {
            setErrors([]);
        }
    }, [branchid]);


    const handleChangeCompany = async (event) => {
        const selectedCompanyId = event.target.value;

        // console.log("selectedCompanyId " + event.target.value);
        setCompanyId(selectedCompanyId);

        if (selectedCompanyId) {
            try {
                const branchesResponse = await CFSService.getBranchesOfCompany2(selectedCompanyId, reactPageName);
                setBranches(branchesResponse.data);
            } catch (error) {
                console.error('Error fetching branches:', error);
            }
        } else {
            setBranches([]);
        }
    };


    const [errors, setErrors] = useState({});



    const handleChangeBranch = async (event) => {
        const selectedBranchId = event.target.value;

        // console.log("selected Branch " + event.target.value);
        setBranchId(selectedBranchId);
    };

    const handleChangeuserId = (event) => {

        const newErrors = {};

        if (!companyId) {
            newErrors['company'] = 'Please Select Company';
            setErrors(newErrors);
            return;
        }
        if (!branchid) {
            newErrors['branch'] = 'Please Select Branch';
            setErrors(newErrors);
            return;
        };

        setUserId(event.target.value);


        // console.log("USerId " + event.target.value);

        if (event.target.value.trim() !== '') {
            CFSService.getUserByUserId(companyId, branchid, event.target.value)
                .then((res) => {


                    if (res.data === null || res.data === '') {
                        setMobileNo('');
                    } else {
                        setMobileNo(res.data.mobile);
                    }
                })
                .catch((error) => {

                    console.error('Error fetching user data:', error);
                });
        } else {
            setMobileNo('');
        }

    };
    const HandleSendOtp = () => {
        const newErrors = {};
        if (!branchid) {
            newErrors['branch'] = 'Please Select Branch';
            setErrors(newErrors);
            return;
        };


        if (mobileNo !== null || mobileNo !== '')
            CFSService.sendOtpForgotPassword(companyId, branchid, userId, mobileNo)
                .then((res) => {
                    if (res.data === true) {
                        toast.success('Otp Sent Successfully', {
                            position: 'top-center',
                            autoClose: 800,
                        });
                        setEnterOtp(true);
                    } else {
                        toast.error('Error sending OTP. Please try again.', {
                            position: 'top-center',
                            autoClose: 800,
                        });
                    }
                })
                .catch((error) => {
                    // Handle errors from the API call
                    console.error('Error sending OTP:', error);
                    // Show an error toast message or perform error handling
                    toast.error('Error sending OTP. Please try again.', {
                        position: 'top-center',
                        autoClose: 800,
                    });
                });
    };


    const [otp, setOtp] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(false);




    const HandleSubmitOtp = async () => {
        try {
            const response = await CFSService.confirmOtp(companyId, branchid, userId, otp);
            if (response.data === true) {
                setConfirmPassword(true);
            }
            else {
                toast.error('Please Enter Correct OTP!', {
                    position: 'top-center',
                    autoClose: 800,
                });
            }
        } catch (error) {
            // Handle any errors from the API call
            console.error('Error confirming OTP:', error);
            // You might want to set confirmPassword to false in case of an error
            setConfirmPassword(false);
        }
    };


    return (

        <div>
            <section className="vh-90" style={sectionStyle}>
                <div style={backgroundStyle}></div>
                <Container style={contentStyle} className="py-4 h-100">
                    <Row className="d-flex justify-content-center align-items-center h-100">
                        <Col xl={10}>
                            <Card style={{ borderRadius: '25px' }}>
                                <Row className="form-background  g-0">
                                    <Col md={6} lg={5} className="d-none d-md-block">
                                        <img
                                            src={container}
                                            alt="login form"
                                            className="img-fluid"
                                            style={{ borderRadius: '20px 0 0 20px', maxHeight: '100%', maxWidth: '100%' }}
                                        />
                                    </Col>
                                    <Col md={6} lg={7} className="d-flex align-items-center">
                                        <Card.Body className="p-2 p-lg-5 text-black">
                                            <Form style={{ maxWidth: '400px', width: '100%' }}>
                                                <div className="d-flex align-items-center mb-2 pb-1">
                                                    <img src={rapport} style={{ width: '100%' }} alt="" />
                                                </div>
                                                {/* <h3 className="mb-2 text-center">Forgot Password</h3> */}
                                                <Form.Group className="mt-2" controlId="company">
                                                    <Form.Label className="inputHeader">Company Name</Form.Label>
                                                    <Form.Select
                                                        required
                                                        value={companies.length === 1 ? companies[0].company_Id : companyId}
                                                        onChange={handleChangeCompany}
                                                        className="dw"
                                                        style={{ height: '40px', borderColor: errors.company ? '#f52b2b' : '' }}
                                                        disabled={enterOtp}
                                                    >
                                                        {companies.map(company => (
                                                            <option key={company.company_Id} value={company.company_Id}>
                                                                {company.company_name}
                                                            </option>
                                                        ))}
                                                    </Form.Select>
                                                </Form.Group>

                                                <Form.Group className="mt-2">
                                                    <Form.Label className="inputHeader">Branch Name </Form.Label>
                                                    <Form.Select
                                                        required
                                                        value={branchid}
                                                        onChange={handleChangeBranch}
                                                        // className="dw"
                                                        style={{ height: '40px', borderColor: errors.branch ? '#f52b2b' : '' }}
                                                        disabled={enterOtp}
                                                    >
                                                        <option value="">Select a branch</option>
                                                        {branches.map(branch => (
                                                            <option key={branch.branchId} value={branch.branchId}>
                                                                {branch.branchName}
                                                            </option>
                                                        ))}

                                                    </Form.Select>

                                                    {errors.branch && (
                                                        <div className="error-message">
                                                            {errors.branch}
                                                        </div>
                                                    )}
                                                </Form.Group>

                                                <Form.Group className="mt-2" controlId="company">
                                                    <Form.Label className="inputHeader">Enter Your User Id</Form.Label>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        value={userId}
                                                        onChange={handleChangeuserId}                                               
                                                        placeholder="Enter you user Id "
                                                        readOnly={enterOtp}

                                                        id={enterOtp ? 'service' : ''}
                                                    />
                                                </Form.Group>


                                                {!confirmPassword && (
                                                    <Row noGutters>
                                                        <Col xs={8}>
                                                            <Form.Group className="mt-2" controlId="company">
                                                                <Form.Label className="inputHeader">Mobile No</Form.Label>
                                                                <Form.Control
                                                                    required
                                                                    type="text"
                                                                    value={mobileNo}
                                                                    onChange={(e) => setMobileNo(e.target.value)}                                                                                                                                     
                                                                    id={'service'}
                                                                    readOnly
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={4} className="d-flex justify-content-end">
                                                            <Button
                                                                type="button"
                                                                className="newButton buttonDown text-end"
                                                                variant="outline-primary"
                                                                onClick={HandleSendOtp}
                                                            ><FontAwesomeIcon icon={faRedoAlt} style={{ marginRight: '2px' }} />
                                                                OTP
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                )}



                                                {enterOtp && !confirmPassword && (
                                                    <Row noGutters>
                                                        <Col xs={8}> {/* Adjust the column size according to your layout */}
                                                            <Form.Group className="mt-2" controlId="company">
                                                                <Form.Label className="inputHeader">Enter Otp</Form.Label>
                                                                <Form.Control
                                                                    required
                                                                    type="text"
                                                                    value={otp}
                                                                    onChange={(e) => setOtp(e.target.value)}
                                                                    className="dw"
                                                                    style={{ height: '40px' }}
                                                                    placeholder="Enter Otp"
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={4} className="d-flex justify-content-end">
                                                            <Button
                                                               type="button"
                                                                className="newButton buttonDown text-end"
                                                                // style={{ marginTop: '2.2vw', marginLeft: '0.3vw' }}
                                                                variant="outline-primary"
                                                                onClick={HandleSubmitOtp}
                                                            ><FontAwesomeIcon icon={faKey} style={{ marginRight: '2px' }} />
                                                                Submit
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                )}

                                                {confirmPassword && (

                                                    <>{confirmPassword && !backToLogin && (
                                                        <Row noGutters>
                                                            <Col xs={7}>
                                                                <Form.Group className="mt-2" controlId="password">
                                                                    <Form.Label className="inputHeader">Enter Password</Form.Label>
                                                                    <Form.Control
                                                                        required
                                                                        type="password"
                                                                        value={password}
                                                                        onChange={handlePasswordChange}
                                                                        className="dw"
                                                                        style={{ height: '40px' }}
                                                                        placeholder="Enter Password"
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col xs={5}>
                                                                <Form.Group className="mt-2" controlId="confirmPassword">
                                                                    <Form.Label className="inputHeader">Confirm Password</Form.Label>
                                                                    <Form.Control
                                                                        required
                                                                        type="password"
                                                                        value={confirmPassword2}
                                                                        onChange={handleConfirmPasswordChange}
                                                                        className="dw"
                                                                        style={{ height: '40px', borderColor: !passwordsMatch ? 'red' : null }}
                                                                        placeholder="Confirm Password"
                                                                    />
                                                                    {!passwordsMatch && <Form.Text className="text-danger">Passwords do not match</Form.Text>}
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                    )}
                                                        <div className="text-center mt-3" >
                                                            {!backToLogin && (
                                                                <Button
                                                                    type="submit"
                                                                    fullWidth
                                                                    style={{ marginRight: '10px' }}
                                                                    variant="outline-primary"
                                                                    onClick={handleSubmitPassword}
                                                                >
                                                                    <span>Change Password</span>
                                                                    {/* <LockOpenIcon sx={{ paddingLeft: '5px' }} /> */}
                                                                </Button>

                                                            )}
                                                            {backToLogin && (
                                                                <Button
                                                                    type="submit"
                                                                    fullWidth
                                                                    style={{ marginRight: '10px' }}
                                                                    variant="outline-primary"
                                                                    onClick={handleBackToLogin}
                                                                ><FontAwesomeIcon icon={faBackward} style={{ marginRight: '2px' }} />
                                                                    <span>Back to Login</span>
                                                                    {/* <LockOpenIcon sx={{ paddingLeft: '5px' }} /> */}
                                                                </Button>

                                                            )}



                                                        </div>

                                                    </>

                                                )}




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


