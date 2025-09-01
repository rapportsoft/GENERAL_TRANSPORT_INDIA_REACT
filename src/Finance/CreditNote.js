import AuthContext from '../Components/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import useAxios from '../Components/useAxios';
import {
    Card,
    CardBody,
    CardTitle,
    Row,
    Col,
    Form,
    FormGroup,
    Modal,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Label,
    Input,
    Table,
} from "reactstrap";

import { Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faRefresh, faUpload, faSave, faCheck, faDownload, faTrash, faShip, faBackward, faCalendarAlt, faAdd, faSyncAlt, faTimesCircle, faPlusCircle, faReceipt, faSpinner, faPrint, faFileExcel, faEdit, faPlus, faUsersViewfinder, faArrowUpFromBracket, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import financeService from "../service/financeService";
import cfsService from "../service/CFSService";
import { Pagination } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Select, { components } from 'react-select';
import '../Components/Style.css';
import '../assets/css/style.css';
import '../Components/Style.css';
import ipaddress from '../Components/IpAddress';
import axios from "axios";
import printformat1 from '../Images/printformat1.png';
import printformat2 from '../Images/printformat2.png';


function CreditNote({ activeTab }) {
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

    useEffect(() => {
        if (!isAuthenticated) {

            navigate('/login?message=You need to be authenticated to access this page.');
        }
    }, [isAuthenticated, navigate]);

    const axiosInstance = useAxios();
    const FinanceService = new financeService(axiosInstance);
    const CFSService = new cfsService(axiosInstance);

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

    useEffect(() => {
        if (!isAuthenticated) {

            navigate('/login?message=You need to be authenticated to access this page.');
        }
    }, [isAuthenticated, navigate]);


    const initialCreditNoteHdr = {
        invoiceNo: '',
        finYear: '',
        branchId: branchId,
        companyId: companyid,
        finPeriod: '',
        partyId: '',
        accSrNo: null,
        profitcentreId: 'N00004',
        invoiceDate: new Date(),
        containerNo: '',
        woNo: '',
        woAmndNo: '',
        partyType: '',
        term: null,
        invoiceDueDate: null,
        invoiceType: '',
        invoiceSubType: '',
        transType: '',
        erpDocRefNo: '',
        docRefNo: '',
        docRefDate: null,
        beNo: '',
        foreignCurrency: '',
        foreignAmt: null,
        exRate: null,
        localAmtForeign: null,
        localAmt: null,
        billAmt: null,
        invoiceAmt: null,
        acCode: '',
        postFlag: '',
        postBy: '',
        postDate: null,
        comments: '',
        specialComments: '',
        invRefNo: '',
        irn: '',
        signQRCodePath: '',
        signQRCode: '',
        signInvoice: '',
        ackNo: '',
        ackDt: null,
        canDt: null,
        oldInvoiceAmt: 0,
        oldBillAmt: 0,
        igmTransId: '',
        profitcentreName: '',
        igmNo: '',
        igmDate: null,
        igmLineNo: '',
        viaNo: '',
        blNo: '',
        blDate: null,
        importerName: '',
        commodityDescription: '',
        noOfPackages: 0,
        sa: '',
        shipingAgentName: '',
        sl: '',
        shippingLineName: '',
        createdBy: '',
        approvedBy: '',
        insuranceValue: 0,
        dutyValue: 0,
        specialDelivery: '',
        onlineStampDuty: '',
        agroProductStatus: '',
        facilitationCharge: '',
        facilitationUnit: '',
        facilitationRate: '',
        expGst: '',
        discountAmt: 0,
        addMovFlag: '',
        addMovementAmt: 0,
        billingPartyName: '',
        taxApplicable: '',
        chaName: '',
        partySrNo: '',
        chaAddress: '',
        chaAddress2: '',
        assesmentId: '',
        invType: 'IMP',
        dpdTariff: '',
        discountStatus: '',
        sez: '',
        sbTransId: '',
        sbNo: '',
        sbDate: null,
        exporterName: '',
        billingParty2: '',
        accHolderName: '',
        fwdName: '',
        payingParty: '',
        othPartyId: '',
        oldBillAmt: 0,
        oldInvoiceNo: ''
    };

    const initialCreditNoteDtl = {
        companyId: companyid,
        branchId: branchId,
        finYear: '',
        invoiceNo: '',
        partyId: '',
        serviceId: '',
        taxId: '',
        finPeriod: '',
        taxIdN: '',
        invoiceDate: null,  // Date type
        profitcentreId: '',
        woNo: '',
        woAmndNo: '',
        erpDocRefNo: '',
        docRefNo: '',
        docRefDate: null,  // Date type
        foreignCurrency: '',
        foreignAmt: 0.000,
        exRate: 0.000,
        localAmtForeign: 0.000,
        localAmt: 0.000,
        taxPerc: 0.000,
        taxPercN: 0.000,
        billAmt: 0.000,
        invoiceAmt: 0.000,
        taxAmt: 0.000,
        contractor: '',
        acCode: '',
        acCodeN: '',
        comments: '',
        status: '',
        createdBy: '',
        createdDate: null,  // Date type
        editedBy: '',
        editedDate: null,  // Date type
        approvedBy: '',
        approvedDate: null,  // Date type
        oldInvoiceAmt: 0.000,
        oldTaxPerc: 0.000,
        oldTaxId: '',
        creditNoteAmt: 0,
        alreadySavedCreditAmt: 0,
        creditNoteGstAmt: 0.000,
        oldInvoiceNo: '',
        oldInvoiceAmt: 0,
        oldBillAmt: 0,
    };




    const [creditNoteHdr, setCreditNoteHdr] = useState(initialCreditNoteHdr);
    const [creditNoteDtl, setCreditNoteDl] = useState([initialCreditNoteDtl]);
    const [invoiceNoList, setInvoiceNoList] = useState([]);
    const [selectedInvoiceNo, setSeelctedInvoiceNo] = useState(null);
    const [errors, setErrors] = useState([]);
    const [creditNoteHistory, setCreditNoteHistory] = useState([]);


    const searchInvoiceNoForCreditNote = async (searchValue) => {
        if (!searchValue) {
            return;
        }
        try {
            const response = await FinanceService.searchInvoiceNoForCreditNote(companyid, branchId, 'N00004', searchValue, jwtToken);
            setInvoiceNoList(response.data);
        } catch {
            console.log('error in Search');
        }
    }

    const handleSelectInvoiceNo = async (selectedOption) => {
        setSeelctedInvoiceNo(selectedOption);
        await handleClear('select');
        if (selectedOption) {
            handleGetselectedInvoiceNoData(selectedOption.value);
        }
    }

    const handleGetselectedInvoiceNoData = async (invoiceNo) => {
        try {
            const response = await FinanceService.handleGetselectedInvoiceNoData(companyid, branchId, 'N00004', invoiceNo, jwtToken);

            const { crHeader, crDtl } = response.data;
            setCreditNoteHdr(crHeader);
            setCreditNoteDl(crDtl);
        } catch {
            toast.error('No Data Found', {
                position: 'top-center',
                autoClose: 1000,
            });
        }
    }

    const handleClear = async (type) => {
        setCreditNoteDl([initialCreditNoteDtl]);
        setCreditNoteHdr(initialCreditNoteHdr);
        if (type !== 'select') {
            setSeelctedInvoiceNo(null);
        }
        setInvoiceNoList([]);
    }



    const [isModalOpenForCreditNoteSearch, setIsModalOpenForCreditNoteSearch] = useState(false);
    const [searchCreditNotevalues, setSearchCreditNotevalues] = useState('');
    const [currentPageSearch, setCurrentPageSearch] = useState(1);
    const [creditNoteSearchData, setCreditNoteSearchData] = useState([]);
    const [validationErrors, setValidationErrors] = useState([]);



    const handleOpenCreditNoteSearch = async () => {
        setIsModalOpenForCreditNoteSearch(true);
        setSearchCreditNotevalues('');
        searchCreditNoteSearch();
    }

    const searchCreditNoteSearch = async (searchvalue) => {
        setCurrentPageSearch(1);
        setLoading(true);
        try {
            const response = await FinanceService.getCreditNoteToSelect(companyid, branchId, searchvalue, jwtToken);
            setCreditNoteSearchData(response.data);
        } catch (error) {
            console.error("Error fetching SB entries:", error);
        } finally {
            setLoading(false);
        }
    };



    const handleCloseCreditNoteSearch = () => {
        setIsModalOpenForCreditNoteSearch(false);
        setSearchCreditNotevalues('');
        setCreditNoteSearchData([]);
    }


    const clearCreditNoteSearch = () => {
        setIsModalOpenForCreditNoteSearch(false);
        setSearchCreditNotevalues('');
        setCreditNoteSearchData([]);
    }


    // PAGINATION FOR SELECT EXPORTER
    const [itemsPerPageSearch] = useState(5);

    const indexOfLastItemCartingSearch = currentPageSearch * itemsPerPageSearch;
    const indexOfFirstItemCartingSearch = indexOfLastItemCartingSearch - itemsPerPageSearch;
    const currentItemsCreditNoteSearch = creditNoteSearchData.slice(indexOfFirstItemCartingSearch, indexOfLastItemCartingSearch);
    const totalPagesCartingSearch = Math.ceil(creditNoteSearchData.length / itemsPerPageSearch);

    // Function to handle page change
    const handlePageChangeCreditNote = (page) => {
        if (page >= 1 && page <= totalPagesCartingSearch) {
            setCurrentPageSearch(page);
        }
    };


    const displayPagesCreditNoteSearch = () => {
        const centerPageCount = 5;
        const middlePage = Math.floor(centerPageCount / 2);
        let startPage = currentPageSearch - middlePage;
        let endPage = currentPageSearch + middlePage;

        if (startPage < 1) {
            startPage = 1;
            endPage = Math.min(totalPagesCartingSearch, centerPageCount);
        }

        if (endPage > totalPagesCartingSearch) {
            endPage = totalPagesCartingSearch;
            startPage = Math.max(1, totalPagesCartingSearch - centerPageCount + 1);
        }

        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };





    const getSelectedCreditNoteSearch = async (profitcentreId, creditNoteNo, invoiceNo) => {

        setLoading(true);
        try {
            const response = await FinanceService.getSelectedCreditNoteSearch(companyid, branchId, profitcentreId, creditNoteNo, invoiceNo, jwtToken);

            console.log('getSelectedCreditNoteSearch \n', response.data);
            const { crHeader, crDtl, cHistory } = response.data;

            setSeelctedInvoiceNo(crHeader.oldInvoiceNo ? { value: crHeader.oldInvoiceNo, label: crHeader.oldInvoiceNo } : null)

            setCreditNoteHdr(crHeader);
            setCreditNoteDl(crDtl);
            setCreditNoteHistory(cHistory);

        } catch {
            console.log('error in getSelectedCreditNoteSearch');
        } finally {
            setLoading(false);
        }
    }







    const selectCreditNoteSearchRadio = async (profitcentreId, creditNoteNo, invoiceNo) => {
        await getSelectedCreditNoteSearch(profitcentreId, creditNoteNo, invoiceNo);
        clearCreditNoteSearch();
    }



    const handleFieldChange = (e, fieldName) => {
        let { value } = e.target;

        // Update the exportSbCargoEntry object
        setCreditNoteHdr(prevEntry => ({
            ...prevEntry,
            [fieldName]: value,
        }));

        // Clear the validation error for the field, except for 'containerNo'
        setErrors(prevErrors => {
            // Otherwise, remove the error for the current field
            const updatedErrors = { ...prevErrors };
            if (updatedErrors[fieldName]) {
                delete updatedErrors[fieldName];
            }
            return updatedErrors;
        });
    };



    // const handleFieldChangeDetail = (e, index, fieldName, type, maxIntegerDigits, maxDecimalDigits, maxAmount) => {
    //     let { value } = e.target;

    //     if (type === 'decimal') {
    //         // Remove any non-numeric characters except "."
    //         value = value.replace(/[^0-9.]/g, '');

    //         let parts = value.split('.');

    //         // Prevent multiple decimal points
    //         if (parts.length > 2) {
    //             value = parts[0] + '.' + parts.slice(1).join('');
    //             parts = value.split('.'); // Re-split to update parts
    //         }

    //         // Ensure the integer part does not exceed maxIntegerDigits
    //         if (parts[0] && parts[0].length > maxIntegerDigits) {
    //             parts[0] = parts[0].slice(0, maxIntegerDigits);
    //         }

    //         // Ensure the decimal part does not exceed maxDecimalDigits
    //         if (parts[1]) {
    //             parts[1] = parts[1].slice(0, maxDecimalDigits);
    //         }

    //         // Ensure value does not become just "."
    //         if (parts.length === 2 && parts[0] === '') {
    //             parts[0] = '0';
    //         }

    //         value = parts.join('.');
    //     } else if (type === 'number') {
    //         // Remove any non-numeric characters
    //         value = value.replace(/[^0-9]/g, '');
    //     }

    //     // Convert value to number for comparison (ensure proper parsing)
    //     const numericValue = parseFloat(value) || 0;
    //     const numericMaxAmount = parseFloat(maxAmount) || 0;

    //     // Ensure 'localAmt' does not exceed 'maxAmount'
    //     if (fieldName === 'localAmt' && numericValue > numericMaxAmount) {
    //         value = numericMaxAmount.toString(); // Restrict to maxAmount
    //     }

    //     setCreditNoteDl(prevState => {
    //         const updatedTransDtl = [...prevState];
    //         updatedTransDtl[index] = {
    //             ...updatedTransDtl[index],
    //             [fieldName]: value
    //         };
    //         return updatedTransDtl;
    //     });

    //     setValidationErrors(prevErrors => {
    //         const updatedErrors = [...prevErrors];
    //         if (updatedErrors[index]) {
    //             delete updatedErrors[index][fieldName];
    //         }
    //         return updatedErrors;
    //     });
    // };



    const handleFieldChangeDetail = (e, index, fieldName, type, maxIntegerDigits, maxDecimalDigits, maxAmount, taxPerc, t1, t2, t3) => {
        let { value } = e.target;

        console.log('maxAmount \n', maxAmount, ' ', t1, ' ', t2, ' ', t3);


        if (type === 'decimal') {
            // Remove any non-numeric characters except "."
            value = value.replace(/[^0-9.]/g, '');

            let parts = value.split('.');

            // Prevent multiple decimal points
            if (parts.length > 2) {
                value = parts[0] + '.' + parts.slice(1).join('');
                parts = value.split('.'); // Re-split to update parts
            }

            // Ensure the integer part does not exceed maxIntegerDigits
            if (parts[0] && parts[0].length > maxIntegerDigits) {
                parts[0] = parts[0].slice(0, maxIntegerDigits);
            }

            // Ensure the decimal part does not exceed maxDecimalDigits
            if (parts[1]) {
                parts[1] = parts[1].slice(0, maxDecimalDigits);
            }

            // Ensure value does not become just "."
            if (parts.length === 2 && parts[0] === '') {
                parts[0] = '0';
            }

            value = parts.join('.');
        } else if (type === 'number') {
            // Remove any non-numeric characters
            value = value.replace(/[^0-9]/g, '');
        }

        // Convert value to number for comparison (ensure proper parsing)
        let numericValue = parseFloat(value) || 0;
        const numericMaxAmount = parseFloat(maxAmount) || 0;

        console.log('numericValue ', numericValue,);


        // Ensure 'localAmt' does not exceed 'maxAmount'
        if (fieldName === 'localAmt' && numericValue > numericMaxAmount) {
            numericValue = numericMaxAmount; // Restrict to maxAmount
            value = numericMaxAmount.toString();
        }

        // Calculate creditNoteGstAmt if fieldName is 'localAmt'
        let creditNoteGstAmt = 0;
        if (fieldName === 'localAmt' && taxPerc && taxPerc > 0) {
            const taxPercentage = parseFloat(taxPerc) / 100;
            creditNoteGstAmt = numericValue * taxPercentage;
            // Round to 2 decimal places
            creditNoteGstAmt = Math.round(creditNoteGstAmt * 100) / 100;
        }



        setCreditNoteDl(prevState => {
            const updatedTransDtl = [...prevState];
            updatedTransDtl[index] = {
                ...updatedTransDtl[index],
                [fieldName]: value,
                ...(fieldName === 'localAmt' && { creditNoteGstAmt })
            };
            return updatedTransDtl;
        });

        setValidationErrors(prevErrors => {
            const updatedErrors = [...prevErrors];
            if (updatedErrors[index]) {
                delete updatedErrors[index][fieldName];
            }
            return updatedErrors;
        });
    };


    console.log('creditNoteDtl : \n\n', creditNoteDtl);



    const handleSave = async (creditNoteHdr, creditNoteDtl) => {
        setLoading(true);
        if (!creditNoteHdr.oldInvoiceNo) {
            toast.error("Enter Invoice No", {
                autoClose: 800
            });
            setLoading(false);
            return;
        }


        let filteredData = creditNoteDtl.filter(record => parseFloat(record.localAmt) > 0);

        if (filteredData.length === 0) {
            toast.error("Please enter creditNote Amount", {
                autoClose: 800
            })
            setLoading(false);
            return;
        }

        try {
            const response = await FinanceService.saveCreditNote(companyid, branchId, userId, creditNoteHdr, filteredData, jwtToken);
            console.log('serr \n', response.data);


            const { crHeader, crDtl, cHistory } = response.data;
            setCreditNoteHdr(crHeader);
            setCreditNoteDl(crDtl);
            setCreditNoteHistory(cHistory);
            toast.success('CreditNote saved successfully', {
                autoClose: 1000
            });

        } catch (error) {
            toast.error('Oops something went wrong!. Please try again...', {
                autoClose: 1000,
                style: { width: '32vw' }
            });
        } finally {
            setLoading(false);
        }
    }


    const handleProcess = async (creditNoteHdr, creditNoteDtl) => {

        let filteredData = creditNoteDtl.filter(record => parseFloat(record.localAmt) > 0);

        if (filteredData.length === 0) {
            toast.error("Please enter creditNote Amount", {
                autoClose: 800
            })
            setLoading(false);
            return;
        }

        const formData = {
            creditNoteHdr: creditNoteHdr,
            CreditNoteDtl: filteredData
        }

        setLoading(true);
        try {
            const response = await FinanceService.processCreditNote(companyid, branchId, userId, formData, '', jwtToken);

            const { crHeader, crDtl, cHistory } = response.data;
            setCreditNoteHdr(crHeader);
            setCreditNoteDl(crDtl);
            setCreditNoteHistory(cHistory);

            toast.success('Credit Note processed successfully', {
                autoClose: 1000
            });
        }
        catch {
            toast.error('Oops something went wrong!. Please try again...', {
                autoClose: 1000,
                style: { width: '32vw' }
            });
        } finally {
            setLoading(false);
        }
    }




    const handlePrint1 = async (type) => {

        const invoiceNo = creditNoteHdr.invoiceNo;
        const profitCenterId = creditNoteHdr.profitcentreId;
        setLoading(true);
        axios.post(
            `${ipaddress}creditnotePrint/creditnotPrintpdf/${companyid}/${branchId}/${invoiceNo}/${profitCenterId}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            }
        ).then(response => {
            // console.log('Response:', response.data); // Handle success
            const pdfBase64 = response.data;
            setLoading(false);
            const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });
            const blobUrl = URL.createObjectURL(pdfBlob);
            window.open(blobUrl, '_blank');



        })
            .catch(error => {
                setLoading(false);
                console.error('Error in handlePrint:', error.message);
                //   Handle the error as needed, e.g., show an error toast or message
                // toast.error(`Error: ${error.message}`, {
                //       //     position: toast.POSITION.TOP_CENTER,
                //       //     autoClose: 2000,
                //       // });
                //     }
            });

    }


    const [showModalforPrintInvoice, setShowModalforPrintInvoice] = useState(false);
    const handleCloseModalPrintInvoice = () => {

        setShowModalforPrintInvoice(false);
    };
    const handleModelOPenForPrintInvoice = () => {
        setShowModalforPrintInvoice(true);

    }





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


                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: '2%', paddingRight: '2%' }}>
                    <h5 className="pageHead" >
                        <FontAwesomeIcon icon={faMoneyBill}
                            style={{
                                marginRight: '8px',
                                color: 'black',
                            }}
                        />Credit Note</h5>
                </div>

                <Card className='bgScreenStyle'>
                    <CardBody>

                        <Row>

                            <Col md={2}>
                                <Row>
                                    <Col md={9}>
                                        <FormGroup>
                                            <label
                                                className="forlabel bold-label"
                                                htmlFor="sbRequestId"
                                            >
                                                Credit Note No
                                            </label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                id="service"
                                                maxLength={15}
                                                name="assesmentId"
                                                readOnly
                                                value={creditNoteHdr.invoiceNo}
                                                disabled
                                            />
                                        </FormGroup>
                                    </Col>

                                    <Col md={3} className="d-flex justify-content-end" style={{ marginTop: 21 }}>
                                        <button
                                            className="btn btn-outline-primary btn-margin newButton"
                                            style={{ height: 31, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                            id="submitbtn2"
                                            onClick={handleOpenCreditNoteSearch}
                                        >
                                            <FontAwesomeIcon icon={faSearch} size="sm" />
                                        </button>

                                    </Col>
                                </Row>
                            </Col>



                            <Col md={2}>
                                <FormGroup>
                                    <label
                                        className="forlabel bold-label"
                                        htmlFor="sbRequestId"
                                    >
                                        Credit Note Date
                                    </label>
                                    <div style={{ position: "relative" }}>
                                        <DatePicker
                                            selected={creditNoteHdr.invoiceDate}
                                            name="rotationDate"
                                            dateFormat="dd/MM/yyyy HH:mm"
                                            timeInputLabel="Time:"
                                            showTimeInput
                                            timeFormat="HH:mm"
                                            timeIntervals={15}
                                            className={`form-control`}
                                            wrapperClassName="custom-react-datepicker-wrapper"
                                            id={'service'}
                                            disabled
                                        /><FontAwesomeIcon
                                            icon={faCalendarAlt}
                                            style={{
                                                position: "absolute",
                                                right: "10px",
                                                top: "50%",
                                                transform: "translateY(-50%)",
                                                pointerEvents: "none",
                                                color: "#6c757d",
                                            }}
                                        />
                                    </div>
                                </FormGroup>
                            </Col>







                            <Col md={2}>
                                <FormGroup>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="container" >
                                            Invoice No  <span className="error-message">*</span>
                                        </label>

                                        <Select
                                            options={invoiceNoList}
                                            value={selectedInvoiceNo}
                                            onInputChange={(inputValue, { action }) => {
                                                if (action === 'input-change') {
                                                    searchInvoiceNoForCreditNote(inputValue);
                                                }
                                            }}
                                            onChange={handleSelectInvoiceNo}
                                            isDisabled={creditNoteHdr.invoiceNo}
                                            isClearable
                                            styles={{
                                                control: (provided, state) => ({
                                                    ...provided,
                                                    height: 32,
                                                    minHeight: 32,
                                                    border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
                                                }),

                                                valueContainer: (provided) => ({
                                                    ...provided,
                                                    alignItems: 'center',
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
                                </FormGroup>
                            </Col>

                            <Col md={2}>
                                <FormGroup>
                                    <label
                                        className="forlabel bold-label"
                                        htmlFor="sbRequestId"
                                    >
                                        Invoice Date
                                    </label>
                                    <div style={{ position: "relative" }}>
                                        <DatePicker
                                            selected={creditNoteHdr.oldInvoiceDate}
                                            name="rotationDate"
                                            dateFormat="dd/MM/yyyy HH:mm"
                                            timeInputLabel="Time:"
                                            showTimeInput
                                            timeFormat="HH:mm"
                                            timeIntervals={15}
                                            className={`form-control`}
                                            wrapperClassName="custom-react-datepicker-wrapper"
                                            id={'service'}
                                            disabled
                                        /><FontAwesomeIcon
                                            icon={faCalendarAlt}
                                            style={{
                                                position: "absolute",
                                                right: "10px",
                                                top: "50%",
                                                transform: "translateY(-50%)",
                                                pointerEvents: "none",
                                                color: "#6c757d",
                                            }}
                                        />
                                    </div>
                                </FormGroup>
                            </Col>

                            <Col md={2}>
                                <FormGroup>
                                    <label
                                        className="forlabel bold-label"
                                        htmlFor="status"
                                    >
                                        Status
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="service"
                                        maxLength={15}
                                        disabled
                                        name="status"
                                        value={creditNoteHdr.status === 'A' ? 'Approved' : creditNoteHdr.status === 'N' ? 'New' : ''}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={2}>
                                <FormGroup>
                                    <label
                                        className="forlabel bold-label"
                                        htmlFor="sbRequestId"
                                    >
                                        Created By
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="service"
                                        disabled
                                        maxLength={15}
                                        name="viaNo"
                                        value={creditNoteHdr.createdBy}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>


                        <Row>



                            {creditNoteHdr.invType === 'IMP' && (
                                <>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label
                                                className="forlabel bold-label"
                                                htmlFor="status"
                                            >
                                                IGM Trans Id
                                            </label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                id="service"
                                                maxLength={15}
                                                disabled
                                                name="status"
                                                value={creditNoteHdr.igmTransId}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>
                                        <Row>


                                            <Col md={6}>
                                                <FormGroup>
                                                    <label
                                                        className="forlabel bold-label"
                                                        htmlFor="sbRequestId"
                                                    >
                                                        IGM No
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        id="service"
                                                        disabled
                                                        maxLength={15}
                                                        name="viaNo"
                                                        value={creditNoteHdr.igmNo}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <label
                                                        className="forlabel bold-label"
                                                        htmlFor="sbRequestId"
                                                    >
                                                        Line No
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        id="service"
                                                        disabled
                                                        maxLength={15}
                                                        name="viaNo"
                                                        value={creditNoteHdr.igmLineNo}
                                                    />
                                                </FormGroup>
                                            </Col>

                                        </Row>

                                    </Col>


                                    <Col md={2}>
                                        <FormGroup>
                                            <label
                                                className="forlabel bold-label"
                                                htmlFor="sbRequestId"
                                            >
                                                IGM Date
                                            </label>
                                            <div style={{ position: "relative" }}>
                                                <DatePicker
                                                    selected={creditNoteHdr.igmDate}
                                                    name="rotationDate"
                                                    dateFormat="dd/MM/yyyy HH:mm"
                                                    timeInputLabel="Time:"
                                                    showTimeInput
                                                    timeFormat="HH:mm"
                                                    timeIntervals={15}
                                                    className={`form-control`}
                                                    wrapperClassName="custom-react-datepicker-wrapper"
                                                    id={'service'}
                                                    disabled
                                                /><FontAwesomeIcon
                                                    icon={faCalendarAlt}
                                                    style={{
                                                        position: "absolute",
                                                        right: "10px",
                                                        top: "50%",
                                                        transform: "translateY(-50%)",
                                                        pointerEvents: "none",
                                                        color: "#6c757d",
                                                    }}
                                                />
                                            </div>
                                        </FormGroup>
                                    </Col>

                                </>
                            )}





                            {creditNoteHdr.invType === 'EXP' && (
                                <>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label
                                                className="forlabel bold-label"
                                                htmlFor="status"
                                            >
                                                Sb Trans Id
                                            </label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                id="service"
                                                maxLength={15}
                                                disabled
                                                name="status"
                                                value={creditNoteHdr.sbTransId}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>

                                        <FormGroup>
                                            <label
                                                className="forlabel bold-label"
                                                htmlFor="sbRequestId"
                                            >
                                                Sb No
                                            </label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                id="service"
                                                disabled
                                                maxLength={15}
                                                name="viaNo"
                                                value={creditNoteHdr.sbNo}
                                            />
                                        </FormGroup>
                                    </Col>





                                    <Col md={2}>
                                        <FormGroup>
                                            <label
                                                className="forlabel bold-label"
                                                htmlFor="sbRequestId"
                                            >
                                                Sb Date
                                            </label>
                                            <div style={{ position: "relative" }}>
                                                <DatePicker
                                                    selected={creditNoteHdr.sbDate}
                                                    name="rotationDate"
                                                    dateFormat="dd/MM/yyyy HH:mm"
                                                    timeInputLabel="Time:"
                                                    showTimeInput
                                                    timeFormat="HH:mm"
                                                    timeIntervals={15}
                                                    className={`form-control`}
                                                    wrapperClassName="custom-react-datepicker-wrapper"
                                                    id={'service'}
                                                    disabled
                                                /><FontAwesomeIcon
                                                    icon={faCalendarAlt}
                                                    style={{
                                                        position: "absolute",
                                                        right: "10px",
                                                        top: "50%",
                                                        transform: "translateY(-50%)",
                                                        pointerEvents: "none",
                                                        color: "#6c757d",
                                                    }}
                                                />
                                            </div>
                                        </FormGroup>
                                    </Col>

                                </>
                            )}



                            {creditNoteHdr.invType === 'BON' && (
                                <>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label
                                                className="forlabel bold-label"
                                                htmlFor="status"
                                            >
                                                NOC Trans Id
                                            </label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                id="service"
                                                maxLength={15}
                                                disabled
                                                name="status"
                                                value={creditNoteHdr.igmTransId}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>

                                        <FormGroup>
                                            <label
                                                className="forlabel bold-label"
                                                htmlFor="sbRequestId"
                                            >
                                                NOC No
                                            </label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                id="service"
                                                disabled
                                                maxLength={15}
                                                name="viaNo"
                                                value={creditNoteHdr.igmNo}
                                            />
                                        </FormGroup>
                                    </Col>





                                    <Col md={2}>
                                        <FormGroup>
                                            <label
                                                className="forlabel bold-label"
                                                htmlFor="sbRequestId"
                                            >
                                                NOC Date
                                            </label>
                                            <div style={{ position: "relative" }}>
                                                <DatePicker
                                                    selected={creditNoteHdr.igmDate}
                                                    name="rotationDate"
                                                    dateFormat="dd/MM/yyyy HH:mm"
                                                    timeInputLabel="Time:"
                                                    showTimeInput
                                                    timeFormat="HH:mm"
                                                    timeIntervals={15}
                                                    className={`form-control`}
                                                    wrapperClassName="custom-react-datepicker-wrapper"
                                                    id={'service'}
                                                    disabled
                                                /><FontAwesomeIcon
                                                    icon={faCalendarAlt}
                                                    style={{
                                                        position: "absolute",
                                                        right: "10px",
                                                        top: "50%",
                                                        transform: "translateY(-50%)",
                                                        pointerEvents: "none",
                                                        color: "#6c757d",
                                                    }}
                                                />
                                            </div>
                                        </FormGroup>
                                    </Col>

                                </>
                            )}







                            <Col md={2}>
                                <FormGroup>
                                    <label
                                        className="forlabel bold-label"
                                        htmlFor="sbRequestId"
                                    >
                                        BL No
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="service"
                                        disabled
                                        maxLength={15}
                                        name="viaNo"
                                        value={creditNoteHdr.blNo}
                                    />
                                </FormGroup>
                            </Col>


                            <Col md={2}>
                                <FormGroup>
                                    <label
                                        className="forlabel bold-label"
                                        htmlFor="sbRequestId"
                                    >
                                        BL Date
                                    </label>
                                    <div style={{ position: "relative" }}>
                                        <DatePicker
                                            selected={creditNoteHdr.blDate}
                                            name="rotationDate"
                                            dateFormat="dd/MM/yyyy HH:mm"
                                            timeInputLabel="Time:"
                                            showTimeInput
                                            timeFormat="HH:mm"
                                            timeIntervals={15}
                                            className={`form-control`}
                                            wrapperClassName="custom-react-datepicker-wrapper"
                                            id={'service'}
                                            disabled
                                        /><FontAwesomeIcon
                                            icon={faCalendarAlt}
                                            style={{
                                                position: "absolute",
                                                right: "10px",
                                                top: "50%",
                                                transform: "translateY(-50%)",
                                                pointerEvents: "none",
                                                color: "#6c757d",
                                            }}
                                        />
                                    </div>
                                </FormGroup>
                            </Col>


                            <Col md={2}>
                                <FormGroup>
                                    <label
                                        className="forlabel bold-label"
                                        htmlFor="status"
                                    >
                                        Profitcenter
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="service"
                                        maxLength={15}
                                        disabled
                                        name="status"
                                        value={creditNoteHdr.profitcentreName}
                                    />
                                </FormGroup>
                            </Col>

                        </Row>



                        <Row>

                            <Col md={2}>
                                <FormGroup>
                                    <label
                                        className="forlabel bold-label"
                                        htmlFor="status"
                                    >
                                        Billing Party
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="service"
                                        maxLength={15}
                                        disabled
                                        name="status"
                                        value={creditNoteHdr.billingPartyName}
                                    />
                                </FormGroup>
                            </Col>




                            <Col md={2}>
                                <FormGroup>
                                    <label
                                        className="forlabel bold-label"
                                        htmlFor="status"
                                    >
                                        Billing Party Add 1
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="service"
                                        maxLength={15}
                                        disabled
                                        name="status"
                                        value={creditNoteHdr.chaAddress}
                                    />
                                </FormGroup>
                            </Col>




                            <Col md={2}>
                                <FormGroup>
                                    <label
                                        className="forlabel bold-label"
                                        htmlFor="status"
                                    >
                                        Billing Party Add 2
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="service"
                                        maxLength={15}
                                        disabled
                                        name="status"
                                        value={creditNoteHdr.chaAddress2}
                                    />
                                </FormGroup>
                            </Col>



                            <Col md={2}>
                                <FormGroup>
                                    <label
                                        className="forlabel bold-label"
                                        htmlFor="sbRequestId"
                                    >
                                        Invoice
                                    </label>
                                    <Input
                                        type="select"
                                        name="invoice"
                                        className={`form-control`}
                                        value={creditNoteHdr.taxApplicable}
                                        style={{ flex: "1 1 0", minWidth: "0", marginRight: "5px" }}
                                        disabled
                                    >
                                        <option value="Y">With Tax</option>
                                        <option value="N">Without Tax</option>

                                    </Input>
                                </FormGroup>
                            </Col>


                            <Col md={2}>
                                <FormGroup>
                                    <label
                                        className="forlabel bold-label"
                                        htmlFor="status"
                                    >
                                        commodity
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="service"
                                        maxLength={15}
                                        disabled
                                        name="status"
                                        value={creditNoteHdr.commodityDescription}
                                    />
                                </FormGroup>
                            </Col>

                            <Col md={2}>
                                <FormGroup>
                                    <label
                                        className="forlabel bold-label"
                                        htmlFor="status"
                                    >
                                        No Of Pack
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="service"
                                        maxLength={15}
                                        disabled
                                        name="status"
                                        value={creditNoteHdr.noOfPackages}
                                    />
                                </FormGroup>
                            </Col>

                        </Row>






                        <Row>

                            <Col md={2}>
                                <FormGroup>
                                    <label
                                        className="forlabel bold-label"
                                        htmlFor="status"
                                    >
                                        Shipping Line
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="service"
                                        maxLength={15}
                                        disabled
                                        name="status"
                                        value={creditNoteHdr.shippingLineName}
                                    />
                                </FormGroup>
                            </Col>




                            <Col md={2}>
                                <FormGroup>
                                    <label
                                        className="forlabel bold-label"
                                        htmlFor="status"
                                    >
                                        Shipping Agent
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="service"
                                        maxLength={15}
                                        disabled
                                        name="status"
                                        value={creditNoteHdr.shipingAgentName}
                                    />
                                </FormGroup>
                            </Col>




                            <Col md={2}>
                                <FormGroup>
                                    <label
                                        className="forlabel bold-label"
                                        htmlFor="status"
                                    >
                                        Account Holder
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="service"
                                        maxLength={15}
                                        disabled
                                        name="status"
                                        value={creditNoteHdr.accHolderName}
                                    />
                                </FormGroup>
                            </Col>

                            <Col md={2}>
                                <FormGroup>
                                    <label
                                        className="forlabel bold-label"
                                        htmlFor="status"
                                    >
                                        Cha
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="service"
                                        maxLength={15}
                                        disabled
                                        name="status"
                                        value={creditNoteHdr.chaName}
                                    />
                                </FormGroup>
                            </Col>

                            <Col md={2}>
                                <FormGroup>
                                    <label
                                        className="forlabel bold-label"
                                        htmlFor="status"
                                    >
                                        Forwarder
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="service"
                                        maxLength={15}
                                        disabled
                                        name="status"
                                        value={creditNoteHdr.fwdName}
                                    />
                                </FormGroup>
                            </Col>

                            <Col md={2}>
                                <FormGroup>
                                    <label
                                        className="forlabel bold-label"
                                        htmlFor="status"
                                    >
                                        {creditNoteHdr.invType === 'EXP' ? 'Exporter Name' : 'Importer Name'}
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="service"
                                        maxLength={15}
                                        disabled
                                        name="status"
                                        value={creditNoteHdr.invType === 'EXP' ? creditNoteHdr.exporterName : creditNoteHdr.importerName}
                                    />
                                </FormGroup>
                            </Col>

                        </Row>



                        <Row>

                            <Col md={2}>
                                <FormGroup>
                                    <label className="forlabel bold-label" htmlFor="terminalInputs">
                                        Total Invoice Amount
                                    </label>
                                    <div className="d-flex flex-wrap">
                                        <input
                                            className="form-control me-1" // Slight margin added to the right for spacing
                                            style={{ flex: "1 1 0", minWidth: "0" }} // Ensure flexibility for both inputs
                                            type="text"
                                            id="service"
                                            disabled
                                            maxLength={15}
                                            name="containerSize"
                                            value={creditNoteHdr.oldBillAmt}
                                        />
                                        <input
                                            className="form-control"
                                            style={{ flex: "1 1 0", minWidth: "0" }}
                                            type="text"
                                            id="service"
                                            disabled
                                            maxLength={15}
                                            name="containerType"
                                            value={creditNoteHdr.oldInvoiceAmt}
                                        />
                                    </div>
                                </FormGroup>
                            </Col>












                            <Col md={2}>
                                <FormGroup>
                                    <label
                                        className="forlabel bold-label"
                                        htmlFor="status"
                                    >
                                        Credit Note Amount
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="service"
                                        maxLength={15}
                                        disabled
                                        name="status"
                                        value={creditNoteHdr.invoiceAmt}
                                    />
                                </FormGroup>
                            </Col>



                            <Col md={2}>
                                <FormGroup>
                                    <label
                                        className="forlabel bold-label"
                                        htmlFor="sbRequestId"
                                    >
                                        Remarks
                                    </label>
                                    <textarea
                                        className="form-control"
                                        name='comments'
                                        value={creditNoteHdr.comments}
                                        onChange={(e) => handleFieldChange(e, 'comments')}
                                        maxLength={250}
                                        rows={2}
                                        disabled={creditNoteHdr.invoiceNo?.startsWith("CJN")}
                                    ></textarea>
                                </FormGroup>
                            </Col>
                        </Row>


                        <Row className="text-center mt-1 mb-2 justify-content-center">
                            <Col xs="auto" className="d-flex justify-content-center align-items-center">
                                <button
                                    className="btn btn-outline-primary btn-margin newButton"
                                    style={{ marginRight: 10 }}
                                    id="submitbtn2"
                                    onClick={() => handleSave(creditNoteHdr, creditNoteDtl)}
                                    disabled={creditNoteHdr.invoiceNo?.startsWith("CJN") || loading}
                                >
                                    <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
                                    Save
                                </button>
                                <button
                                    className="btn btn-outline-success btn-margin newButton"
                                    style={{ marginRight: 10 }}
                                    id="submitbtn2"
                                    onClick={() => handleProcess(creditNoteHdr, creditNoteDtl)}
                                    disabled={!(creditNoteHdr.invoiceNo?.startsWith("CRR")) || loading}
                                >
                                    <FontAwesomeIcon icon={faSpinner} style={{ marginRight: "5px" }} />
                                    Process
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

                                <button
                                    className="btn btn-outline-primary btn-margin newButton"
                                    style={{ marginRight: 10 }}
                                    id="submitbtn2"
                                    onClick={() => handlePrint1("PRINT")}
                                    disabled={!creditNoteHdr.invoiceNo || !creditNoteHdr.invoiceNo.startsWith("CJN")}
                                >
                                    <FontAwesomeIcon icon={faPrint} style={{ marginRight: "5px" }} />
                                    Print
                                </button>

                            </Col>
                        </Row>






                        {creditNoteDtl && creditNoteDtl.length > 0 && creditNoteDtl.some(record => record.serviceId) && (

                            <div className='assessmentContainer mt-2'>
                                <>
                                    <div style={{ fontWeight: 800, fontSize: 20, marginTop: 10 }}>
                                        <span>Credit Note Details</span>
                                    </div>

                                    <div className="table-responsive mt-1" style={{ maxHeight: "400px", overflowY: "auto" }}>
                                        <Table className="table table-bordered" style={{ border: '2px solid black' }}>
                                            <thead>
                                                <tr>
                                                    <th scope="col" className="text-center" style={{ color: "black" }}>
                                                        Sr No
                                                    </th>
                                                    <th scope="col" className="text-center" style={{ color: "black", width: "100px" }}>
                                                        Service Id
                                                    </th>
                                                    <th scope="col" className="text-center" style={{ color: "black" }}>
                                                        Service
                                                    </th>
                                                    <th scope="col" className="text-center" style={{ color: "black" }}>
                                                        Tax Desc
                                                    </th>
                                                    <th scope="col" className="text-center" style={{ color: "black" }}>
                                                        Tax Perc
                                                    </th>
                                                    <th scope="col" className="text-center" style={{ color: "black" }}>
                                                        Invoice Amt
                                                    </th>
                                                    <th scope="col" className="text-center" style={{ color: "black" }}>
                                                        Credit Note Amt
                                                    </th>




                                                    {creditNoteHdr.invoiceNo && (
                                                        <>
                                                            <th scope="col" className="text-center" style={{ color: "black" }}>
                                                                GST Amt
                                                            </th>
                                                            <th scope="col" className="text-center" style={{ color: "black" }}>
                                                                Total Credit Note Amt
                                                            </th>
                                                            <th scope="col" className="text-center" style={{ color: "black" }}>
                                                                Status
                                                            </th>
                                                        </>)}
                                                </tr>


                                            </thead>
                                            <tbody className='text-center'>

                                                {creditNoteDtl.map((item, index) => (
                                                    <tr key={index}>

                                                        <td>{index + 1}</td>
                                                        <td>
                                                            {item.serviceId}
                                                        </td>
                                                        <td>
                                                            {item.serviceName}
                                                        </td>
                                                        <td>
                                                            {item.taxDesc}
                                                        </td>
                                                        <td>
                                                            {item.taxPercN}
                                                        </td>

                                                        <td>
                                                            {item.oldInvoiceAmt}
                                                        </td>

                                                        <td>
                                                            <FormGroup>
                                                                <Input
                                                                    type="text"
                                                                    value={item.localAmt}
                                                                    className={`inputwidthTuka form-control`}
                                                                    maxLength={20}
                                                                    onChange={(e) => handleFieldChangeDetail(e, index, 'localAmt', 'decimal', 16, 3, ((item.oldInvoiceAmt ?? 0) - (item.creditNoteAmt ?? 0)), item.taxPerc, (item.oldInvoiceAmt ?? 0), (item.creditNoteAmt ?? 0), (item.alreadySavedCreditAmt ?? 0))}
                                                                />
                                                            </FormGroup>
                                                        </td>

                                                        {creditNoteHdr.invoiceNo && (
                                                            <>
                                                                <td>{item.creditNoteGstAmt}</td>
                                                                <td>{(parseFloat((item.creditNoteGstAmt === '' || item.creditNoteGstAmt === null) ? 0 : item.creditNoteGstAmt) + parseFloat((item.localAmt === '' || item.localAmt === null) ? 0 : item.localAmt)).toFixed(2)}</td>
                                                                <td>{item.status === 'N' ? 'New' : (item.status === 'A' ? 'Approved' : '')}</td>
                                                            </>
                                                        )}

                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </div>
                                </>
                            </div>
                        )}


                        {creditNoteHistory && creditNoteHistory.length > 0 && (

                            <div className='assessmentContainer mt-2'>
                                <>
                                    <div style={{ fontWeight: 800, fontSize: 20, marginTop: 10 }}>
                                        <span>Credit Note History</span>
                                    </div>

                                    <div className="table-responsive mt-1" style={{ maxHeight: "400px", overflowY: "auto" }}>
                                        <Table className="table table-bordered" style={{ border: '2px solid black' }}>
                                            <thead>
                                                <tr>
                                                    <th scope="col" className="text-center" style={{ color: "black" }}>
                                                        Sr No
                                                    </th>
                                                    <th scope="col" className="text-center" style={{ color: "black", width: "100px" }}>
                                                        Invoice No
                                                    </th>
                                                    <th scope="col" className="text-center" style={{ color: "black" }}>
                                                        Invoice Amt
                                                    </th>
                                                    <th scope="col" className="text-center" style={{ color: "black" }}>
                                                        Credit Note No
                                                    </th>
                                                    <th scope="col" className="text-center" style={{ color: "black" }}>
                                                        Credit Note amt
                                                    </th>
                                                    <th scope="col" className="text-center" style={{ color: "black" }}>
                                                        Credit Note GST Amt
                                                    </th>
                                                    <th scope="col" className="text-center" style={{ color: "black" }}>
                                                        Total Credit Note Amt
                                                    </th>
                                                </tr>


                                            </thead>
                                            <tbody className='text-center'>

                                                {creditNoteHistory.map((item, index) => (
                                                    <tr key={index}>

                                                        <td>{index + 1}</td>
                                                        <td>
                                                            {item[0]}
                                                        </td>
                                                        <td>
                                                            {item[1]}
                                                        </td>
                                                        <td>
                                                            {item[2]}
                                                        </td>
                                                        <td>
                                                            {item[3]}
                                                        </td>

                                                        <td>
                                                            {item[4]}
                                                        </td>
                                                        <td>
                                                            {item[5]}
                                                        </td>

                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </div>
                                </>
                            </div>
                        )}





                    </CardBody>
                </Card>




                <Modal Modal isOpen={isModalOpenForCreditNoteSearch} onClose={handleCloseCreditNoteSearch} toggle={handleCloseCreditNoteSearch} style={{ maxWidth: '1100px', fontSize: 14, wioverflow: '-moz-hidden-unscrollable' }}>

                    <ModalHeader toggle={handleCloseCreditNoteSearch} style={{
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
                        /> Search Credit Notes</h5>

                    </ModalHeader>
                    <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <label className="forlabel bold-label" htmlFor="searchCreditNotevalues">
                                        Search by Credite Note No / Invoice No / Party Name
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="searchCreditNotevalues"
                                        maxLength={15}
                                        name='searchCreditNotevalues'
                                        value={searchCreditNotevalues}
                                        onChange={(e) => setSearchCreditNotevalues(e.target.value)}
                                    />

                                </FormGroup>
                            </Col>
                            <Col md={6} style={{ marginTop: 24 }}>
                                <button
                                    className="btn btn-outline-primary btn-margin newButton"
                                    style={{ marginRight: 10, fontWeight: 'bold', fontSize: 13 }}
                                    id="submitbtn2"
                                    onClick={() => searchCreditNoteSearch(searchCreditNotevalues)}
                                >
                                    <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
                                    Search
                                </button>
                                <button
                                    className="btn btn-outline-danger btn-margin newButton"
                                    style={{ marginRight: 10, fontWeight: 'bold', fontSize: 13 }}
                                    id="submitbtn2"
                                    onClick={clearCreditNoteSearch}
                                >
                                    <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
                                    Reset
                                </button>
                            </Col>
                        </Row>
                        <hr />
                        <div className="mt-1 table-responsive ">
                            <table className="table table-bordered table-hover tableHeader">
                                <thead className='tableHeader'>
                                    <tr className='text-center'>
                                        <th scope="col">#</th>
                                        <th scope="col">Credite Note No</th>
                                        <th scope="col">Credit Note Date</th>
                                        <th scope="col">IGM/SB/NOC/DO No</th>
                                        <th scope="col">Invoice No</th>
                                        <th scope="col">Invoice Date</th>
                                        <th scope="col">Party Name</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                    <tr className='text-center'>
                                        <th scope="col"></th>
                                        <th scope="col">{creditNoteSearchData.length}</th>
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
                                            <input type="radio" name="radioGroup" onChange={() => selectCreditNoteSearchRadio('', '', '', '')} value={''} />
                                        </td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    {currentItemsCreditNoteSearch.map((item, index) => (
                                        <>
                                            <tr key={index} className='text-center'>
                                                <td>
                                                    <input
                                                        type="radio"
                                                        name="radioGroup"
                                                        onClick={() => selectCreditNoteSearchRadio(item[7], item[0], item[3])}
                                                        value={item[0]}
                                                    />
                                                </td>

                                                <td>{item[0]}</td>
                                                <td>{item[1]}</td>
                                                <td>{item[2]}</td>
                                                <td>{item[3]}</td>
                                                <td>{item[4]}</td>
                                                <td>{item[5]}</td>
                                                <td>{item[6] === 'A' ? 'Approved' : item[5] === 'N' ? 'New' : ''}</td>

                                            </tr>
                                        </>
                                    ))}
                                </tbody>
                            </table>
                            <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
                                <Pagination.First onClick={() => handlePageChangeCreditNote(1)} />
                                <Pagination.Prev
                                    onClick={() => handlePageChangeCreditNote(currentPageSearch - 1)}
                                    disabled={currentPageSearch === 1}
                                />
                                <Pagination.Ellipsis />

                                {displayPagesCreditNoteSearch().map((pageNumber) => (
                                    <Pagination.Item
                                        key={pageNumber}
                                        active={pageNumber === currentPageSearch}
                                        onClick={() => handlePageChangeCreditNote(pageNumber)}
                                    >
                                        {pageNumber}
                                    </Pagination.Item>
                                ))}
                                <Pagination.Ellipsis />
                                <Pagination.Next
                                    onClick={() => handlePageChangeCreditNote(currentPageSearch + 1)}
                                    disabled={currentPageSearch === totalPagesCartingSearch}
                                />
                                <Pagination.Last onClick={() => handlePageChangeCreditNote(totalPagesCartingSearch)} />
                            </Pagination>
                        </div>
                    </ModalBody>
                </Modal>




                <Modal
                    isOpen={showModalforPrintInvoice}
                    toggle={handleCloseModalPrintInvoice}
                    style={{ maxWidth: 600 }}
                >
                    <ModalHeader
                        toggle={handleCloseModalPrintInvoice}
                        style={{
                            backgroundColor: "#80cbc4",
                            color: "black",
                            fontFamily: "Your-Heading-Font",
                            textAlign: "center",
                            background: "#26a69a",
                            boxShadow: "0px 5px 10px rgba(0, 77, 64, 0.3)",
                            border: "1px solid rgba(0, 0, 0, 0.3)",
                            borderRadius: "0",
                            backgroundColor: "#85144b",
                            backgroundColor: "rgba(0, 0, 0, 0.3)",
                            backgroundImage:
                                'url("https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            //backgroundPosition: 'center',
                            backgroundPosition: "center",
                        }}
                    >
                        <FontAwesomeIcon icon={faArrowUpFromBracket}
                            style={{ marginRight: "9px" }}
                        />
                        View Proforma
                    </ModalHeader>
                    <ModalBody
                        style={{
                            backgroundImage:
                                "url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)",
                            backgroundSize: "cover",
                        }}
                    >


                        <Form>

                            <Row>
                                <Col md={6}>
                                    <Card
                                        style={{
                                            width: '95%'
                                        }}
                                    >
                                        <img
                                            alt="Sample"
                                            style={{ width: '100%', height: '300px', objectFit: 'contain' }}
                                            src={printformat1}

                                        />
                                        <CardBody>
                                            <CardTitle tag="h5">
                                                Credit Note Format 1
                                            </CardTitle>
                                            {/* <CardSubtitle
                      className="mb-2 text-muted"
                      tag="h6"
                    >
                      Set Default
                      <Input type="radio" name="radio1" style={{ marginLeft: "10px" }} />

                    </CardSubtitle> */}

                                            <Button color="primary" outline
                                            // onClick={() => handlePrint("PRINT")}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faUsersViewfinder}
                                                    style={{ marginRight: "5px" }}
                                                />
                                                View
                                            </Button>

                                        </CardBody>
                                    </Card>
                                </Col>

                                <Col md={6}>
                                    <Card
                                        style={{
                                            width: '95%'
                                        }}
                                    >
                                        <img
                                            alt="Sample"
                                            style={{ width: '100%', height: '300px', objectFit: 'contain' }}
                                            src={printformat2}

                                        />
                                        <CardBody>
                                            <CardTitle tag="h5">
                                                Credit Note Format 2
                                            </CardTitle>
                                            {/* <CardSubtitle
                      className="mb-2 text-muted"
                      tag="h6"
                    >
                      Set Default
                      <Input type="radio" name="radio1" style={{ marginLeft: "10px" }} />
                    </CardSubtitle> */}

                                            <Button color="primary" outline
                                                onClick={() => handlePrint1("PRINT")}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faUsersViewfinder}
                                                    style={{ marginRight: "5px" }}
                                                />
                                                View
                                            </Button>
                                        </CardBody>
                                    </Card>
                                </Col>
                                {/* <Col md={4}>
                <Card
                  style={{
                    width: '95%'
                  }}
                >
                  <img
                    alt="Sample"
                    src="https://raw.githubusercontent.com/ShubhamDeshmukh18/AshteLogistics/main/assets/img/testimonials/Receipt01.jpg"
                  />
                  <CardBody>
                    <CardTitle tag="h5">
                      Receipt Format 1
                    </CardTitle>
                    <CardSubtitle
                      className="mb-2 text-muted"
                      tag="h6"
                    >
                      Default Format
                    
                    </CardSubtitle>

                    <Button color="primary" outline>
                      <FontAwesomeIcon
                        icon={faUsersViewfinder}
                        style={{ marginRight: "5px" }}
                      />
                      View
                    </Button>
                  </CardBody>
                </Card>
              </Col> */}
                            </Row>


                        </Form>
                    </ModalBody>
                    <ModalFooter
                        style={{
                            backgroundImage:
                                "url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)",
                            backgroundSize: "cover",
                            display: "flex",
                            justifyContent: "center",

                        }}
                    >

                        <div className="d-flex justify-content-center">
                            <Button color="danger" outline onClick={handleCloseModalPrintInvoice}>
                                <FontAwesomeIcon
                                    icon={faBackward}
                                    style={{ marginRight: "5px" }}
                                />
                                Back
                            </Button>

                        </div>
                    </ModalFooter>
                </Modal>







            </div>
        </>
    )
}
export default CreditNote
