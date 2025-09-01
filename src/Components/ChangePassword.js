import AuthContext from "../Components/AuthProvider";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext, useCallback, useRef, useId } from "react";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import "../Components/Style.css";
import ipaddress from "../Components/IpAddress";
import Dropdown from 'react-bootstrap/Dropdown';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import DatePicker from "react-datepicker";
import Swal from 'sweetalert2';
import contachimage from "../services/contacts.png"
import DGDCimage from "../Images/DGDC.png";
import InviceService from "../services/InviceService"
import ReactLoading from 'react-loading';
import { FaClosedCaptioning, FaTruck, FaHandPaper, FaPersonBooth, FaTruckLoading } from 'react-icons/fa';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft, faArrowCircleRight, faArrowTurnRight, faAtom, faBolt, faCity, faCross, faExternalLink, faExternalLinkAlt, faGavel, faGear, faHand, faHandFist, faHandHoldingHand, faHandsHolding, faHistory, faIdBadge, faIdCardAlt, faIdCardClip, faPenClip, faPenFancy, faPencil, faPerson, faPersonBooth, faPlaneDeparture, faPlus, faSearch, faSquarePen, faTentArrowTurnLeft, faTruckArrowRight, faUpload, faUserCircle, faWeightHanging, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheck, faSave, faTimes, faSyncAlt, faCancel, faCog, faPrint, faXmark, faFileLines, faChessKing } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { toast } from "react-toastify";
import "../Components/Style.css";
import { Pagination } from "react-bootstrap";
import jsPDF from "jspdf";
import { Line, PDFDownloadLink } from "@react-pdf/renderer";
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFViewer,
    Image,
} from "@react-pdf/renderer";

import { BlobProvider } from "@react-pdf/renderer";
import { data } from "jquery";
import { tr } from "date-fns/locale";

export default function ChangePassword() {
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
    } = useContext(AuthContext);

    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext);

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [formErrors, setFormErrors] = useState({
        old: "",
        new: "",
        confirm: "",
    });

    const handleLogout = () => {
        logout();
        navigate('/login?message2=You have successfully logged out.');
      };

      const [isValid, setIsValid] = useState(false);

      const handleSubmit = (oldP, newP, confirmP) => {
        // Reset form errors and remove error classes from input fields
        setFormErrors({
            old: "",
            new: "",
            confirm: "",
        });
        document.getElementById('old').classList.remove('error-border');
        document.getElementById('new').classList.remove('error-border');
        document.getElementById('confirm').classList.remove('error-border');
    
        const errors = {};
    
        // Validate old password
        if (!oldP) {
            errors.old = "Old Password is required.";
            document.getElementById('old').classList.add('error-border');
        }
    
        // Validate new password
        if (!newP) {
            errors.new = "New Password is required.";
            document.getElementById('new').classList.add('error-border');
        } else {
            const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
            if (!regex.test(newP)) {
                errors.new = "Password must be 8-15 characters long and contain at least one capital letter, one number, and one special character.";
                document.getElementById('new').classList.add('error-border');
            }
        }
    
        // Validate confirm password
        if (!confirmP) {
            errors.confirm = "Confirm Password is required.";
            document.getElementById('confirm').classList.add('error-border');
        }
    
        // If there are any errors, set them and return
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }
    
        // Make API call to change password
        axios.get(`http://${ipaddress}user/changePassword?cid=${companyid}&bid=${branchId}&user=${userId}&old=${oldP}&new=${newP}&confirm=${confirmP}`)
            .then((response) => {
                if (response.data === 'user not found') {
                    toast.error("User not found", { autoClose: 700 });
                } else if (response.data === 'wrong old password') {
                    toast.error("Incorrect old password", { autoClose: 700 });
                } else if (response.data === 'wrong confirm password') {
                    toast.error("New and confirm password not matched", { autoClose: 700 });
                } 
                else if (response.data === 'do not enter same old password') {
                    toast.error("Do not use the same old password.", { autoClose: 700 });
                   
                }
                else if (response.data === 'success') {
                    toast.success("Password changed successfully.", { autoClose: 700 });
                    handleLogout();
                }
            })
            .catch((error) => {
                // Handle API call errors
                console.error("Error changing password:", error);
                toast.error("An error occurred. Please try again later.", { autoClose: 700 });
            });
    }
    

    const handleClear = () => {
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');

        setFormErrors(
            {
                old: "",
                new: "",
                confirm: "",

            }

        )

        document.getElementById('old').classList.remove('error-border');
        document.getElementById('new').classList.remove('error-border');
        document.getElementById('confirm').classList.remove('error-border');
    }

    return (
        <div >
            <div>
                <Row style={{ marginTop: 30 }}>
                    <Col md={4}>
                        <FormGroup>
                            <label className="forlabel" htmlFor="search">
                                Current Password <span style={{ color: 'red' }}>*</span>
                            </label>
                            <input
                                type="password"
                                id="old"
                                className="form-control"
                                name="serNo"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                            <div style={{ color: 'red' }} className="error-message">{formErrors.old}</div>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <FormGroup>
                            <label className="forlabel" htmlFor="search">
                                New Password <span style={{ color: 'red' }}>*</span>
                            </label>
                            <input
                                type="password"
                                id="new"
                                className="form-control"
                                name="serNo"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <div style={{ color: 'red' }} className="error-message">{formErrors.new}</div>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <FormGroup>
                            <label className="forlabel" htmlFor="search">
                                Confirm Password <span style={{ color: 'red' }}>*</span>
                            </label>
                            <input
                                type="password"
                                id="confirm"
                                className="form-control"
                                name="serNo"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <div style={{ color: 'red' }} className="error-message">{formErrors.confirm}</div>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Button
                            variant="outline-success"
                            style={{ marginTop: "10px" }}
                            onClick={() => handleSubmit(oldPassword, newPassword, confirmPassword)}
                        >
                            <FontAwesomeIcon
                                icon={faSave}
                                style={{ marginRight: "5px" }}
                            />

                            Submit
                        </Button>
                        <Button
                            variant="outline-danger"
                            style={{ marginLeft: "10px", marginTop: "10px" }}
                            onClick={handleClear}
                        >
                            <FontAwesomeIcon
                                icon={faSearch}
                                style={{ marginRight: "5px" }}
                            />

                            Clear
                        </Button>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
