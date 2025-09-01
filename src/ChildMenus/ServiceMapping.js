import React, { useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ipaddress from "../Components/IpAddress";
import { faAdd, faArrowLeft, faArrowLeftRotate, faAtom, faCalendarCheck, faCalendarDay, faCalendarDays, faCalendarPlus, faCertificate, faCircleArrowLeft, faGroupArrowsRotate, faHandshake, faJar, faPlus, faRefresh, faSearch, faUniversity, faUserCircle, faUsersViewfinder, faAnchor, faCogs } from '@fortawesome/free-solid-svg-icons';
import { faEdit, faRectangleXmark } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheck, faSave, faTimes, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import { Pagination } from "react-bootstrap";
import Swal from 'sweetalert2';
import Select from 'react-select';
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
    Container,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from "reactstrap";
import { toast } from "react-toastify";
import AuthContext from "../Components/AuthProvider";
import DatePicker from "react-datepicker";
import { red } from "@mui/material/colors";
import { Spinner } from "reactstrap";

export default function ServiceMapping() {
    const navigate = useNavigate();
    const {
        jwtToken,
        userId,
        username,
        branchId,
        companyid,
        isAuthenticated,
        role,
        login,
        logout,
    } = useContext(AuthContext);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate(
                "/login?message=You need to be authenticated to access this page."
            );
        }
    }, [isAuthenticated, navigate]);

    const [profitCenter, setProfitCenter] = useState([]);

    const [mappingDetails, setMappingDetails] = useState({
        invoiceType: '',
        containerSize: '',
        gateOutType: '',
        typeOfConatiner: '',
        profitCenterDesc: ''
    })

    const [addNewService, setAddNewService] = useState({

        profitcentreId: "",
        invoiceType: "",
        serviceId: "",
        containerSize: "",
        containerType: "",
        typeOfContainer: "",
        gateOutType: "",
        scannerType: "",
        serviceShortDesc: "",
        specialDelivery: "",
        storageType: "",
        equipment: "",
        sealType: "",
        examType: "",
        status: "A",
        examination: "",
        blApplicableFlag: "",
        secondaryItem: ""

    });


    const [formErrors, setFormErrors] = useState({
        profitCenterDesc: "",
        invoiceType: "",
        gateOutType: ""

    });


    const handlemappingChange = (event) => {


        const { name, value } = event.target;

        setMappingDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,

        }))

        console.log('mapping details', mappingDetails.invoiceType);

        setFormErrors((preError) => ({
            ...preError,
            [name]: ""

        }))
    }

    const [item, setItem] = useState([])

    const handleSearchChange = (event) => {
        const { name, value } = event.target;

    };

    const handleClear = () => {

        setMappingDetails({
            invoiceType: '',
            containerSize: '',
            gateOutType: '',
            typeOfConatiner: '',
            profitCenterDesc: ''
        }

        )

        setFormErrors({
            profitCenterDesc: "",
            invoiceType: "",
            gateOutType: ""

        })

        setResponseData([]);
        setIsSearchExecuted(false);


    }

    const getprofitCenterId = (profitCenterDesc) => {
        var result = '';
        profitCenter.map(item => {
            if (item.label === profitCenterDesc) {
                result = item.value;
            }
        })

        return result;

        // profitCenter.map(inde)

    }

    const [isSearchExecuted, setIsSearchExecuted] = useState(false);

    const [responseData, setResponseData] = useState([]);

    const handleSearch = () => {
        setFormErrors("")
        const errors = {};

        if (!mappingDetails.profitCenterDesc) {
            errors.profitCenterDesc =
                "Profit Center DESC  is required"

        }
        if (!mappingDetails.gateOutType) {
            errors.gateOutType =
                "Gate Out Type is required"

        }
        if (!mappingDetails.invoiceType) {
            errors.invoiceType = "Invoice Type is required"

        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            setResponseData([]);
            return;
        }

        console.log("final mapping details after the search ", mappingDetails);


        const profitcenterId = getprofitCenterId(mappingDetails.profitCenterDesc)
        console.log("profit center id ", profitcenterId);


        try {
            const response = axios.get(`${ipaddress}servicemapping/mappingdata`, {
                params: {
                    companyId: companyid,
                    branchId: branchId,
                    profitcenterId: profitcenterId,
                    invoiceType: mappingDetails.invoiceType,
                    containerSize: mappingDetails.containerSize,
                    gateOutType: mappingDetails.gateOutType,
                    typeOfConatiner: mappingDetails.typeOfConatiner

                },
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            }).then((response) => {



                setResponseData(response.data);
                console.log('response data', responseData)
                setIsSearchExecuted(true);


            });


        } catch (error) {
            console.error("Error fetching data:", error);
            // You can handle the error more gracefully here, e.g., by displaying an error message to the user
        }




    }


    const getProfitCenter = () => {
        axios.get(`${ipaddress}api/profitcentres/getAllProfitCenters?companyId=${companyid}&branchId=${branchId}`, {
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
                console.log(data);
                const profitCenterOptions = data.map(profitctr => ({
                    value: profitctr.profitcentreId,
                    label: profitctr.profitcentreDesc

                }))

                console.log(profitCenterOptions);

                setProfitCenter(profitCenterOptions);
                console.log('setting of profit center ', profitCenter);

            })
            .catch((error) => {

            })

    }
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(20);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = responseData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(responseData.length / itemsPerPage);


    //  Function to handle page change
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


    const [isModalOpenForAddress, setIsModalOpenForAddress] = useState(false);

    const closeModalOpenForAddress = () => {
        setIsModalOpenForAddress(false);
        setAddNewService({

            // serviceId: "",
            // scannerType: "",
            // serviceShortDesc: "",
            // storageType: "",
            // sealType: "",
            // examType: "",
            profitcentreId: "",
            invoiceType: "",
            serviceId: "",
            containerSize: "",
            containerType: "",
            typeOfContainer: "",
            gateOutType: "",
            scannerType: "",
            serviceShortDesc: "",
            specialDelivery: "",
            storageType: "",
            equipment: "",
            sealType: "",
            examType: "",
            status: "",
            examination: "",
            blApplicableFlag: "",
            secondaryItem: ""
        });
        setServiceId("");
        setServiceShortDesc("");


    };

    const handleOpenServiceModal = () => {

        if (!mappingDetails.profitCenterDesc && !mappingDetails.invoiceType) {
            toast.error("Please fill in the required fields.", {
                autoClose: 1000

            })
            return;
        }
        setIsModalOpenForAddress(true);
    };

    const handleAddnewServiceChange = (event) => {
        const { name, value } = event.target;

        setAddNewService((prevDetails) => ({
            ...prevDetails,
            [name]: value,

        }))

        console.log(addNewService);


    };

    const handlAddNewServiceClear = () => {
        console.log('inside the clear')
        setAddNewService({

            // serviceId: "",
            // scannerType: "",
            // serviceShortDesc: "",
            // storageType: "",
            // sealType: "",
            // examType: "",
            profitcentreId: "",
            invoiceType: "",
            serviceId: "",
            containerSize: "",
            containerType: "",
            typeOfContainer: "",
            gateOutType: "",
            scannerType: "",
            serviceShortDesc: "",
            specialDelivery: "",
            storageType: "",
            equipment: "",
            sealType: "",
            examType: "",
            status: "",
            examination: "",
            blApplicableFlag: "",
            secondaryItem: ""
        });

        setServiceId("");
        setServiceShortDesc("");



    }

    const [serviceData, setServiceData] = useState([]);
    const [serviceId, setServiceId] = useState('');
    const [serviceShortDesc, setServiceShortDesc] = useState('');


    const handleserviceDescChange = async (selectedOption, { action }) => {

        setServiceShortDesc(selectedOption ? selectedOption.label : '');
        setServiceId(selectedOption ? selectedOption.value : '');
    };

    const getServiceData = (val) => {
        if (val === '') {
            setServiceData([]);
            return;
        }

        axios.get(`${ipaddress}service/getServiceDataforMapping?cid=${companyid}&bid=${branchId}&val=${val}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
                const serviceOptions = data.map(service => ({
                    value: service[0],
                    label: service[1]
                }))
                setServiceData(serviceOptions);
            })
            .catch((error) => {

            })
    }


    const saveServiceData = () => {

        if (!serviceId) {
            toast.error("Please fill in the required fields.", {
                autoClose: 1000
            })
            return;
        }

        addNewService.serviceId = serviceId;
        addNewService.serviceShortDesc = serviceShortDesc;
        addNewService.invoiceType = mappingDetails.invoiceType;
        addNewService.gateOutType = mappingDetails.gateOutType;
        addNewService.containerSize = mappingDetails.containerSize;
        addNewService.typeOfContainer = mappingDetails.typeOfConatiner;
        addNewService.status = "A";

        const profitcenterId1 = getprofitCenterId(mappingDetails.profitCenterDesc);
        addNewService.profitcentreId = profitcenterId1;




        console.log('At time of saving final data is :', addNewService)


        axios.post(`${ipaddress}servicemapping/saveServiceData?cid=${companyid}&bid=${branchId}`, addNewService, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {

                toast.success("Data save successfully!!", {
                    autoClose: 800
                })
                const data = response.data;
                console.log('data from backend', data);

                handleSearch();

                closeModalOpenForAddress();
            })
            .catch((error) => {

                toast.error(error.response.data, {
                    autoClose: 1000
                })
            })





    }

    const [deleteService, setDeleteService] = useState({

        profitcentreId: "",
        invoiceType: "",
        serviceId: "",
        containerSize: "",
        containerType: "",
        typeOfContainer: "",
        gateOutType: "",
        scannerType: "",
        serviceShortDesc: "",
        specialDelivery: "",
        storageType: "",
        equipment: "",
        sealType: "",
        examType: "",
        status: "A",
        examination: "",
        blApplicableFlag: "",
        secondaryItem: ""

    });

    const handledelete = (serviceid, scannertype, containertype) => {

        deleteService.invoiceType = mappingDetails.invoiceType;
        deleteService.gateOutType = mappingDetails.gateOutType;
        deleteService.containerSize = mappingDetails.containerSize;
        deleteService.typeOfContainer = mappingDetails.typeOfConatiner;
        deleteService.containerType = containertype
        deleteService.scannerType = scannertype;
        deleteService.serviceId = serviceid;



        const profitcenterId1 = getprofitCenterId(mappingDetails.profitCenterDesc);
        deleteService.profitcentreId = profitcenterId1;

        console.log('data for delete', deleteService);

        Swal.fire({
            title: 'Are you sure?',
            html: 'Are you sure you want to delete the record?',
            icon: 'warning',
            showCancelButton: true,
            customClass: {
                icon: 'icon-smaller' // Apply the custom class to the icon
            },
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, close it!'
        }).then((result) => {
            console.log("Confirmation result:", result.isConfirmed);
            if (result.isConfirmed) {
                axios.post(`${ipaddress}servicemapping/deleteServiceData?cid=${companyid}&bid=${branchId}`, deleteService, {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`
                    }
                }).then((response) => {

                    if (response.data === 'success') {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Data deleted successfully!!!",
                            icon: "success"
                        });
                    }

                    handleSearch();

                })
                    .catch((error) => {

                        toast.error("Failed to delete the row", {
                            autoClose: 1000
                        })
                    })

            }
        });


    }


    useEffect(() => {
        getProfitCenter()
    }, [])




    return (
        <>

            <div className="container">
                <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-50px' }} > <FontAwesomeIcon
                    icon={faCogs}
                    style={{
                        marginRight: '8px',
                        color: 'black', // Set the color to golden
                    }}
                />Service Mapping</h5>
                <Card style={{ backgroundColor: "#F8F8F8" }}>
                    <CardBody>

                        <Row>

                            <Col md={4}>
                                <FormGroup>
                                    <Label className="partyFontSize">Profit Center Desc <span style={{ color: 'red' }}>*</span></Label>
                                    <Input
                                        type="select"
                                        name="profitCenterDesc"
                                        id='profitCenterDesc'
                                        className="form-control"
                                        disabled={isSearchExecuted}
                                        style={{ borderColor: formErrors.profitCenterDesc ? 'red' : '' }}
                                        value={mappingDetails.profitCenterDesc}
                                        onChange={handlemappingChange}
                                    >
                                        <option value="" disabled ></option>
                                        {profitCenter.map((center) => (
                                            <option key={center.value} value={center.label}>
                                                {center.label}
                                            </option>))}

                                    </Input>
                                    <div style={{ color: "red" }} className="error-message">
                                        {formErrors.profitCenterDesc}
                                    </div>

                                </FormGroup>
                            </Col>

                            <Col md={4}>
                                <FormGroup>
                                    <Label className="partyFontSize">Invoice Type <span style={{ color: 'red' }}>*</span></Label>
                                    <Input
                                        type="select"
                                        name="invoiceType"
                                        id='invoiceType'
                                        className="form-control"
                                        disabled={isSearchExecuted}
                                        style={{ borderColor: formErrors.invoiceType ? 'red' : '' }}
                                        value={mappingDetails.invoiceType}
                                        onChange={handlemappingChange}
                                    >
                                        <option id="" value=""> </option>
                                        <option value="EXBOND">Ex Bond</option>

                                        <option value="EXP">Export Container</option>

                                        <option value="AGRO">AGRICULTURE</option><option value="EXPBK">Export Back to town</option>

                                        <option value="EXPCNB">Export Cont Back to town</option>

                                        <option value="EXPCRG">Export Cargo(SB wise)</option>

                                        <option value="EXPCRGS">Export Cargo Storage(SB wise)</option>

                                        <option value="EXPCRT">Export Carting(SB wise)</option>

                                        <option value="FDSGI">BUFFER FDS</option>

                                        <option value="IMP">Import Container</option>

                                        <option value="IMPAUC">Import Auction</option>

                                        <option value="IMPCRG">Import cargo</option>

                                        <option value="IMPSEN">Import Container Second</option>

                                        <option value="INBOND">In Bond</option>

                                        <option value="NOC">No Objection Certification</option>

                                        <option value="ONWH">OnWheel</option>

                                        <option value="PORT">Port Return</option>
                                        <option value="INBONDPER">In Bond Periodic</option>
                                        <option value="GENREC">General Receiving</option>
                                        <option value="GENDEL">General Delivery</option>
                                        <option value="GENRECPER">General Receiving Periodic</option>
                                        <option value="GENCONREC">General Containerwise Receiving</option>
                                        <option value="GENCONDEL">General Containerwise Delivey</option>
                                        <option value="GENCONRECPER">General Containerwise Receiving Periodic</option>

                                    </Input>

                                    <div style={{ color: "red" }} className="error-message">
                                        {formErrors.invoiceType}
                                    </div>
                                </FormGroup>
                            </Col>

                            <Col md={4}>
                                <FormGroup>
                                    <Label className="partyFontSize">Container Size</Label>
                                    <Input
                                        type="select"
                                        name="containerSize"
                                        id='containerSize'
                                        className="form-control"
                                        disabled={isSearchExecuted}
                                        value={mappingDetails.containerSize}
                                        onChange={handlemappingChange}
                                    >

                                        <option id="" value=""> </option>
                                        <option value="20">20	</option>
                                        <option value="22">22	</option>
                                        <option value="40">40	</option>
                                        <option value="45">45	</option>
                                        <option value="NA">Not Approved	</option>



                                    </Input>

                                </FormGroup>
                            </Col>

                        </Row>

                        <Row>
                            <Col md={4}>
                                <FormGroup>
                                    <Label className="partyFontSize">Gate Out Type<span style={{ color: 'red' }}>*</span></Label>
                                    <Input
                                        type="select"
                                        name="gateOutType"
                                        id='gateOutType'
                                        className="form-control inputField"
                                        disabled={isSearchExecuted}
                                        style={{ borderColor: formErrors.gateOutType ? 'red' : '' }}
                                        value={mappingDetails.gateOutType}
                                        onChange={handlemappingChange}
                                    >

                                        <option id="" value=""> </option>
                                        <option value="CON">CON	</option>
                                        <option value="CRG">CRG	</option>


                                    </Input>
                                    <div style={{ color: "red" }} className="error-message">
                                        {formErrors.gateOutType}
                                    </div>
                                </FormGroup>
                            </Col>

                            <Col md={4}>
                                <FormGroup>
                                    <Label className="partyFontSize">Type Of Container</Label>
                                    <Input
                                        type="select"
                                        name="typeOfConatiner"
                                        id='typeOfConatiner'
                                        className="form-control"
                                        value={mappingDetails.typeOfConatiner}
                                        onChange={handlemappingChange}
                                        disabled={isSearchExecuted}
                                    >

                                        <option id="" value=""> </option>
                                        <option value="FlatTrack">FlatTrack	</option>
                                        <option value="General">General	</option>
                                        <option value="Hazardous">Hazardous	</option>
                                        <option value="ODC">ODC	</option>
                                        <option value="OpenTop">OpenTop	</option>
                                        <option value="Reefer">Reefer	</option>
                                        <option value="ReeferHaz">ReeferHaz	</option>



                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>


                        <Row className="text-center" style={{ marginTop: 25 }}>
                            <Col>
                                <button
                                    className="btn btn-outline-primary btn-margin newButton"
                                    style={{ marginRight: 10 }}
                                    id="submitbtn2"
                                    onClick={handleSearch}
                                >
                                    <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
                                    Search
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

                                <button
                                    className="btn btn-outline-success btn-margin newButton"
                                    style={{ marginRight: 10 }}
                                    id="submitbtn2"
                                    onClick={handleOpenServiceModal}
                                    disabled={!isSearchExecuted}
                                >
                                    <FontAwesomeIcon icon={faPlus} style={{ marginRight: "5px" }} />
                                    Add Service
                                </button>

                            </Col>
                        </Row>
                        <hr />

                        <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font' }}>Service Details</h5>

                        <div className="table-responsive mt-3" style={{ fontSize: 14 }}>

                            <Table className="table table-bordered table-hover" style={{ border: '2px solid black' }}>
                                <thead className="tableHeader" >
                                    <tr style={{ fontWeight: 'bold', border: '2px solid black', fontSize: '15px' }}>
                                        <th scope="col" className="text-center" style={{ color: 'black', height: '30px' }}>Sr No</th>
                                        <th scope="col" className="text-center" style={{ color: 'black' }}>Service Id</th>
                                        <th scope="col" className="text-center" style={{ color: 'black' }}>Service Short Desc</th>
                                        <th scope="col" className="text-center" style={{ color: 'black' }}>ODC/LOW BED</th>
                                        <th scope="col" className="text-center" style={{ color: 'black' }}>Exam Type</th>
                                        <th scope="col" className="text-center" style={{ color: 'black' }}>Scanner Type</th>
                                        <th scope="col" className="text-center" style={{ color: 'black' }}>Storage Type</th>
                                        <th scope="col" className="text-center" style={{ color: 'black' }}>Status</th>
                                        <th scope="col" className="text-center" style={{ color: 'black' }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>


                                    {currentItems.map((item, index) => (


                                        // <tr key={index}>
                                        //     <td className="text-center">{((currentPage - 1) * itemsPerPage) + index + 1}</td>
                                        //     <td className="text-center">{item.serviceId}</td>
                                        //     <td className="text-center">{item.serviceShortDesc}</td>
                                        //     <td className="text-center">{item.sealType
                                        //     }</td>
                                        //     <td className="text-center">{item.examType}</td>
                                        //     <td className="text-center">{item.scannerType || "-"}</td>
                                        //     <td className="text-center">{item.storageType || "-"}</td>
                                        //     <td className="text-center">{item.status}</td>
                                        //     <td className="text-center">{"--"}</td>
                                        // </tr>

                                        <tr key={index}>
                                            <td className="text-center">{((currentPage - 1) * itemsPerPage) + index + 1}</td>
                                            <td className="text-center">{item.serviceId}</td>
                                            <td className="text-center">{item.serviceShortDesc}</td>
                                            <td className="text-center">
                                                <Input
                                                    type="select"
                                                    id="sealType"
                                                    name="sealType"
                                                    value={item.sealType}
                                                    className="form-control"
                                                    disabled
                                                // onChange={handleSearchChange}                                                      
                                                >

                                                    <option id="" value=""> </option>
                                                    <option value="LOWBED">LOWBED	</option>
                                                    <option value="ODC">ODC	</option>


                                                </Input>



                                            </td>
                                            <td className="text-center">

                                                <Input
                                                    type="select"
                                                    id="examType"
                                                    name="examType"
                                                    value={item.examType}
                                                    className="form-control inputField"
                                                    style={{
                                                        fontSize: '12px',
                                                        padding: '1px',
                                                        appearance: 'none',
                                                    }}
                                                    disabled

                                                // onChange={handleSearchChange}                                                      
                                                >

                                                    <option id="" value="" style={{ fontSize: '12px' }}> </option>
                                                    <option value="100" style={{ fontSize: '12px' }}>ABOVE 25</option>
                                                    <option value="25" style={{ fontSize: '12px' }}>UP TO 25</option>


                                                </Input>


                                            </td>
                                            <td className="text-center">
                                                <Input
                                                    type="select"
                                                    id="examType"
                                                    name="examType"
                                                    value={item.scannerType}
                                                    className="form-control"
                                                    disabled
                                                // onChange={handleSearchChange}                                                      
                                                >

                                                    <option id="" value=""> </option>
                                                    <option value="DTS">DTS</option>
                                                    <option value="EXAM">Examination</option>
                                                    <option value="Mobile">Mobile</option>
                                                    <option value="Relocatable">RELOC</option>


                                                </Input>

                                            </td>
                                            <td className="text-center" >
                                                <Input
                                                    type="select"
                                                    id="examType"
                                                    name="examType"
                                                    value={item.storageType}
                                                    className="form-control"
                                                    disabled
                                                // onChange={handleSearchChange}                                                      
                                                >

                                                    <option id="" value=""> </option>
                                                    <option value="CON">CONTAINER</option>
                                                    <option value="CRG">CARGO</option>
                                                    <option value="MTY">EMPTY</option>



                                                </Input>
                                            </td>
                                            <td className="text-center">{item.status}</td>
                                            <td className="text-center">

                                                <button
                                                    className="btn btn-outline-danger btn-margin newButton"
                                                    style={{ marginRight: 3 }}
                                                    id="removebtn"
                                                    onClick={() => { handledelete(item.serviceId, item.scannerType, item.containerType) }}
                                                >
                                                    <FontAwesomeIcon icon={faTrash} />

                                                </button>
                                            </td>
                                        </tr>



                                    ))}


                                </tbody>
                            </Table>
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
                        <Modal Modal isOpen={isModalOpenForAddress} onClose={closeModalOpenForAddress} toggle={closeModalOpenForAddress} style={{ maxWidth: '900px', wioverflow: '-moz-hidden-unscrollable' }}>

                            <ModalHeader toggle={closeModalOpenForAddress} style={{
                                backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font', textAlign: 'center', background: '#26a69a',
                                boxShadow: '0px 5px 10px rgba(0, 77, 64, 0.3)',
                                border: '1px solid rgba(0, 0, 0, 0.3)',
                                borderRadius: '0',
                                backgroundImage: 'radial-gradient( circle farthest-corner at 48.4% 47.5%,  rgba(122,183,255,1) 0%, rgba(21,83,161,1) 90% )',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                //backgroundPosition: 'center',
                                backgroundPosition: 'center',
                            }} >

                                <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', color: 'white' }} > <FontAwesomeIcon
                                    icon={faAdd}
                                    style={{
                                        marginRight: '8px',
                                        color: 'white', // Set the color to golden
                                    }}
                                /> Add Service</h5>

                            </ModalHeader>
                            <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                                <Row>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label className="partyFontSize">Service Id <span style={{ color: 'red' }}>*</span></Label>
                                            <Input
                                                type="text"
                                                name="serviceIdselect"
                                                id='serviceIdselect'
                                                className="form-control"
                                                disabled
                                                value={serviceId}

                                            >

                                            </Input>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label className="partyFontSize">Service Short Desc <span style={{ color: 'red' }}>*</span></Label>
                                            {/* <Input
                                                type="text"
                                                name="serviceshortdesc"
                                                id='serviceshortdesc'
                                                className="form-control inputField"
                                                maxLength={100}
                                                value={addNewService.serviceShortDesc}
                                                onChange={handleAddnewServiceChange}
                                                // value={""}
                                                // onChange={""}
                                            /> */}
                                            <Select
                                                value={{ value: serviceId, label: serviceShortDesc }}
                                                onChange={handleserviceDescChange}
                                                onInputChange={getServiceData}
                                                options={serviceData}
                                                placeholder="select service short desc"
                                                isClearable
                                                id="serviceShortDesc"
                                                name="serviceShortDesc"
                                                className='autocompleteHeight'
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

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label className="partyFontSize">ODC/LOW BED</Label>
                                            <Input
                                                type="select"
                                                name="sealType"
                                                id='sealType'
                                                className="form-control"
                                                value={addNewService.sealType}
                                                onChange={handleAddnewServiceChange}
                                            >
                                                <option id="" value=""> </option>
                                                <option value="LOWBED">LOWBED	</option>
                                                <option value="ODC">ODC	</option>

                                            </Input>
                                        </FormGroup>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label className="partyFontSize">Exam Type</Label>
                                            <Input
                                                type="select"
                                                name="examType"
                                                id='examType'
                                                className="form-control"
                                                value={addNewService.examType}
                                                onChange={handleAddnewServiceChange}
                                            >
                                                <option id="" value="" style={{ fontSize: '12px' }}> </option>
                                                <option value="100" style={{ fontSize: '12px' }}>ABOVE 25</option>
                                                <option value="25" style={{ fontSize: '12px' }}>UP TO 25</option>

                                            </Input>

                                        </FormGroup>
                                    </Col>


                                    <Col md={4}>
                                        <FormGroup>
                                            <Label className="partyFontSize">Scanner Type</Label>
                                            <Input
                                                type="select"
                                                name="scannerType"
                                                id='scannerType'
                                                className="form-control"
                                                value={addNewService.scannerType}
                                                onChange={handleAddnewServiceChange}
                                            >
                                                <option id="" value=""> </option>
                                                <option value="DTS">DTS</option>
                                                <option value="EXAM">Examination</option>
                                                <option value="Mobile">Mobile</option>
                                                <option value="Relocatable">RELOC</option>

                                            </Input>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>

                                        <FormGroup>
                                            <Label className="partyFontSize">Storage Type</Label>
                                            <Input
                                                type="select"
                                                name="storageType"
                                                id='storageType'
                                                className="form-control"
                                                value={addNewService.storageType}
                                                onChange={handleAddnewServiceChange}
                                            >
                                                <option id="" value=""> </option>
                                                <option value="CON">CONTAINER</option>
                                                <option value="CRG">CARGO</option>
                                                <option value="MTY">EMPTY</option>

                                            </Input>
                                        </FormGroup>

                                    </Col>

                                </Row>

                                <hr />
                                <Row>
                                    <Col className='text-center'>
                                        <button
                                            className="btn btn-outline-primary btn-margin newButton"
                                            style={{ marginRight: 10 }}
                                            id="submitbtn2"
                                            onClick={saveServiceData}
                                        >
                                            <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
                                            Save
                                        </button>

                                        <button
                                            className="btn btn-outline-danger btn-margin newButton"
                                            style={{ marginRight: 10 }}
                                            id="submitbtn2"
                                            onClick={handlAddNewServiceClear}
                                        >
                                            <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
                                            Clear
                                        </button>

                                    </Col>
                                </Row>
                            </ModalBody>
                        </Modal>



                    </CardBody>
                </Card>
            </div>
        </>
    )
}
