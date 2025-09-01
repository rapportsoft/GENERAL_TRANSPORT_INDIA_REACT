
import AuthContext from '../Components/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useContext, useRef } from 'react';
import '../Components/Style.css';
import ipaddress from "../Components/IpAddress";
import { axisClasses } from '@mui/x-charts';
import { BarChart } from '@mui/x-charts';
import Select, { components } from 'react-select';
import { Pagination } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { LineChart, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';
import {
    Card,
    CardBody,
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    Modal,
    ModalHeader,
    ModalBody,
    Label,
    Input,
    Table,
} from "reactstrap";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge, faChartGantt, faBold, faBox, faArrowAltCircleLeft, faSearch, faRefresh, faUpload, faFileExcel, faSave, faCheck, faDownload, faTrash, faCalendarAlt, faAdd, faCancel, faXmark, faArrowDown, faPlus, faArrowUp, faEdit, faChevronUp, faChevronDown, faMagnifyingGlassChart } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/style.css';
import '../Components/Style.css';
import { Button } from "react-bootstrap";
import useAxios from '../Components/useAxios';
import { dark } from '@mui/material/styles/createPalette';
import { toast } from 'react-toastify';
import { CSSTransition } from 'react-transition-group';

export default function ContainerEirUpload() {
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext);
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

    // If the user is not authenticated, redirect to the login page
    useEffect(() => {
        if (!isAuthenticated) {

            navigate('/login?message=You need to be authenticated to access this page.');
        }
    }, [isAuthenticated, navigate]);

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
        userRights
    } = useContext(AuthContext);


    const location = useLocation();

    const [igmCnData, setIgmCnData] = useState({
        companyId : '',
        branchId : '',
        gateInId : '',
        erpDocRefNo : '',
        docRefNo : '',
        lineNo : '',
        sl : '',
        imagePath : '',
        backImage : '',
        inGateInDate : null
    })

    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFile1, setSelectedFile1] = useState(null);
    const [igmNo, setIgmNo] = useState('');
    const [containerNo, setContainerNo] = useState('');
    const fileInputRef = useRef(null);
    const fileInputRef1 = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0]; // Get the selected file

        // Convert 10 MB to bytes
        const maxSizeInBytes = 10 * 1024 * 1024;

        // Check if the file size exceeds the limit
        if (file.size > maxSizeInBytes) {
            toast.error('File size must be less than or equal to 10 MB.', {
                autoClose: 800
            });
            event.target.value = ''; // Clear the input
            return; // Exit the function
        }
        setSelectedFile(event.target.files[0]);
    };

    const handleFileChange1 = (event) => {
        const file = event.target.files[0]; // Get the selected file

        // Convert 10 MB to bytes
        const maxSizeInBytes = 10 * 1024 * 1024;

        // Check if the file size exceeds the limit
        if (file.size > maxSizeInBytes) {
            toast.error('File size must be less than or equal to 10 MB.', {
                autoClose: 800
            });
            event.target.value = ''; // Clear the input
            return; // Exit the function
        }
        setSelectedFile1(event.target.files[0]);
    };

    const handleClear = () => {
        setIgmCnData({
            companyId : '',
            branchId : '',
            gateInId : '',
            erpDocRefNo : '',
            docRefNo : '',
            lineNo : '',
            sl : '',
            imagePath : '',
            backImage : '',
            inGateInDate : null
        });
        setSelectedFile(null);
        setSelectedFile1(null);
        setIgmNo('');
        setContainerNo('');
        if (fileInputRef.current) {
            fileInputRef.current.value = null; // Safely reset the file input field
        }
        if (fileInputRef1.current) {
            fileInputRef1.current.value = null; // Safely reset the file input field
        }
    }

    const downloadFile = async (request, fileName) => {
        try {

            let formData = new FormData();
            formData.append("cid", companyid);
            formData.append("bid", branchId);
            formData.append("igmtrans", igmCnData.erpDocRefNo);
            formData.append("igm", igmCnData.docRefNo);
            formData.append("gateInId", igmCnData.gateInId);
            formData.append("request", request);

            const params = new URLSearchParams(formData);

            const response = await axios.get(`${ipaddress}excelUpload/downloadExistingEIRFile?${params}`, {
                responseType: 'blob', // Important for file download
            });

            // Get the file name from the response headers, or use the passed fileName
            const downloadedFileName = response.headers['content-disposition']
                ? response.headers['content-disposition'].split('filename=')[1].replace(/"/g, '')
                : fileName; // Fallback to passed fileName if not found

            const url = window.URL.createObjectURL(new Blob([response.data]));

            // Create a temporary anchor element to trigger the download
            const link = document.createElement('a');
            link.href = url;

            // Set the file name for download (you can change this to be dynamic based on the response)
            link.setAttribute('download', downloadedFileName);

            // Append the anchor to the document and trigger a click event
            document.body.appendChild(link);
            link.click();

            // Clean up by removing the anchor element from the document
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading the file:', error);
        }
    };

    const search = (igm, con) => {
        setLoading(true);
        axios.get(`${ipaddress}excelUpload/searchDataForContainerEir?cid=${companyid}&bid=${branchId}&igm=${igm}&con=${con}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {

                toast.success("Data found successfully!!", {
                    autoClose: 800
                })
                console.log('response.data ', response.data);

                setIgmCnData(response.data);
                setLoading(false);

            })
            .catch((error) => {
                setLoading(false);
                toast.error(error.response.data, {
                    autoClose: 800
                })
            })
    }

    const handleSave = () => {
        setLoading(true);

        if (selectedFile === null && selectedFile1 === null) {
            toast.error("Please select atleast one file!!", {
                autoClose: 800
            })

            setLoading(false);
            return;
        }

        let formData = new FormData();
        formData.append("cid", companyid);
        formData.append("bid", branchId);
        formData.append("user", userId);
        formData.append("igmtrans", igmCnData.erpDocRefNo);
        formData.append("igm", igmCnData.docRefNo);
        formData.append("gateInId", igmCnData.gateInId);
        if (selectedFile !== null) {
            formData.append("files", selectedFile);
        }

        if (selectedFile1 !== null) {
            formData.append("files1", selectedFile1);
        }


        axios.post(`${ipaddress}excelUpload/saveContainerEIRUpload`, formData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
                setIgmCnData(data);

                setSelectedFile(null);
                setSelectedFile1(null);
                if (fileInputRef.current) {
                    fileInputRef.current.value = null; // Safely reset the file input field
                }
                if (fileInputRef1.current) {
                    fileInputRef1.current.value = null; // Safely reset the file input field
                }

                toast.success("Data save successfully!!!", {
                    autoClose: 800
                })
                setLoading(false);
            })
            .catch((error) => {
                toast.error(error.response.data, {
                    autoClose: 800
                })
                setLoading(false);
            })
    }

    return (
        <div>
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

            <Row>
                <Col md={3}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            IGM No
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            id="igmNo"
                            name='igmNo'
                            value={igmNo}
                            onChange={(e) => setIgmNo(e.target.value)}
                        />



                    </FormGroup>
                </Col>

                <Col md={3}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Container No
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            id="containerNo"
                            name='containerNo'
                            value={containerNo}
                            onChange={(e) => setContainerNo(e.target.value)}
                        />



                    </FormGroup>
                </Col>
                <Col style={{ marginTop: 22 }}>
                    <button
                        className="btn btn-outline-primary btn-margin newButton"
                        style={{ marginRight: 10, fontSize: 12 }}
                        id="submitbtn2"
                        onClick={() => search(igmNo, containerNo)}

                    >
                        <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
                        Search
                    </button>
                </Col>
            </Row>
            {igmCnData.gateInId !== '' && (
                <>
                    <hr />
                    <Row>
                        <Col md={3}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Gate In No
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="gateInId"
                                    name='gateInId'
                                    value={igmCnData.gateInId}
                                    disabled
                                />



                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Gate In Date
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <DatePicker
                                        selected={igmCnData.inGateInDate}
                                        id='inGateInDate'
                                        name='inGateInDate'
                                        disabled
                                        dateFormat="dd/MM/yyyy HH:mm"
                                        className="form-control border-right-0 inputField"
                                        customInput={<input style={{ width: '100%', backgroundColor: '#E0E0E0' }} />}
                                        wrapperClassName="custom-react-datepicker-wrapper"
                                    />
                                    <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                                </div>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Shipping Line
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="sl"
                                    name='sl'
                                    value={igmCnData.sl}
                                    disabled
                                />



                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className='text-center'>
                        <Col>
                            <button
                                className="btn btn-outline-primary btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                onClick={handleSave}
                            >
                                <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
                                Save
                            </button>

                            <button
                                className="btn btn-outline-danger btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                onClick={handleClear}
                            >
                                <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
                                Clear
                            </button>
                        </Col>
                    </Row>
                    <div className="mt-4 table-responsive " style={{ fontSize: 14, overflowX: 'auto' }}>
                        <table className="table table-bordered table-hover tableHeader dynamic-table">
                            <thead className="tableHeader">
                                <tr>
                                    <th scope="col" className="text-center" style={{ color: 'black', width: 70 }}>Sr No</th>
                                    <th scope="col" className="text-center" style={{ color: 'black', width: 400 }}>Browse</th>
                                    <th scope="col" className="text-center" style={{ color: 'black' }}>File Name</th>
                                    <th scope="col" className="text-center" style={{ color: 'black', width: 200 }}>Download</th>


                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>
                                        <Input
                                            className="form-control"
                                            type="file"
                                            id="fileUpload"
                                            onChange={handleFileChange}
                                            innerRef={fileInputRef}
                                        />
                                    </td>
                                    <td>{igmCnData.imagePath !== '' ? igmCnData.imagePath.split('\\').pop().split('/').pop() : ''}</td>
                                    <td>
                                        <Button
                                            outline
                                            color="success"
                                            className="btn-margin newButton"
                                            style={{ marginRight: 10 }}
                                            id="submitbtn2"
                                            onClick={() => downloadFile("image", igmCnData.imagePath !== '' ? igmCnData.imagePath.split('\\').pop().split('/').pop() : '')}

                                        >
                                            <FontAwesomeIcon icon={faUpload} />
                                        </Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>
                                        <Input
                                            className="form-control"
                                            type="file"
                                            id="fileUpload"
                                            onChange={handleFileChange1}
                                            innerRef={fileInputRef1}
                                        />
                                    </td>
                                    <td>{igmCnData.backImage !== '' ? igmCnData.backImage.split('\\').pop().split('/').pop() : ''}</td>
                                    <td>
                                        <Button
                                            outline
                                            color="success"
                                            className="btn-margin newButton"
                                            style={{ marginRight: 10 }}
                                            id="submitbtn2"
                                            onClick={() => downloadFile("back", igmCnData.backImage !== '' ? igmCnData.backImage.split('\\').pop().split('/').pop() : '')}

                                        >
                                            <FontAwesomeIcon icon={faUpload} />
                                        </Button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </>
            )}
        </div>
    )
}
