

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
import { faSearch, faRefresh, faUpload, faSave, faCheck, faDownload, faTrash, faShip, faBackward, faCalendarAlt, faAdd, faSyncAlt, faTimesCircle, faPlusCircle, faReceipt, faSpinner, faPrint, faFileExcel, faEdit, faPlus, faUsersViewfinder, faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
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


function ExportProforma({ activeTab }) {
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





    const initialAssessmentSheet = {
        assesmentId: '',
        companyId: companyid,
        branchId: branchId,
        assesmentLineNo: '',
        transType: 'Export Container',
        assesmentDate: new Date(),
        igmTransId: '',
        sbTransId: '',
        impSrNo: 1,
        profitcentreId: '',
        igmNo: '',
        sbNo: '',
        sbDate: '',
        igmDate: '',
        igmLineNo: '',
        viaNo: '',
        blNo: '',
        blDate: '',
        billingParty: '',
        igst: '',
        cgst: '',
        sgst: '',
        importerId: '',
        importerName: '',
        exporterName: '',
        commodityDescription: '',
        commodityCode: '',
        examDate: '',
        areaUsed: 0,
        noOfPackages: 0,
        cartedPackages: 0,
        containerNo: '',
        containerSize: '',
        containerType: '',
        gateInDate: '',
        stuffTallyDate: '',
        movReqDate: '',
        minCartingTransDate: '',
        movementReqId: '',
        gateOutDate: '',
        grossWeight: 0,
        sbWeight: 0,
        gateOutType: '',
        auctionStatus: 'N',
        countAucNoticeChrg: '0',
        specialDelivery: 'NA',
        agroProductStatus: 'N',
        chaSrNo: 1,
        cha: '',
        sa: '',
        sl: '',
        accSrNo: 1,
        onAccountOf: '',
        partyId: '',
        partySrNo: 0,
        typeOfContainer: '',
        typeOfCargo: '',
        scanerType: '',
        examinedPercentage: 0,
        sealCuttingType: '',
        weighmentFlag: 'N',
        labour: 'N',
        fk3MT: 'N',
        fk5MT: 'N',
        fk10MT: 'N',
        hydra12MT: 'N',
        crane: 'N',
        kalmar: 'N',
        pusher: 'N',
        emptyUse: 'N',
        clamp: 'N',
        carpenter: 'N',
        onlineStampDuty: 'N',
        cargoWeight: 0,
        destuffDate: '',
        calculateInvoice: '',
        gatepassAllowed: 'N',
        insuranceValue: 0,
        dutyValue: 0,
        invoiceDate: null,
        invoiceCalDate: null,
        invoiceUptoDate: null,
        nocValidityDate: null,
        nocFromDate: '',
        nocWeeks: 0,
        movementCharges: 'N',
        dpdTariff: 'D',
        taxApplicable: 'Y',
        sez: 'N',
        status: '',
        addMovFlag: 'N',
        addMovementAmt: 0,
        discountStatus: 'N',
        discountAmt: 0,
        discountPercentage: 0,
        discountDays: '0',
        freeDays: '0',
        createdBy: '',
        createdDate: null,
        editedBy: '',
        editedDate: null,
        approvedBy: '',
        approvedDate: null,
        multyInvoiceFlag: 'S',
        invoiceSrNo: 1,
        blockMoveAllow: 'N',
        lockDown: 'N',
        invoiceNo: '',
        finalInvoiceDate: '',
        containerHandlingAmt: 0,
        containerStorageAmt: 0,
        creditType: 'N',
        invoiceCategory: 'SINGLE',
        billAmt: 0,
        invoiceAmt: 0,
        irn: '',
        fileNo: '',
        refInvoiceNo: '',
        receiptNo: '',
        receiptDate: null,
        tdsDeductee: '',
        tdsDeducteeId: '',
        tds: '',
        comments: '',
        intComments: '',
        drt: 'N',
        chaRebate20: 0,
        chaRebate40: 0,
        crgAllowFlag: 'N',
        othPartyId: '',
        othSrNo: '',
        equipment: '',
        ssrTransId: '',
        ssrServiceId: '',
        invType: '',
        lastAssesmentId: '',
        lastAssesmentDate: null,
        lastInvoiceNo: '',
        lastInvoiceDate: null,
        lastInvoiceUptoDate: null,
        noOf20ft: '',
        noOf40ft: '',
        exBondingId: '',
        inBondingId: '',
        payingParty: '',
        transactionType: 'SB',
        stuffTallyWoTransId: '',
        isBos: 'N',
        newCommodity: '',
        invoiceDaysOld: 0,
        invoiceAmtOld: 0,
        oldInvoiceUpto: '',
        forceEntryFlag: 'N',
        minGateInTransDate: null,
        noOfItem: 0,
        otherDeduction: 0,
        stuffMode: '',
        formThirteenEntryDate: null,
        invCatH: 'N',
        invCatG: 'N',
        isAncillary: 'N',
        rebateCalFlag: 'N',
        customerLedgerFlag: 'N',
        srcCollectedFlag: 'N',
        impAddress: '',
        impGst: '',
        chaName: '',
        chaAddress: '',
        chaGst: '',
        chaStateCode: '',
        fwdGst: '',
        fwdName: '',
        fwdState: '',
        accHolderGst: '',
        accHolderName: '',
        accHolderState: '',
        creditAllowed: 0,
        profitcentreName: '',
        expStateCode: '',
        chaStateCode: '',
        exporterName: '',
        expAddress: '',
        expGst: '',
        expStateCode: '',
        pendingCredit: 0,
        advanceAmount: 0,
        pendingCredit: 0
    };

    const [assessmentSheet, setAssessmentSheet] = useState(initialAssessmentSheet);
    const [errors, setErrors] = useState([]);
    const [commodity, setCommodity] = useState([]);
    const [sbOrContainerData, setSbOrContainerData] = useState([]);
    const [selectedSbOrContainer, setSelectedSbOrContainer] = useState(null);
    const [assessmentData, setAssessmentData] = useState([]);

    console.log('cfAssessmentSheet : \n', assessmentSheet);

    useEffect(() => {
        const fetchJarList = async () => {
            if (activeTab === 'P01108') {
                try {
                    const data = await getJarListByJarId('J00006');
                    if (data) {
                        setCommodity(data);
                    } else {
                        setCommodity([]);
                    }
                } catch (error) {
                    console.error('Error in fetching jar list:', error);
                    setCommodity([]);
                }
            }
        };
        fetchJarList();
    }, [activeTab]);

    const getJarListByJarId = async (jarId) => {
        try {
            const response = await CFSService.getJarDetailSelect(companyid, jarId, jwtToken);
            return response.data;
        } catch (error) {
            console.error('Error in jar Search:', error);
            return null;
        }
    };

    const searchSBNoOrContainerNo = async (searchValue) => {
        if (!searchValue) {
            return;
        }
        try {
            const response = await FinanceService.searchSBNoOrContainerNo(companyid, branchId, searchValue, mainSearch.operation, mainSearch.profitcentreId, selectedInvoiceType, jwtToken);
            setSbOrContainerData(response.data);
        } catch {
            console.log('error in Search');
        }
    }






    const [checkInvDate, setCheckInvDate] = useState('N');
    const [checkInvDate1, setCheckInvDate1] = useState('N');
    const [invDate, setInvDate] = useState(null);
    const [sbCargoData, setSbCargoData] = useState([]);



    const handleCurrentDateCheckBox = (e) => {
        const isChecked = e.target.checked;
        setCheckInvDate1(isChecked ? 'Y' : 'N');

        // Get the current date in the desired format

        setAssessmentData((prevData) =>
            prevData.map((item) => ({
                ...item,
                checkDate: isChecked ? 'Y' : 'N',
                invoiceDate: isChecked ? new Date() : null,
            }))
        );
    };

    const handleSelectedDateCheckBox = (e) => {
        const isChecked = e.target.checked;
        setCheckInvDate(isChecked ? 'Y' : 'N');

        // Get the current date in the desired format

        setAssessmentData((prevData) =>
            prevData.map((item) => ({
                ...item,
                checkDate: isChecked ? 'Y' : 'N',
                invoiceDate: isChecked ? invDate : null,
            }))
        );
    };


    const handleInvDate = (date) => {
        setInvDate(date);

        if (checkInvDate === 'Y') {
            setAssessmentData((prevData) =>
                prevData.map((item) => ({
                    ...item,
                    checkDate: 'Y',
                    invoiceDate: date,
                }))
            );
        }
    }

    const handleSelectDateCheckBox = (e, index, invoiceDate) => {

        const checked = e.target.checked;

        setAssessmentData(prevState => {
            const updatedData = [...prevState];
            updatedData[index] = {
                ...updatedData[index],
                checkDate: checked ? 'Y' : 'N',
                invoiceDate: checked ? (checkInvDate === 'Y' ? invDate : checkInvDate1 === 'Y' ? new Date() : invoiceDate) : invoiceDate
            };
            return updatedData;
        });
    }

    const handleSelectInvDate = (date, index) => {
        setAssessmentData(prevState => {
            const updatedData = [...prevState];
            updatedData[index] = {
                ...updatedData[index],
                invoiceDate: date
            };
            return updatedData;
        });
    }




    const CustomInput = React.forwardRef(({ value, onClick, onKeyDown, className, onChange, id, disabled }, ref) => (
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <input
                ref={ref}
                value={value}
                onClick={onClick}
                onKeyDown={onKeyDown}
                className={className} // Apply the passed className here
                style={{ width: '100%' }} // Adjust as needed
                onChange={onChange}
                id={id}
                disabled={disabled}
            />
            <FontAwesomeIcon
                icon={faCalendarAlt}
                style={{
                    position: 'absolute',
                    right: '10px',
                    color: '#6c757d',
                }}
            />
        </div>
    ));












    const [isModalOpenForAssesMentSearch, setIsModalOpenForAssesMentSearch] = useState(false);
    const [searchAssesMentvalues, setSearchAssesMentvalues] = useState('');
    const [currentPageSearch, setCurrentPageSearch] = useState(1);
    const [assesmentSearchData, setAssesmentSearchData] = useState([]);


    const searchAssesMentSearch = async (searchvalue) => {
        setCurrentPageSearch(1);
        setLoading(true);
        try {
            const response = await FinanceService.getAssesMentEntriesToSelectProForma(companyid, branchId, searchvalue, selectedInvoiceType, jwtToken);
            setAssesmentSearchData(response.data);
        } catch (error) {
            console.error("Error fetching SB entries:", error);
        } finally {
            setLoading(false);
        }
    };



    const handleCloseAssesMentSearch = () => {
        setIsModalOpenForAssesMentSearch(false);
        setSearchAssesMentvalues('');
        setAssesmentSearchData([]);
    }


    const clearAssesMentSearch = () => {
        setSearchAssesMentvalues('');
        setAssesmentSearchData([]);
        searchAssesMentSearch('');
    }


    const selectAssesMentSearchRadio = async (profitcentreId, assesMentId, invoiceNo, sbTransId) => {
        await getSelectedAssesMentSearch(profitcentreId, assesMentId, invoiceNo, sbTransId);
        handleCloseAssesMentSearch();
    }

    // PAGINATION FOR SELECT EXPORTER
    const [itemsPerPageSearch] = useState(5);

    const indexOfLastItemCartingSearch = currentPageSearch * itemsPerPageSearch;
    const indexOfFirstItemCartingSearch = indexOfLastItemCartingSearch - itemsPerPageSearch;
    const currentItemsAssesMentSearch = assesmentSearchData.slice(indexOfFirstItemCartingSearch, indexOfLastItemCartingSearch);
    const totalPagesCartingSearch = Math.ceil(assesmentSearchData.length / itemsPerPageSearch);

    // Function to handle page change
    const handlePageChangeAssesMent = (page) => {
        if (page >= 1 && page <= totalPagesCartingSearch) {
            setCurrentPageSearch(page);
        }
    };


    const displayPagesAssesMentSearch = () => {
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

    const updateSelectTags = async (exportGateIn) => {
        const initialCha = { value: exportGateIn.cha, label: exportGateIn.chaName }; setSelectedCha(initialCha);
        const initialExp = { value: exportGateIn.importerId, label: exportGateIn.exporterName }; setSelectedExporter(initialExp);
        const initialForwarder = { value: exportGateIn.onAccountOf, label: exportGateIn.fwdName }; setSelectedForwarder(initialForwarder);
        const initialOnAccountOf = { value: exportGateIn.otherPartyId, label: exportGateIn.accHolderName }; setselectedAgent(initialOnAccountOf);

        const selectedValue = exportGateIn.transactionType === 'SB' ? exportGateIn.sbNo : exportGateIn.containerNo;
        const initialSbContainerNo = { value: selectedValue, label: selectedValue }; setSelectedSbOrContainer(initialSbContainerNo);

        setMainSearch((prev) => {
            const updatedSearch = {
                ...prev,
                operation: selectedValue === 'SB' ? 'SB' : 'container',
            };
            return updatedSearch;
        });


    }


    const getSelectedAssesMentSearch = async (profitcentreId, assesMentId, invoiceNo, sbTransId) => {

        setLoading(true);
        try {
            const response = await FinanceService.getSelectedAssesMentSearchProForma(companyid, branchId, profitcentreId, assesMentId, invoiceNo, sbTransId, selectedInvoiceType, jwtToken);

            const { assesmentSheetRec, containerDataRec, sbData, existingSrv, existingSrvFin, tanNo, tdsperc, tdsDeductee, } = response.data;

            updateSelectTags(assesmentSheetRec);

            setAssessmentSheet(assesmentSheetRec);
            setAssessmentData(containerDataRec);
            setSbCargoData(sbData);

            setTdsDeductee(tdsDeductee);
            setTdsPerc(tdsperc);
            setTanNo(tanNo);
            setBeforeTax(existingSrv.billAmt);
            setInvoiceAmt(existingSrv.invoiceAmt);
            // setReceiptAmt(existingSrv.receiptAmt);
            setBalanceAmt(0);

        } catch {


        } finally {
            setLoading(false);
        }
    }





    const handleOpenAssessmentSheetSearch = async () => {
        setIsModalOpenForAssesMentSearch(true);
        setSearchAssesMentvalues('');
        searchAssesMentSearch();
    }
    const [selectedInvoiceType, setSelectedInvoiceType] = useState('Export Container');

    const initialMainsearch = {
        companyId: companyid,
        branchId: branchId,
        profitcentreId: 'N00004',
        operation: 'sb',
        searchValue: '',
        invoiceType: 'Export Container'
    }

    const [mainSearch, setMainSearch] = useState(initialMainsearch);

    console.log('setAssessmentSheet \n', assessmentSheet);


    const handleMainSearchChange = (e) => {
        const { name, value } = e.target;
        if (name === 'operation') {
            setAssessmentSheet((prev) => {
                const updatedSearch = {
                    ...prev,
                    transactionType: value === 'sb' ? 'SB' : value === 'container' ? 'CONT' : ''
                };
                return updatedSearch;
            });
        }

        setMainSearch((prev) => {
            const updatedSearch = {
                ...prev,
                [name]: value,
            };
            return updatedSearch;
        });
    };


    const handleSelectSbOrContainer = async (selectedOption) => {
        setSelectedSbOrContainer(selectedOption);
        await handleClear('select');

        setMainSearch((prev) => {
            const updatedSearch = {
                ...prev,
                searchValue: selectedOption ? selectedOption.value : '',
            };
            if (selectedOption) {
                handleMainSBSearch(updatedSearch);
            }
            return updatedSearch;
        });
    }






    const handleMainSBSearch = async (searchParameter) => {
        setLoading(true)
        try {
            searchAssesmentBySelectedValue(searchParameter);
        } catch (error) {
            console.error('Error fetching data: ', error.message);
        }
    };


    const searchAssesmentBySelectedValue = async (searchParameter) => {
        let response;
        setLoading(true);
        try {
            response = await FinanceService.searchAssesmentBySelectedValue(searchParameter, jwtToken);

            console.log('response.data:  \n', response.data);
            if (!response.data || response.data.length === 0) {
                toast.error('No Data Found', {
                    position: 'top-center',
                    autoClose: 1000,
                });
                return;
            }

            setAssessmentData(response.data);
            convertToAssessMent(response.data[0]);
        } catch (error) {
            console.error('Error fetching data: ', error.message);
        } finally {
            setLoading(false);
        }
    };




    const convertToAssessMent = async (data) => {
        setAssessmentSheet((prev) => {
            const updatedSearch = {
                ...prev,
                sbTransId: data.sbTransId,
                sbNo: data.sbNo,
                sbDate: new Date(data.sbDate),
                cha: data.cha,
                chaName: data.partyName,
                chaGst: data.chaGstNo ? data.chaGstNo : '',
                chaAddress: data.chaAddress1 ? data.chaAddress1 : '' + '' + data.chaAddress2 ? data.chaAddress2 : '' + '' + data.chaAddress3 ? data.chaAddress3 : '',
                chaStateCode: data.chaState,
                chaSrNo: data.chaSrNo,
                profitcentreId: data.profitcentreId,
                profitcentreName: data.profitcentreDesc,
                importerId: data.exporterId,
                exporterName: data.exporterName,
                expAddress: data.exporterAddress1 ? data.exporterAddress1 : '' + '' + data.exporterAddress2 ? data.exporterAddress2 : '' + '' + data.exporterAddress3 ? data.exporterAddress3 : '',
                expGst: data.exporterGstNo ? data.exporterGstNo : '',
                expStateCode: data.exporterState,
                typeOfCargo: data.typeOfPackage,
                accTanId2: data.tanNoIdCh,
                accTanId1: data.tanNoIdFc,
                expTanNo: data.tanNoIdI,
                accHolderGst2: data.gstNoCha ? data.gstNoCha : '',
                accStateCode2: data.stateCha,
                accAddress2: data.address1Cha ? data.address1Cha : '' + '' + data.address2Cha ? data.address2Cha : '' + '' + data.address3Cha ? data.address3Cha : '',
                accHolderGst: data.gstNoCus ? data.gstNoCus : '',
                accStateCode: data.stateCus ? data.stateCus : '',
                accAddress: data.address1Cus ? data.address1Cus : '' + '' + data.address2Cus ? data.address2Cus : '' + '' + data.address3Cus ? data.address3Cus : '',
                othPartyId: data.onAccountOf,
                othSrNo: data.srNoCus,
                accHolderName: data.partyNameFc,
                sbWeight: data.grossWeight,
                movementReqId: data.movementReqId,
                commodityCode: data.newCommodity,
                commodityDescription: data.commodity,
                sa: data.shippingAgent,
                sl: data.shippingLine,
                stuffTallyWoTransId: data.stuffTallyWoTransId,
                stuffMode: data.stuffMode,
                minCartingTransDate: data.cartingDate,
                cartingTransId: data.cartingTransId,
                movementType: data.movementType,
                transactionType: mainSearch.operation === 'sb' ? 'SB' : mainSearch.operation === 'container' ? 'CONT' : ''
            };


            setSelectedExporter(data.exporterId ? { value: data.exporterId, label: data.exporterName } : null);
            setSelectedCha(data.cha ? { value: data.cha, label: data.partyName } : null);
            setselectedAgent(data.onAccountOf ? { value: data.onAccountOf, label: data.partyNameFc } : null);


            return updatedSearch;
        });
    }


    const handleFieldChange = (e, fieldName, type, maxIntegerDigits, maxDecimalDigits) => {
        let { value } = e.target;

        // Process input based on type
        if (type === 'decimal') {
            // Remove any invalid characters
            value = value.replace(/[^0-9.]/g, '');

            const parts = value.split('.');

            // If there are more than 2 parts, combine them correctly
            if (parts.length > 2) {
                value = parts[0] + '.' + parts.slice(1).join('');
            }

            // Limit the integer part
            if (parts[0].length > maxIntegerDigits) {
                parts[0] = parts[0].slice(0, maxIntegerDigits);
            }

            // Limit the decimal part
            if (parts[1]) {
                parts[1] = parts[1].slice(0, maxDecimalDigits);
            }

            value = parts.join('.');
        } else if (type === 'number') {
            value = value.replace(/[^0-9]/g, '');
        }

        // Update the exportSbCargoEntry object
        setAssessmentSheet(prevEntry => ({
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




    const [chaData, setChaData] = useState([]);
    const [exporterData, setExporterData] = useState([]);
    const [agentData, setAgentData] = useState([]);
    const [forwarderData, setForwarderData] = useState([]);

    const [selectedForwarder, setSelectedForwarder] = useState(null);
    const [selectedExporter, setSelectedExporter] = useState(null);
    const [selectedCha, setSelectedCha] = useState(null);
    const [selectedAgent, setselectedAgent] = useState(null);



    const CustomOption = (props) => {
        // console.log(props);
        return (
            <components.Option {...props}>
                <span style={{ fontWeight: 'bold' }}>{props.data.partyName}</span>
                {" - " + props.data.address1 + " " + props.data.address2 + " " + props.data.address3}
            </components.Option>
        );
    };


    const searchExporter = async (searchValue, type) => {
        if (!searchValue) {
            return;
        }
        try {
            const response = await FinanceService.searchExporterExportInvoice(companyid, branchId, searchValue, type, jwtToken);

            const selectedOption = response.data;

            if (type === 'cha') {
                setChaData(selectedOption);
            } else if (type === 'exp') {
                setExporterData(selectedOption);
            } else if (type === 'agent') {
                setAgentData(selectedOption);
            } else if (type === 'forwarder') {
                setForwarderData(selectedOption);
            }

        } catch (error) {
            toast.error('Oops something went wrong!', {
                position: 'top-center',
                autoClose: 700,
            });
        }

    };
    const handleSelectChange = async (selectedOption, type) => {
        if (type === 'cha') {
            setSelectedCha(selectedOption);
            updateAssesMentSheet('cha', selectedOption ? selectedOption.partyId : '');
            updateAssesMentSheet('chaSrNo', selectedOption ? selectedOption.srNo : '');
            updateAssesMentSheet('chaName', selectedOption ? selectedOption.partyName : '');
            updateAssesMentSheet('chaAddress', selectedOption ? selectedOption.address1 + ' ' + selectedOption.address2 + ' ' + selectedOption.address3 : '');
            updateAssesMentSheet('chaGst', selectedOption ? selectedOption.gstNo : '');
            updateAssesMentSheet('chaStateCode', selectedOption ? selectedOption.state : '');

            updateValidationErrors('cha');
        }
        else if (type === 'exp') {
            setSelectedExporter(selectedOption);


            updateAssesMentSheet('importerId', selectedOption ? selectedOption.partyId : '');
            updateAssesMentSheet('impSrNo', selectedOption ? selectedOption.srNo : '');
            updateAssesMentSheet('exporterName', selectedOption ? selectedOption.partyName : '');
            updateAssesMentSheet('expAddress', selectedOption ? selectedOption.address1 + ' ' + selectedOption.address2 + ' ' + selectedOption.address3 : '');
            updateAssesMentSheet('expGst', selectedOption ? selectedOption.gstNo : '');
            updateAssesMentSheet('expStateCode', selectedOption ? selectedOption.state : '');


            updateValidationErrors('exporterName');
        } else if (type === 'agent') {
            setselectedAgent(selectedOption);

            updateAssesMentSheet('othPartyId', selectedOption ? selectedOption.partyId : '');
            updateAssesMentSheet('othSrNo', selectedOption ? selectedOption.srNo : '');
            updateAssesMentSheet('accHolderName', selectedOption ? selectedOption.partyName : '');
            updateAssesMentSheet('accAddress', selectedOption ? selectedOption.address1 + ' ' + selectedOption.address2 + ' ' + selectedOption.address3 : '');
            updateAssesMentSheet('accHolderGst', selectedOption ? selectedOption.gstNo : '');
            updateAssesMentSheet('accStateCode', selectedOption ? selectedOption.state : '');

            updateValidationErrors('exporterName');
        } else if (type === 'forwarder') {
            setSelectedForwarder(selectedOption);

            updateAssesMentSheet('onAccountOf', selectedOption ? selectedOption.partyId : '');
            updateAssesMentSheet('accSrNo', selectedOption ? selectedOption.srNo : '');
            updateAssesMentSheet('fwdName', selectedOption ? selectedOption.partyName : '');
            updateAssesMentSheet('fwdAddress', selectedOption ? selectedOption.address1 + ' ' + selectedOption.address2 + ' ' + selectedOption.address3 : '');
            updateAssesMentSheet('fwdGst', selectedOption ? selectedOption.gstNo : '');
            updateAssesMentSheet('fwdState', selectedOption ? selectedOption.state : '');




            updateValidationErrors('exporterName');
        }





    };
    const updateAssesMentSheet = (field, value) => {
        setAssessmentSheet((prevExportSbEntry) => ({
            ...prevExportSbEntry,
            [field]: value,
        }));
    };

    const updateValidationErrors = (field) => {
        setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: '',
        }));
    };


    const handleSave = async (assesmentSheet, assesmentData) => {
        setLoading(true);
        if (!assesmentSheet.sbTransId) {
            toast.error("SB data not found", {
                autoClose: 800
            });
            setLoading(false);
            return;
        }

        if (!assesmentSheet.billingParty) {
            toast.error("Billing Party is required", {
                autoClose: 800
            });
            setLoading(false);
            return;
        }
        else {
            if (assesmentSheet.billingParty === 'CHA') {
                if (!assesmentSheet.cha) {
                    toast.error("CHA is required", {
                        autoClose: 800
                    });
                    setLoading(false);
                    return;
                }
                if (!assesmentSheet.chaGst) {
                    toast.error("GstNo not found, please select another address", {
                        autoClose: 900,
                        style: { width: '33vw' }
                    });
                    setLoading(false);
                    return;
                }

            }

            if (assesmentSheet.billingParty === 'IMP') {
                if (!assesmentSheet.importerId) {
                    toast.error("Exporter is required", {
                        autoClose: 800
                    });
                    setLoading(false);
                    return;
                }
                if (!assesmentSheet.expGst) {
                    toast.error("GstNo not found, please select another address", {
                        autoClose: 900,
                        style: { width: '33vw' }
                    });
                    setLoading(false);
                    return;
                }

            }

            if (assesmentSheet.billingParty === 'FWR') {
                if (!assesmentSheet.onAccountOf) {
                    toast.error("Forwarder is required", {
                        autoClose: 800
                    });
                    setLoading(false);
                    return;
                }

                if (!assesmentSheet.fwdGst) {
                    toast.error("GstNo not found, please select another address", {
                        autoClose: 900,
                        style: { width: '33vw' }
                    });
                    setLoading(false);
                    return;
                }

            }

            if (assesmentSheet.billingParty === 'OTH') {
                if (!assesmentSheet.othPartyId) {
                    toast.error("Account holder is required", {
                        autoClose: 800
                    });
                    setLoading(false);
                    return;
                }

                if (!assesmentSheet.accHolderGst) {
                    toast.error("GstNo not found, please select another address", {
                        autoClose: 900,
                        style: { width: '33vw' }
                    });
                    setLoading(false);
                    return;
                }
            }
        }

        let filteredData;
        if (selectedInvoiceType === 'Export Container' || selectedInvoiceType === 'Export Cargo') {
            filteredData = assesmentData.filter(record => record.checkDate === 'Y');

        } else {
            filteredData = assesmentData;
        }


        if (selectedInvoiceType === 'Export Container') {

            const data = filteredData.filter(item => item.containerNo !== '');

            if (data.length === 0) {
                toast.error("Please select containers", {
                    autoClose: 800
                })
                setLoading(false);
                return;
            }

            const findNullInvDate = data.filter(item => item.invoiceDate === null);

            if (findNullInvDate.length > 0) {
                toast.error("Please Enter invoice date", {
                    autoClose: 800
                });
                setLoading(false);
                return;
            }
        } else if (selectedInvoiceType === 'Export Cargo Carting') {

            if (assesmentData.length === 0) {
                toast.error("Cargo Detail not found", {
                    autoClose: 800
                });
                setLoading(false);
                return;
            }
        } else if (selectedInvoiceType === 'Export Cargo') {

            if (filteredData.length === 0) {
                toast.error("Please select records", {
                    autoClose: 800
                })
                setLoading(false);
                return;
            }


            const findNullInvDate = filteredData.filter(item => item.invoiceDate === null);

            if (findNullInvDate.length > 0) {
                toast.error("Please Enter invoice date", {
                    autoClose: 800
                });
                setLoading(false);
                return;
            }
        }


        try {
            const response = await FinanceService.saveExportAssesmentContainerProForma(companyid, branchId, userId, selectedInvoiceType, assesmentSheet, filteredData, jwtToken);
            const { assesmentSheetRec, containerDataRec, sbData, finaltotalRateWithoutTax, finaltotalRateWithTax, tanNo, tdsPerc } = response.data;
            setAssessmentSheet(assesmentSheetRec);
            setAssessmentData(containerDataRec);
            setSbCargoData(sbData);
            setBeforeTax(finaltotalRateWithoutTax);
            setInvoiceAmt(finaltotalRateWithTax);

            setTanNo(tanNo);
            setTdsPerc(tdsPerc);
            setTdsDeductee(assesmentSheetRec.billingParty);
            setCheckInvDate1('N')
            setCheckInvDate('N');
            setInvDate(null);

            // setBalanceAmt(finaltotalRateWithTax);

            toast.success('Proforma saved successfully', {
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

    const handleClear = async (type) => {
        setAssessmentSheet(initialAssessmentSheet);
        setAssessmentData([]);
        setSelectedExporter(null);
        setSelectedCha(null);
        setselectedAgent(null);
        setSelectedForwarder(null);
        if (type !== 'select') {
            setSelectedSbOrContainer(null);
        }

        setInvDate(null);
        setCheckInvDate('N');
        setCheckInvDate1('N');
        setSbCargoData([]);

        setTdsDeductee('');
        setTanNo('');
        setTdsPerc('');
        setBeforeTax('');
        setInvoiceAmt('');
        setReceiptAmt('');
        setBalanceAmt('');
    }


    const downLoadReport = async (type) => {
        setLoading(true);

        try {
            const response = await FinanceService.downLoadTariffReport('', jwtToken);
            if (type === 'xls') {
                if (response.status === 200) {
                    const blob = new Blob([response.data], { type: response.headers['content-type'] });

                    // Create a temporary URL for the blob
                    const url = window.URL.createObjectURL(blob);

                    // Create a link element to trigger the download
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = 'Invoice.xlsx';

                    // a.download = 'Monthly_Receipt.xlsx';
                    document.body.appendChild(a);
                    a.click();

                    // Clean up
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(a);
                }
            }
            else {




            }

        } catch (error) {
            toast.error("error downLoading file!", {
                position: 'top-center',
                autoClose: 800,
            });
        }
        finally {
            setLoading(false);
        }
    };



    const invoiceTypes = ['Export Carting', 'Export Cargo Storage', 'Export Container', 'Second Export Container', 'Export BackToTown', 'Export BackToTown Container']







    // Add Service Operation

    const initialCfinvsrvanx = {
        companyId: companyid, // String for companyId
        branchId: branchId,  // String for branchId
        processTransId: assessmentSheet.assesmentId, // String for processTransId
        serviceId: '', // String for serviceId
        taxId: '', // String for taxId
        erpDocRefNo: assessmentSheet.sbTransId, // String for ERP Doc Ref No
        srlNo: 0, // BigDecimal equivalent (can be treated as number in JS)
        finPeriod: '', // String for finPeriod
        docRefNo: assessmentSheet.sbNo, // String for docRefNo
        igmLineNo: '', // String for IGM Line No
        profitcentreId: assessmentSheet.profitcentreId, // String for profitcentreId
        invoiceNo: '', // String for invoiceNo
        invoiceDate: null, // Date for invoiceDate (use null or Date object)
        invoiceType: '', // String for invoiceType
        invoiceSubType: '', // String for invoiceSubType
        serviceUnit: '', // String for serviceUnit
        executionUnit: '', // String for executionUnit
        serviceUnit1: '', // String for serviceUnit1
        executionUnit1: '', // String for executionUnit1
        rate: 0, // BigDecimal for rate (use number in JS)
        currencyId: 'INR', // String for currencyId
        periodFrom: null, // Date for periodFrom
        periodTo: null, // Date for periodTo
        foreignAmt: 0, // BigDecimal for foreignAmt (use number in JS)
        exRate: 0, // BigDecimal for exRate (use number in JS)
        localAmtForeign: 0, // BigDecimal for localAmtForeign (use number in JS)
        localAmt: 0, // BigDecimal for localAmt (use number in JS)
        taxPerc: 0, // BigDecimal for taxPerc (use number in JS)
        discDays: 0, // BigDecimal for discDays (use number in JS)
        discPercentage: 0, // BigDecimal for discPercentage (use number in JS)
        discValue: 0, // BigDecimal for discValue (use number in JS)
        mPercentage: 0, // BigDecimal for mPercentage (use number in JS)
        mAmount: 0, // BigDecimal for mAmount (use number in JS)
        invoiceAmt: 0, // BigDecimal for invoiceAmt (use number in JS)
        contractor: '', // String for contractor
        acCode: '', // String for acCode
        processTransDate: null, // Date for processTransDate
        processId: '', // String for processId
        partyId: '', // String for partyId
        woNo: '', // String for woNo
        woAmndNo: '', // String for woAmndNo
        lineNo: '', // String for lineNo
        beNo: '', // String for beNo
        beDate: null, // Date for beDate
        criteria: '', // String for criteria
        rangeFrom: 0, // BigDecimal for rangeFrom (use number in JS)
        rangeTo: 0, // BigDecimal for rangeTo (use number in JS)
        rangeType: '', // String for rangeType
        negeotiable: '', // String for negeotiable
        containerNo: '', // String for containerNo
        containerStatus: '', // String for containerStatus
        commodityDescription: '', // String for commodityDescription
        actualNoOfPackages: 0, // BigDecimal for actualNoOfPackages (use number in JS)
        gateOutId: '', // String for gateOutId
        gatePassNo: '', // String for gatePassNo
        addServices: '', // String for addServices
        gateOutDate: null, // Date for gateOutDate
        startDate: null, // Date for startDate
        invoiceUptoDate: null, // Date for invoiceUptoDate
        invoiceUptoWeek: null, // Date for invoiceUptoWeek
        debitNoteExe: 0, // BigDecimal for debitNoteExe (use number in JS)
        debitNoteAmt: 0, // BigDecimal for debitNoteAmt (use number in JS)
        cfsBaseRate: 0, // BigDecimal for cfsBaseRate (use number in JS)
        partyBaseRate: 0, // BigDecimal for partyBaseRate (use number in JS)
        rebate: 0, // BigDecimal for rebate (use number in JS)
        profitability: 0, // BigDecimal for profitability (use number in JS)
        status: '', // String for status
        createdBy: '', // String for createdBy
        createdDate: null, // Date for createdDate
        editedBy: '', // String for editedBy
        editedDate: null, // Date for editedDate
        approvedBy: '', // String for approvedBy
        approvedDate: null, // Date for approvedDate
        billAmt: 0, // BigDecimal for billAmt (use number in JS)
        joServiceId: '', // String for joServiceId
        joNo: '', // String for joNo
        joAmndNo: '', // String for joAmndNo
        taxApp: '', // String for taxApp
        taxIdN: '', // String for taxIdN
        taxPercN: 0, // BigDecimal for taxPercN (use number in JS)
        taxAmt: 0, // BigDecimal for taxAmt (use number in JS)
        acCodeN: '', // String for acCodeN
        hsnCode: '', // String for hsnCode
        dutyRate: 0, // BigDecimal for dutyRate (use number in JS)
        lotNo: '', // String for lotNo
        fileNo: '', // String for fileNo
        tcsRate: 0, // BigDecimal for tcsRate (use number in JS)
        tcsAmount: 0, // BigDecimal for tcsAmount (use number in JS)
        invoiceDaysOld: 0, // BigDecimal for invoiceDaysOld (use number in JS)
        invoiceAmtOld: 0, // BigDecimal for invoiceAmtOld (use number in JS)
        addOnRate: 0, // BigDecimal for addOnRate (use number in JS)
        prevRate: 0, // BigDecimal for prevRate (use number in JS)
        cargoSBNo: '', // String for cargoSBNo
        srvManualFlag: '', // String for srvManualFlag
        chargableDays: 0, // BigDecimal for chargableDays (use number in JS)
        freeDays: 0, // BigDecimal for freeDays (use number in JS)
    };

    const [Cfinvsrvanx, setCfinvsrvanx] = useState(initialCfinvsrvanx);
    const [CfinvsrvanxData, setCfinvsrvanxData] = useState([]);
    const [isModalOpenForAddService, setIsModalOpenForAddService] = useState(false);


    const getAllCfInvSrvAnxList = async (companyId, branchId, assesmentId, assesmentLineNo, containerNo, profitcentreId) => {
        try {
            const response = await FinanceService.getAllCfInvSrvAnxListPro(companyId, branchId, assesmentId, assesmentLineNo, containerNo, profitcentreId, jwtToken);

            setCfinvsrvanxData(response.data);
        } catch {
            setCfinvsrvanxData([]);
        }
    }











    const openAddServiceModal = async (item) => {
        await getAllCfInvSrvAnxList(companyid, branchId, item.assesmentId, item.assesmentLineNo, item.containerNo, assessmentSheet.profitcentreId);

        setCfinvsrvanx(prevState => ({
            ...prevState,
            lineNo: item.assesmentLineNo,
            processTransId: item.assesmentId,
            containerNo: item.containerNo,
            containerSize: item.containerSize,
            containerType: item.containerType,
            gateOutDate: item.gateOutDate,
            gateOutId: item.gateOutId,
            gatePassNo: item.gatePassNo,
            invoiceUptoDate: item.invoiceDate,
            invoiceUptoWeek: item.invoiceDate,
            partyId: assessmentSheet.partyId,
            startDate: item.gateInDate
        }));
        setIsModalOpenForAddService(true);
    }

    const handleClosAddService = async () => {
        setIsModalOpenForAddService(false);
        setCfinvsrvanxData([]);
        getAllContainerDetailsOfAssesmentId();
        setSelectedServices([]);
    }



    // Pagination
    const [itemsPerPage] = useState(10);
    const [currentPagAddService, setCurrentPageAddService] = useState(1);
    const indexOfLastItemAddService = currentPagAddService * itemsPerPage;
    const indexOfFirstItemAddService = indexOfLastItemAddService - itemsPerPage;
    const currentItemsAddService = CfinvsrvanxData.slice(indexOfFirstItemAddService, indexOfLastItemAddService);
    const totalPagesAddService = Math.ceil(CfinvsrvanxData.length / itemsPerPage);




    // Function to handle page change
    const handlePageChangeAddService = (page) => {
        if (page >= 1 && page <= totalPagesAddService) {
            setCurrentPageAddService(page);
        }
    };
    const displayPagesAddService = () => {
        const centerPageCount = 5;
        const middlePage = Math.floor(centerPageCount / 2);
        let startPage = currentPagAddService - middlePage;
        let endPage = currentPagAddService + middlePage;

        if (startPage < 1) {
            startPage = 1;
            endPage = Math.min(totalPagesAddService, centerPageCount);
        }

        if (endPage > totalPagesAddService) {
            endPage = totalPagesAddService;
            startPage = Math.max(1, totalPagesAddService - centerPageCount + 1);
        }
        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };









    const addServiePlus = async () => {
        // Determine the highest srlNo in the current list
        const highestSrlNo = CfinvsrvanxData.length > 0
            ? Math.max(...CfinvsrvanxData.map(item => item.srlNo))
            : 0;




        // Create a new object with incremented srlNo
        const newCfinvsrvanx = {
            ...Cfinvsrvanx,
            srlNo: highestSrlNo + 1,
            addServices: 'Y',
            companyId: companyid,
            branchId: branchId,
            processTransId: assessmentSheet.assesmentId,
            erpDocRefNo: assessmentSheet.sbTransId,
            docRefNo: assessmentSheet.sbNo,
            profitcentreId: assessmentSheet.profitcentreId,
            serviceUnit: '',
            serviceUnit1: '',
            executionUnit: '',
            executionUnit1: '',
            rate: '',
            actualNoOfPackages: '',
            rangeFrom: '',
            rangeTo: '',
            rangeType: '',
            lineNo: Cfinvsrvanx.lineNo
        };

        // Update the list and ensure the new entry is at the top
        setCfinvsrvanxData([newCfinvsrvanx, ...CfinvsrvanxData]);
    };

    console.log('CfinvsrvanxData........ \n', CfinvsrvanxData);


    const CustomOptionService = (props) => {
        return (
            <components.Option {...props}>
                <span style={{ fontWeight: 'bold' }}>{props.data.serviceName}</span>
                {" - " + props.data.rate}
            </components.Option>
        );
    };



    const [selectedServices, setSelectedServices] = useState([]);
    const [services, setServices] = useState([]);
    const [validationErrors, setValidationErrors] = useState([]);


    const searchServices = async (searchvalue, containerSize, containerType) => {
        try {
            const response = await FinanceService.searchServicesForAddServiceProForma(companyid, branchId, searchvalue, assessmentSheet.commodityCode, containerSize, containerType, assessmentSheet, jwtToken);

            setServices(response.data);
        } catch (error) {
            console.error("Error fetching Gate In entries:", error);
        }
    };




    const handleServiceChange = async (selectedOption, srlNo) => {
        console.log('selectedOption \n', selectedOption);

        // Update only the specific srlNo in selectedServices
        setSelectedServices((prevServices) => {
            const existingService = prevServices.find((service) => service.srlNo === srlNo);

            if (existingService) {
                // Update the existing service
                return prevServices.map((service) =>
                    service.srlNo === srlNo
                        ? { ...service, selectedOption } // Update the selected option for this srlNo
                        : service // Keep the rest unchanged
                );
            } else {
                // Add a new service if it doesn't exist
                return [
                    ...prevServices,
                    {
                        srlNo, // New service srlNo
                        selectedOption, // New selected option
                    },
                ];
            }
        });



        setCfinvsrvanxData((prevData) =>
            prevData.map((entry) =>
                entry.srlNo === srlNo
                    ? {
                        ...entry, serviceId: selectedOption ? selectedOption.value : '',
                        serviceName: selectedOption ? selectedOption.label : '',
                        executionUnit: selectedOption ? selectedOption.executionUnit : '',
                        executionUnit1: selectedOption ? selectedOption.executionUnit1 : '',
                        actualNoOfPackages: selectedOption ? selectedOption.actualNoOfPackages : '',
                        serviceUnit: selectedOption ? selectedOption.serviceUnit : '',
                        serviceUnit1: selectedOption ? selectedOption.serviceUnit1 : '',
                        rate: selectedOption ? selectedOption.rate : 0,
                        currencyId: selectedOption ? selectedOption.currencyId : '',
                        woNo: selectedOption ? selectedOption.woNo : '',
                        woAmndNo: selectedOption ? selectedOption.woAmndNo : '',
                        // lineNo: selectedOption ? selectedOption.lineNo : '0',
                        rangeType: selectedOption ? selectedOption.rangeType : '',
                        taxId: selectedOption ? selectedOption.taxId : '',
                        taxPerc: selectedOption ? selectedOption.taxPerc : 0,
                        acCode: selectedOption ? selectedOption.acCode : '',
                        executionUnit: 0,
                        executionUnit1: 0,
                        actualNoOfPackages: 0
                    }
                    : entry
            )
        );
        setValidationErrors(prevErrors => {
            const updatedErrors = { ...prevErrors };
            if (updatedErrors[srlNo]) {
                delete updatedErrors[srlNo];
            }
            return updatedErrors;
        });

    };




    const handleFieldChangeService = async (e, fieldName, type, srlNo, maxIntegerDigits, maxDecimalDigits) => {
        let { value } = e.target;

        // Validate input based on the type
        if (type === 'decimal') {
            value = value.replace(/[^0-9.]/g, ''); // Remove invalid characters

            const parts = value.split('.');
            if (parts.length > 2) {
                value = parts[0] + '.' + parts.slice(1).join('');
            }

            if (parts[0].length > maxIntegerDigits) {
                parts[0] = parts[0].slice(0, maxIntegerDigits);
            }

            if (parts[1]) {
                parts[1] = parts[1].slice(0, maxDecimalDigits);
            }

            value = parts.join('.');
        } else if (type === 'number') {
            value = value.replace(/[^0-9]/g, ''); // Allow only numbers
        }

        setCfinvsrvanxData(prevState => {
            const updatedServices = prevState.map(service => {
                if (service.srlNo === srlNo) {
                    const updatedService = {
                        ...service,
                        [fieldName]: value, // Update the specific field
                    };

                    // Calculate actualNoOfPackages if fieldName is one of the specified fields
                    if (
                        ['rate', 'executionUnit', 'executionUnit1'].includes(fieldName)
                    ) {
                        updatedService.actualNoOfPackages = (
                            parseFloat(updatedService.rate || 0) *
                            parseFloat(updatedService.executionUnit || 0) *
                            parseFloat(
                                updatedService.executionUnit1 && updatedService.serviceUnit1 !== 'NA' && updatedService.serviceUnit1.trim() !== ''
                                    ? updatedService.executionUnit1
                                    : 1
                            )
                        ).toFixed(2);
                    }

                    return updatedService;
                }
                return service; // Keep the rest unchanged
            });
            return updatedServices;
        });

        // Clear validation errors for the specific field by matching srlNo
        setValidationErrors(prevErrors => {
            const updatedErrors = { ...prevErrors };
            if (updatedErrors[srlNo]) {
                delete updatedErrors[srlNo][fieldName]; // Remove the field error for the matched srlNo
                if (Object.keys(updatedErrors[srlNo]).length === 0) {
                    delete updatedErrors[srlNo]; // Remove the srlNo key if no errors remain
                }
            }
            return updatedErrors;
        });
    };





    const validateServiceData = (filteredData) => {
        let errors = {}; // Use an object to store errors by srlNo
        console.log('filteredData \n', filteredData);

        filteredData.forEach((detail) => {
            const { serviceId, executionUnit, executionUnit1, rate, actualNoOfPackages, srlNo, serviceUnit1, lineNo } = detail;
            let error = {};

            // Required field validations
            if (!executionUnit || executionUnit <= 0) {
                error.executionUnit = 'executionUnit is required';
            }

            console.log('serviceUnit1, ', serviceUnit1.trim(), ' executionUnit1 ', executionUnit1);
            if (serviceUnit1 && serviceUnit1.trim() !== 'NA' && serviceUnit1.trim() !== '') {
                if (!executionUnit1 || executionUnit1 <= 0) {
                    error.executionUnit1 = 'executionUnit1 is required';
                }
            }


            if (!rate || rate <= 0) {
                error.rate = 'rate is required';
            }

            if (!actualNoOfPackages || actualNoOfPackages <= 0) {
                error.actualNoOfPackages = 'actualNoOfPackages is required';
            }

            if (!lineNo || lineNo <= 0) {
                error.lineNo = 'lineNo is required';
            }

            if (!serviceId) {
                error.serviceId = 'serviceId is required';
            }

            // Add the error to the errors object, keyed by srlNo
            if (Object.keys(error).length > 0) {
                errors[srlNo] = error;
            }
        });

        setValidationErrors(errors);

        // Return true if no errors exist
        return Object.keys(errors).length === 0;
    };

    console.log('validationErrors \n', validationErrors);





    const saveAddService = async (serviceData) => {

        const filteredData = serviceData?.filter((detail) => detail.addServices === 'Y') || [];

        // Check if filteredData is empty
        if (filteredData.length === 0) {
            toast.warning("Please add the service first", {
                position: 'top-center',
                autoClose: 1000,
            });
            return;
        }

        if (!validateServiceData(filteredData)) {
            toast.warning("Plase check the values entered...", {
                position: 'top-center',
                autoClose: 1000,
            });
            return false;
        }

        console.log('filteredData************** \n', filteredData);



        setLoading(true);
        try {
            const response = await FinanceService.saveAddServiceContainerWiseProForma(companyid, branchId, userId, assessmentSheet, filteredData, jwtToken);

            setCfinvsrvanxData(response.data);

            toast.success('Services added successfully!', {
                position: 'top-center',
                autoClose: 1000,
            });
        } catch {
            toast.error('Oops something went wrong!', {
                position: 'top-center',
                autoClose: 1000,
            });
        }
        finally {
            setLoading(false);
        }

    }


    // const [Cfinvsrvanx, setCfinvsrvanx] = useState(initialCfinvsrvanx);
    const [containerDataServiceWise, setContainerDataServiceWise] = useState([]);
    const [isModalOpenForAddServiceServiceWise, setIsModalOpenForAddServiceServiceWise] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [validationContainer, setValidationContainerErrors] = useState([]);



    const openModelForAddServiceServiceWise = async () => {
        await getAllContainerListOfAssessMentSheet(companyid, branchId, assessmentSheet.assesmentId, assessmentSheet.profitcentreId);
        setIsModalOpenForAddServiceServiceWise(true);
    }


    const getAllContainerListOfAssessMentSheet = async (companyId, branchId, assesmentId, profitcentreId) => {
        try {
            const response = await FinanceService.getAllContainerListOfAssessMentSheetProForma(companyId, branchId, assesmentId, profitcentreId, selectedInvoiceType, jwtToken);
            setContainerDataServiceWise(response.data);
        } catch {
            setContainerDataServiceWise([]);
        }
    }


    const handleClosAddServiceServiceWise = async () => {
        setIsModalOpenForAddServiceServiceWise(false);
        setCfinvsrvanxData([]);
        handleReset();
        getAllContainerDetailsOfAssesmentId();
    }



    const getAllContainerDetailsOfAssesmentId = async () => {
        try {
            const response = await FinanceService.getAllContainerDetailsOfAssesmentIdProForma(companyid, branchId, assessmentSheet.assesmentId, assessmentSheet.profitcentreId, selectedInvoiceType, jwtToken);
            const { finaltotalRateWithoutTax, finaltotalRateWithTax, containerDataRec } = response.data;
            setBeforeTax(finaltotalRateWithoutTax);
            setReceiptAmt(finaltotalRateWithTax);
            setBalanceAmt(0);
            setAssessmentData(containerDataRec);
            setInvoiceAmt(finaltotalRateWithTax);
        } catch {
            console.log('error in getAllContainerDetailsOfAssesmentId...');
        }
    };

    const handleServiceChangeContainer = (selectedOption) => {
        setSelectedService(selectedOption ? { value: selectedOption.value, label: selectedOption.label } : null);

        setCfinvsrvanx(prevState => {
            return {
                ...prevState,
                serviceId: selectedOption ? selectedOption.value : '',
                serviceName: selectedOption ? selectedOption.label : '',
                executionUnit: selectedOption ? selectedOption.executionUnit : '',
                executionUnit1: selectedOption ? selectedOption.executionUnit1 : '',
                actualNoOfPackages: selectedOption ? selectedOption.actualNoOfPackages : '',
                serviceUnit: selectedOption ? selectedOption.serviceUnit : '',
                serviceUnit1: selectedOption ? selectedOption.serviceUnit1 : '',
                rate: selectedOption ? selectedOption.rate : 0,
                currencyId: selectedOption ? selectedOption.currencyId : '',
                woNo: selectedOption ? selectedOption.woNo : '',
                woAmndNo: selectedOption ? selectedOption.woAmndNo : '',
                // lineNo: selectedOption ? selectedOption.lineNo : '0',
                rangeType: selectedOption ? selectedOption.rangeType : '',
                taxId: selectedOption ? selectedOption.taxId : '',
                taxPerc: selectedOption ? selectedOption.taxPerc : 0,
                acCode: selectedOption ? selectedOption.acCode : '',
                executionUnit: 0,
                executionUnit1: 0,
                actualNoOfPackages: 0
            };
        });

        setSelectedContainers(prevContainers => {
            return prevContainers.map(container => {
                // Update the container object with selectedOption values
                return {
                    ...container,
                    serviceId: selectedOption ? selectedOption.value : '',
                    serviceName: selectedOption ? selectedOption.label : '',
                    executionUnit: selectedOption ? selectedOption.executionUnit : '',
                    executionUnit1: selectedOption ? selectedOption.executionUnit1 : '',
                    actualNoOfPackages: selectedOption ? selectedOption.actualNoOfPackages : '',
                    serviceUnit: selectedOption ? selectedOption.serviceUnit : '',
                    serviceUnit1: selectedOption ? selectedOption.serviceUnit1 : '',
                    rate: selectedOption ? selectedOption.rate : 0,
                    currencyId: selectedOption ? selectedOption.currencyId : '',
                    woNo: selectedOption ? selectedOption.woNo : '',
                    woAmndNo: selectedOption ? selectedOption.woAmndNo : '',
                    // lineNo: selectedOption ? selectedOption.lineNo : '0',
                    rangeType: selectedOption ? selectedOption.rangeType : '',
                    taxId: selectedOption ? selectedOption.taxId : '',
                    taxPerc: selectedOption ? selectedOption.taxPerc : 0,
                    acCode: selectedOption ? selectedOption.acCode : '',
                };
            });
        });


        setContainerDataServiceWise(prevContainers => {
            return prevContainers.map(container => {
                // Update the container object with selectedOption values
                return {
                    ...container,
                    serviceId: selectedOption ? selectedOption.value : '',
                    serviceName: selectedOption ? selectedOption.label : '',
                    executionUnit: selectedOption ? selectedOption.executionUnit : '',
                    executionUnit1: selectedOption ? selectedOption.executionUnit1 : '',
                    actualNoOfPackages: selectedOption ? selectedOption.actualNoOfPackages : '',
                    serviceUnit: selectedOption ? selectedOption.serviceUnit : '',
                    serviceUnit1: selectedOption ? selectedOption.serviceUnit1 : '',
                    rate: selectedOption ? selectedOption.rate : 0,
                    currencyId: selectedOption ? selectedOption.currencyId : '',
                    woNo: selectedOption ? selectedOption.woNo : '',
                    woAmndNo: selectedOption ? selectedOption.woAmndNo : '',
                    // lineNo: selectedOption ? selectedOption.lineNo : '0',
                    rangeType: selectedOption ? selectedOption.rangeType : '',
                    taxId: selectedOption ? selectedOption.taxId : '',
                    taxPerc: selectedOption ? selectedOption.taxPerc : 0,
                    acCode: selectedOption ? selectedOption.acCode : '',
                };
            });
        });
    };


    const validateServiceDataContainer = (filteredData) => {
        const { serviceId, executionUnit, executionUnit1, rate, actualNoOfPackages, serviceUnit1 } = filteredData;
        let error = {};

        // Convert values to numbers if necessary
        const executionUnitNum = Number(executionUnit);
        const executionUnit1Num = Number(executionUnit1);
        const rateNum = Number(rate);
        const actualNoOfPackagesNum = Number(actualNoOfPackages);

        // Required field validations
        if (!executionUnitNum || executionUnitNum <= 0) {
            error.executionUnit = 'Execution Unit is required';
        }

        if (serviceUnit1 && serviceUnit1.trim() !== 'NA' && serviceUnit1.trim() !== '') {
            if (!executionUnit1Num || executionUnit1Num <= 0) {
                error.executionUnit1 = 'Execution Unit1 is required';
            }
        }

        if (!rateNum || rateNum <= 0) {
            error.rate = 'Rate is required';
        }

        if (!actualNoOfPackagesNum || actualNoOfPackagesNum <= 0) {
            error.actualNoOfPackages = 'Actual No. of Packages is required';
        }

        if (!serviceId) {
            error.serviceId = 'Service ID is required';
        }

        setValidationContainerErrors(error);

        // Return true if no errors exist
        return Object.keys(error).length === 0;
    };








    const saveAddServiceContainerWise = async (selectedContainers) => {

        setLoading(true);

        if (!selectedContainers || selectedContainers.length === 0) {
            toast.warning("Please select containers", {
                position: 'top-center',
                autoClose: 1000,
            });
            setLoading(false);
            return;
        }

        if (!validateServiceDataContainer(Cfinvsrvanx)) {
            toast.warning("Plase check the values entered...", {
                position: 'top-center',
                autoClose: 1000,
            });
            setLoading(false);
            return false;
        }


        try {
            const response = await FinanceService.addServiceExportInvoiceServiceWiseProForma(companyid, branchId, userId, assessmentSheet, selectedContainers, jwtToken);

            handleReset();
            toast.success('Services added successfully!', {
                position: 'top-center',
                autoClose: 1000,
            });
        } catch {
            toast.error('Oops something went wrong!', {
                position: 'top-center',
                autoClose: 1000,
            });
        }
        finally {
            setLoading(false);
        }
    }
    const handleReset = () => {
        setCfinvsrvanx(initialCfinvsrvanx);
        setSelectedContainers([]);
        setSelectedContainersAll(false);
        setSelectedService(null);


        setContainerDataServiceWise(prevContainers => {
            return prevContainers.map(container => {
                return {
                    ...container,
                    serviceId: '',
                    serviceName: '',
                    executionUnit: '',
                    executionUnit1: '',
                    actualNoOfPackages: '',
                    serviceUnit: '',
                    serviceUnit1: '',
                    rate: 0,
                    currencyId: '',
                    woNo: '',
                    woAmndNo: '',
                    lineNo: '0',
                    rangeType: '',
                    taxId: '',
                    taxPerc: 0,
                    acCode: '',
                };
            });
        });



    }


    const handleFieldChangeContainer = async (e, fieldName, type) => {
        let { value } = e.target;

        if (type === 'number') {
            value = value.replace(/[^0-9]/g, '');
        }

        setCfinvsrvanx(prevState => {
            const updatedService = {
                ...prevState,
                [fieldName]: value,
            };

            if (
                ['rate', 'executionUnit', 'executionUnit1'].includes(fieldName)
            ) {
                updatedService.actualNoOfPackages = (
                    parseFloat(updatedService.rate || 0) *
                    parseFloat(updatedService.executionUnit || 0) *
                    parseFloat(
                        updatedService.executionUnit1 && updatedService.serviceUnit1 !== 'NA' && updatedService.serviceUnit1.trim() !== ''
                            ? updatedService.executionUnit1
                            : 1
                    )
                ).toFixed(2);
            }

            return updatedService;
        });

        // Update the selectedContainers array
        setSelectedContainers(prevContainers => {
            return prevContainers.map(container => {
                const updatedContainer = {
                    ...container,
                    [fieldName]: value, // Update the specific field
                };

                // If the field is rate, executionUnit, or executionUnit1, calculate actualNoOfPackages
                if (['rate', 'executionUnit', 'executionUnit1'].includes(fieldName)) {
                    updatedContainer.actualNoOfPackages = (
                        parseFloat(updatedContainer.rate || 0) *
                        parseFloat(updatedContainer.executionUnit || 0) *
                        parseFloat(
                            updatedContainer.executionUnit1 && updatedContainer.serviceUnit1 !== 'NA' && updatedContainer.serviceUnit1.trim() !== ''
                                ? updatedContainer.executionUnit1
                                : 1
                        )
                    ).toFixed(2);
                }

                return updatedContainer;
            });
        });


        setContainerDataServiceWise(prevContainers => {
            return prevContainers.map(container => {
                const updatedContainer = {
                    ...container,
                    [fieldName]: value, // Update the specific field
                };

                // If the field is rate, executionUnit, or executionUnit1, calculate actualNoOfPackages
                if (['rate', 'executionUnit', 'executionUnit1'].includes(fieldName)) {
                    updatedContainer.actualNoOfPackages = (
                        parseFloat(updatedContainer.rate || 0) *
                        parseFloat(updatedContainer.executionUnit || 0) *
                        parseFloat(
                            updatedContainer.executionUnit1 && updatedContainer.serviceUnit1 !== 'NA' && updatedContainer.serviceUnit1.trim() !== ''
                                ? updatedContainer.executionUnit1
                                : 1
                        )
                    ).toFixed(2);
                }

                return updatedContainer;
            });
        });


        setValidationContainerErrors(prevErrors => {
            const updatedErrors = { ...prevErrors };
            // Remove the error for the specific field
            delete updatedErrors[fieldName];
            return updatedErrors;
        });

    };



    function convertToCustomDateTime(value) {
        if (!value) {
            return;
        }

        const date = new Date(value);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }

    const [selectedContainersAll, setSelectedContainersAll] = useState(false);
    const [selectedContainers, setSelectedContainers] = useState([]);
    console.log('selectedContainer ..... \n', selectedContainers);


    useEffect(() => {
        setSelectedContainersAll(selectedContainers.length === containerDataServiceWise.length);
    }, [selectedContainers, containerDataServiceWise]);

    const handleSelectAllToggleContainer = () => {
        if (selectedContainersAll) {
            setSelectedContainers([]);
        } else {
            setSelectedContainers(containerDataServiceWise);
        }
        setSelectedContainersAll(!selectedContainersAll);
    };

    const handleRowCheckboxChangeContainer = (index) => {
        const selectedItemPartyOrCHA = containerDataServiceWise[index];

        if (selectedItemPartyOrCHA) {
            let selectedIndex;

            if (selectedInvoiceType === 'Export Cargo') {
                selectedIndex = selectedContainers.findIndex((item) => item.lineNo === selectedItemPartyOrCHA.lineNo);
            } else {
                selectedIndex = selectedContainers.findIndex((item) => item.lineNo === selectedItemPartyOrCHA.lineNo);
            }

            if (selectedIndex !== -1) {
                // Remove the item from the selected items
                const updatedSelectedItems = [...selectedContainers];
                updatedSelectedItems.splice(selectedIndex, 1);
                setSelectedContainers(updatedSelectedItems);
            } else {
                // Add the item to the selected items
                setSelectedContainers([...selectedContainers, selectedItemPartyOrCHA]);
            }
        }
    };



    // PAYMENT DETAIL...

    // payment details
    const [tdsDeductee, setTdsDeductee] = useState('');
    const [tanNo, setTanNo] = useState('');
    const [tdsPerc, setTdsPerc] = useState('');
    const [beforeTax, setBeforeTax] = useState('');
    const [invoiceAmt, setInvoiceAmt] = useState('');
    const [receiptAmt, setReceiptAmt] = useState('');
    const [balanceAmt, setBalanceAmt] = useState('');


    const initialPaymentMode = {
        payMode: '',
        chequeNo: '',
        chequeDate: null,
        bankDetails: '',
        amount: '',
        status: ''
    }

    const [paymentMode, setPaymentMode] = useState([initialPaymentMode]);

    const handleTdsDeductee = (e) => {
        setTdsDeductee(e.target.value);

        if (e.target.value === 'CHA') {
            getTds(assessmentSheet.cha);
        }
        else if (e.target.value === 'EXP') {
            getTds(assessmentSheet.importerId);
        }
        else if (e.target.value === 'FWR') {
            getTds(assessmentSheet.onAccountOf);
        }
        else if (e.target.value === 'OTH') {
            getTds(assessmentSheet.othPartyId);
        }
        else {
            setTdsPerc("");
        }
    }

    const getTds = async (val) => {
        if (val === '') {
            setTdsPerc("");
            return;
        }

        try {
            const response = await FinanceService.getPartyTdsPercentage(companyid, branchId, val, jwtToken);

            if (response.data[1] !== null && response.data[1] !== "") {
                setTdsPerc(response.data[0]);
                setTanNo(response.data[1])
            }
            else {
                setTdsPerc("");
                setTanNo("")
            }

        } catch {
            setTdsPerc("");
            setTanNo("");
        }
    }


    const addPaymentMode = () => {
        setPaymentMode([...paymentMode, {
            payMode: '',
            chequeNo: '',
            chequeDate: null,
            bankDetails: '',
            amount: '',
            status: ''
        }]);
    };

    const removePaymentMode = (index, amount) => {
        setPaymentMode((prevState) => prevState.filter((_, i) => i !== index));
        const roundToThree = (num) => Math.round(num * 1000) / 1000;

        const totalAmount = paymentMode.reduce((total, item, idx) => {
            if (idx !== index) { // Exclude the current row
                const amount = parseFloat(item.amount) || 0;
                return total + amount;
            }
            return total;
        }, 0);
        setBalanceAmt(roundToThree(receiptAmt - totalAmount));
        setInvoiceAmt(roundToThree(invoiceAmt - amount));
    };

    const handlePaymentModeChange = (e, index) => {
        const { name, value } = e.target;
        let sanitizeValue = value;

        if (name === 'amount') {
            sanitizeValue = handleInputChange(value, 13, 2)
        }

        // Function to round values to 3 decimal places
        const roundToThree = (num) => Math.round(num * 1000) / 1000;

        if (name === 'payMode') {
            if (tdsPerc === '') {
                if (tdsPerc === '' && value !== 'TDS') {

                    const totalAmount = paymentMode.reduce((total, item, idx) => {
                        if (idx !== index) { // Exclude the current row
                            const amount = parseFloat(item.amount) || 0;
                            return total + amount;
                        }
                        return total;
                    }, 0);

                    const amt = roundToThree(receiptAmt - totalAmount);

                    setBalanceAmt(roundToThree(balanceAmt - amt) < 0 ? 0 : roundToThree(balanceAmt - amt));
                    setInvoiceAmt(roundToThree(totalAmount + amt));
                    setPaymentMode((prevState) => {
                        const updatedRows = [...prevState];
                        updatedRows[index] = {
                            ...updatedRows[index],
                            amount: amt,
                        };
                        return updatedRows;
                    });
                }
            }
            else {
                const tdsAmt = roundToThree((beforeTax * tdsPerc) / 100);

                if (value !== 'TDS') {
                    const existingValue = paymentMode[index];

                    if ((!existingValue) || (existingValue.amount === '' || existingValue === 0)) {
                        const totalAmount = paymentMode.reduce((total, item, idx) => {
                            if (idx !== index && item.payMode !== 'TDS') { // Exclude the current row
                                const amount = parseFloat(item.amount) || 0;
                                return total + amount;
                            }
                            return total;
                        }, 0);

                        const amt = roundToThree((receiptAmt - totalAmount) - tdsAmt);
                        setBalanceAmt(roundToThree(receiptAmt - (invoiceAmt + amt)));
                        setInvoiceAmt(roundToThree(invoiceAmt + amt));
                        setPaymentMode((prevState) => {
                            const updatedRows = [...prevState];
                            updatedRows[index] = {
                                ...updatedRows[index],
                                amount: amt,
                                chequeNo: '',
                                chequeDate: null,
                            };
                            return updatedRows;
                        });
                    }
                }
                else {

                    const tdsExist = paymentMode.find(item => item.payMode === 'TDS');

                    if (tdsExist) {
                        toast.error("TDS amount already present!!", {
                            autoClose: 800
                        })
                        return;
                    }

                    const totalAmount = paymentMode.reduce((total, item, idx) => {
                        if (idx !== index) { // Exclude the current row
                            const amount = parseFloat(item.amount) || 0;
                            return total + amount;
                        }
                        return total;
                    }, 0);
                    setBalanceAmt(roundToThree((receiptAmt - totalAmount) - tdsAmt));
                    setPaymentMode((prevState) => {
                        const updatedRows = [...prevState];
                        updatedRows[index] = {
                            ...updatedRows[index],
                            amount: tdsAmt,
                            chequeNo: '',
                            chequeDate: null,
                        };
                        return updatedRows;
                    });
                    setInvoiceAmt(roundToThree(invoiceAmt + tdsAmt));
                }
            }
        }

        if (name === 'amount') {
            sanitizeValue = handleInputChange(value, 10, 3);

            if (parseFloat(receiptAmt) < parseFloat(sanitizeValue)) {
                setInvoiceAmt(invoiceAmt); // Retain the current invoice amount
                // Calculate the total of all rows except the current row (index)
                const totalAmount = paymentMode.reduce((total, item, idx) => {
                    if (idx !== index) { // Exclude the current row
                        const amount = parseFloat(item.amount) || 0;
                        return total + amount;
                    }
                    return total;
                }, 0);

                // Add the sanitized value of the current row to the totalAmount
                const newTotalAmount = totalAmount;

                // Set the balance amount by subtracting the totalAmount from receiptAmt
                setBalanceAmt(roundToThree(receiptAmt - newTotalAmount));
                sanitizeValue = ''; // Reset the input value
            }

            else {
                // Calculate totalAmount with proper rounding
                const totalAmount = paymentMode.reduce((total, item, idx) => {
                    const amount = idx === index
                        ? parseFloat(sanitizeValue) || 0
                        : parseFloat(item.amount) || 0;
                    return total + amount;
                }, 0);

                const roundedTotalAmount = roundToThree(totalAmount);

                if (parseFloat(receiptAmt) < roundedTotalAmount) {
                    const totalAmount = paymentMode.reduce((total, item, idx) => {
                        if (idx !== index) { // Exclude the current row
                            const amount = parseFloat(item.amount) || 0;
                            return total + amount;
                        }
                        return total;
                    }, 0);

                    // Add the sanitized value of the current row to the totalAmount
                    const newTotalAmount = totalAmount;

                    // Set the balance amount by subtracting the totalAmount from receiptAmt
                    setBalanceAmt(roundToThree(receiptAmt - newTotalAmount));
                    setInvoiceAmt(roundToThree(newTotalAmount));
                    sanitizeValue = '';
                } else {
                    setInvoiceAmt(roundedTotalAmount);
                    setBalanceAmt(roundToThree(receiptAmt - roundedTotalAmount));
                }
            }
        }

        setPaymentMode((prevState) => {
            const updatedRows = [...prevState];
            updatedRows[index] = {
                ...updatedRows[index],
                [name]: sanitizeValue,
            };
            return updatedRows;
        });
    };

    function handleInputChange(e, val1, val2) {
        const inputValue = e.toString();
        const numericInput = inputValue.replace(/[^0-9.]/g, '');
        const parts = numericInput.split('.');
        const integerPart = parts[0].slice(0, val1);

        let decimalPart = parts[1];

        if (val2 === 0) {
            return integerPart;
        }

        if (decimalPart !== undefined) {
            decimalPart = `.${decimalPart.slice(0, val2)}`;
        }

        const sanitizedInput = decimalPart !== undefined ? `${integerPart}${decimalPart}` : integerPart;
        return sanitizedInput;
    }


    const handleProcess = async () => {

        const formData = {
            assessmentData: assessmentSheet,
            containerData: assessmentData,
            paymentDto: paymentMode,
            tdsDeductee: tdsDeductee,
            tdsPerc: tdsPerc,
        }

        setLoading(true);

        try {
            const response = await FinanceService.processExportAssesmentContainerProForma(companyid, branchId, userId, formData, selectedInvoiceType, assessmentSheet.creditType, jwtToken);

            const { assesmentSheetRec, containerDataRec, sbData, existingSrv, existingSrvFin, tanNo, tdsperc, tdsDeductee, } = response.data;
            setAssessmentSheet(assesmentSheetRec);
            setAssessmentData(containerDataRec);
            setSbCargoData(sbData);

            setTdsDeductee(tdsDeductee);
            setTdsPerc(tdsperc);
            setTanNo(tanNo);
            setBeforeTax(existingSrv.billAmt);
            setInvoiceAmt(existingSrv.invoiceAmt);
            setReceiptAmt(existingSrv.receiptAmt);
            setBalanceAmt(0);


            toast.success('Proforma processed successfully', {
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


    const handleSelectInvoice = (value) => {

        setMainSearch((prev) => {
            const updatedSearch = {
                ...prev,
                invoiceType: value,
                operation: 'SB'
            };
            return updatedSearch;
        });

        if (selectedInvoiceType !== value) {
            handleClear();
        }
        setSelectedInvoiceType(value);
    };



















    const handlePrint1 = async (type) => {

        const invoiceNo = assessmentSheet.invoiceNo;

        const assesmentId = assessmentSheet.assesmentId;

        const sbTransID = assessmentSheet.sbTransId;



        if (selectedInvoiceType === "Export Container") {
            setLoading(true);

            axios.post(`${ipaddress}exportproformaprint/printinvoicepdf/${companyid}/${branchId}/${invoiceNo}/${assesmentId}/${sbTransID}`, {}, {
                headers: {

                    Authorization: `Bearer ${jwtToken}`,
                    "Content-Type": "application/json",
                }
            })
                .then(response => {
                    // console.log('Response:', response.data); // Handle success
                    const pdfBase64 = response.data;
                    const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });
                    const blobUrl = URL.createObjectURL(pdfBlob);
                    window.open(blobUrl, '_blank');
                    setLoading(false);


                })
                .catch(error => {
                    console.error('Error in handlePrint:', error.message);
                    setLoading(false);
                });

        }

        if (selectedInvoiceType === "Export Cargo Carting") {
            console.log("inside the carting function ");
            setLoading(true);

            axios.post(`${ipaddress}exportproformaprint/printinvoicepdfcarting/${companyid}/${branchId}/${invoiceNo}/${assesmentId}/${sbTransID}`, {}, {
                headers: {

                    Authorization: `Bearer ${jwtToken}`,
                    "Content-Type": "application/json",
                }
            })
                .then(response => {
                    // console.log('Response:', response.data); // Handle success
                    const pdfBase64 = response.data;
                    const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });
                    const blobUrl = URL.createObjectURL(pdfBlob);
                    window.open(blobUrl, '_blank');
                    setLoading(false);


                })
                .catch(error => {
                    console.error('Error in handlePrint:', error.message);
                    setLoading(false);
                    //   Handle the error as needed, e.g., show an error toast or message
                    // toast.error(`Error: ${error.message}`, {
                    //       //     position: toast.POSITION.TOP_CENTER,
                    //       //     autoClose: 2000,
                    //       // });
                    //     }
                });




        }
        if (selectedInvoiceType === "Export Cargo") {
            console.log("inside the Back to town  function ");
            setLoading(true);

            axios.post(`${ipaddress}exportproformaprint/printinvoicepdfbackttown/${companyid}/${branchId}/${invoiceNo}/${assesmentId}/${sbTransID}`, {}, {
                headers: {

                    Authorization: `Bearer ${jwtToken}`,
                    "Content-Type": "application/json",
                }
            })
                .then(response => {
                    // console.log('Response:', response.data); // Handle success
                    const pdfBase64 = response.data;
                    const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });
                    const blobUrl = URL.createObjectURL(pdfBlob);
                    window.open(blobUrl, '_blank');
                    setLoading(false);


                })
                .catch(error => {
                    console.error('Error in handlePrint:', error.message);
                    setLoading(false);
                    //   Handle the error as needed, e.g., show an error toast or message
                    // toast.error(`Error: ${error.message}`, {
                    //       //     position: toast.POSITION.TOP_CENTER,
                    //       //     autoClose: 2000,
                    //       // });
                    //     }
                });

        }

    }






    // const handlePrint1 = async (type) => {

    //     const invoiceNo = assessmentSheet.invoiceNo;

    //     const assesmentId = assessmentSheet.assesmentId;

    //     const sbTransID = assessmentSheet.sbTransId;



    //     if (selectedInvoiceType === "Export Container") {
    //         setLoading(true);

    //         axios.post(`${ipaddress}exportinvoiceprint/printinvoicepdf/${companyid}/${branchId}/${invoiceNo}/${assesmentId}/${sbTransID}`, {}, {
    //             headers: {

    //                 Authorization: `Bearer ${jwtToken}`,
    //                 "Content-Type": "application/json",
    //             }
    //         })
    //             .then(response => {
    //                 // console.log('Response:', response.data); // Handle success
    //                 const pdfBase64 = response.data;
    //                 const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });
    //                 const blobUrl = URL.createObjectURL(pdfBlob);
    //                 window.open(blobUrl, '_blank');
    //                 setLoading(false);


    //             })
    //             .catch(error => {
    //                 console.error('Error in handlePrint:', error.message);
    //                 setLoading(false);
    //             });

    //     }

    //     if (selectedInvoiceType === "Export Cargo Carting") {
    //         console.log("inside the carting function ");
    //         setLoading(true);

    //         axios.post(`${ipaddress}exportinvoiceprint/printinvoicepdfcarting/${companyid}/${branchId}/${invoiceNo}/${assesmentId}/${sbTransID}`, {}, {
    //             headers: {

    //                 Authorization: `Bearer ${jwtToken}`,
    //                 "Content-Type": "application/json",
    //             }
    //         })
    //             .then(response => {
    //                 // console.log('Response:', response.data); // Handle success
    //                 const pdfBase64 = response.data;
    //                 const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });
    //                 const blobUrl = URL.createObjectURL(pdfBlob);
    //                 window.open(blobUrl, '_blank');
    //                 setLoading(false);


    //             })
    //             .catch(error => {
    //                 console.error('Error in handlePrint:', error.message);
    //                 setLoading(false);
    //                 //   Handle the error as needed, e.g., show an error toast or message
    //                 // toast.error(`Error: ${error.message}`, {
    //                 //       //     position: toast.POSITION.TOP_CENTER,
    //                 //       //     autoClose: 2000,
    //                 //       // });
    //                 //     }
    //             });




    //     }
    //     if (selectedInvoiceType === "Export Cargo") {
    //         console.log("inside the Back to town  function ");
    //         setLoading(true);

    //         axios.post(`${ipaddress}exportinvoiceprint/printinvoicepdfbackttown/${companyid}/${branchId}/${invoiceNo}/${assesmentId}/${sbTransID}`, {}, {
    //             headers: {

    //                 Authorization: `Bearer ${jwtToken}`,
    //                 "Content-Type": "application/json",
    //             }
    //         })
    //             .then(response => {
    //                 // console.log('Response:', response.data); // Handle success
    //                 const pdfBase64 = response.data;
    //                 const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });
    //                 const blobUrl = URL.createObjectURL(pdfBlob);
    //                 window.open(blobUrl, '_blank');
    //                 setLoading(false);


    //             })
    //             .catch(error => {
    //                 console.error('Error in handlePrint:', error.message);
    //                 setLoading(false);
    //                 //   Handle the error as needed, e.g., show an error toast or message
    //                 // toast.error(`Error: ${error.message}`, {
    //                 //       //     position: toast.POSITION.TOP_CENTER,
    //                 //       //     autoClose: 2000,
    //                 //       // });
    //                 //     }
    //             });

    //     }

    // }















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

            <div className='page'>

                {/* {selectedInvoiceType === '' && ( */}
                <div className='mainPAge'>
                    <Row>
                        {/* <Col md={3}>
                                <FormGroup>
                                    <label className="forlabel" for="HazardousHazardous">Select Invoice Type</label>
                                    <Input
                                        type="select"
                                        name="operation"
                                        className={`form-control`}
                                        value={selectedInvoiceType}
                                        onChange={(e) => setSelectedInvoiceType(e.target.value)}
                                    >
                                        <option value="">Select</option>
                                        <option value="Export Carting">Export Carting</option>
                                        <option value="Export Cargo Storage">Export Cargo Storage</option>
                                        <option value="Export Container">Export Container</option>
                                        <option value="Second Export Container">Second Export Container</option>
                                        <option value="Export BackToTown">Export BackToTown</option>
                                        <option value="Export BackToTown Container">Export BackToTown Container</option>
                                    </Input>
                                </FormGroup>
                            </Col> */}





                        <Col md={6}>
                            <div className="container2">
                                <div className="radio-tile-group2">
                                    <div className="input-container">
                                        <input
                                            id="noc"
                                            className="radio-button"
                                            type="radio"
                                            name="radio"
                                            value="noc"
                                            checked={selectedInvoiceType === "Export Container"}
                                            onChange={() => handleSelectInvoice("Export Container")}
                                        />
                                        <div className="radio-tile">
                                            <div className="icon walk-icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-box-seam" viewBox="0 0 16 16">
                                                    <path d="M4.982 0a.5.5 0 0 0-.374.166L0 5h16L11.392.166a.5.5 0 0 0-.374-.166H4.982zM16 6H0v7a1 1 0 0 0 .553.894l7 3.5a1 1 0 0 0 .894 0l7-3.5A1 1 0 0 0 16 13V6z" />
                                                </svg>
                                                <label htmlFor="noc" className="radio-tile-label">
                                                    Container
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="input-container">
                                        <input
                                            id="exbond"
                                            className="radio-button"
                                            type="radio"
                                            name="radio"
                                            value="exbond"
                                            checked={selectedInvoiceType === "Export Cargo Carting"}
                                            onChange={() => handleSelectInvoice("Export Cargo Carting")}
                                        />
                                        <div className="radio-tile">
                                            <div className="icon bike-icon">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="48"
                                                    height="48"
                                                    fill="currentColor"
                                                    className="bi bi-truck"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5zm1.294 7.456A2 2 0 0 1 4.732 11h5.536a2 2 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456M12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2" />
                                                </svg>
                                                <label htmlFor="exbond" className="radio-tile-label">
                                                    Carting
                                                </label>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="input-container">
                                        <input
                                            id="exbond"
                                            className="radio-button"
                                            type="radio"
                                            name="radio"
                                            value="exbond"
                                            checked={selectedInvoiceType === "Export Cargo"}
                                            onChange={() => handleSelectInvoice("Export Cargo")}
                                        />
                                        <div className="radio-tile">
                                            <div className="icon bike-icon">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="48"
                                                    height="48"
                                                    fill="currentColor"
                                                    className="bi bi-truck"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5zm1.294 7.456A2 2 0 0 1 4.732 11h5.536a2 2 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456M12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2" />
                                                </svg>
                                                <label htmlFor="exbond" className="radio-tile-label">
                                                    Back To Town
                                                </label>
                                            </div>
                                        </div>
                                    </div>



                                </div>
                            </div>
                        </Col>



                        {selectedInvoiceType === 'Export Container' && (
                            <Col md={3}>
                                <FormGroup>
                                    <label className="forlabel" for="HazardousHazardous">Search Type</label>
                                    <Input
                                        type="select"
                                        name="operation"
                                        className={`form-control`}
                                        value={mainSearch.operation}
                                        onChange={handleMainSearchChange}
                                        disabled={assessmentSheet.assesmentId}
                                    >
                                        <option value="sb">SBWise</option>
                                        <option value="container">ContainerWise</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                        )}




                        <Col md={3}>
                            <FormGroup>
                                <FormGroup>
                                    <label
                                        className="forlabel bold-label"
                                        htmlFor="container"
                                    >
                                        {mainSearch.operation === 'container' ? 'Container No' : 'SB No'} <span className="error-message">*</span>
                                    </label>

                                    <Select
                                        options={sbOrContainerData}
                                        value={selectedSbOrContainer}
                                        onInputChange={(inputValue, { action }) => {
                                            if (action === 'input-change') {
                                                searchSBNoOrContainerNo(inputValue);
                                            }
                                        }}
                                        onChange={handleSelectSbOrContainer}
                                        isDisabled={assessmentSheet.assesmentId}
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



                    </Row>
                </div>
                {/* )} */}

                {/* {selectedInvoiceType === 'Export Container' && ( */}
                <div className='container'>

                    <hr style={{ margin: 0, padding: 0 }} />

                    <Row className='mt-1'>
                        <Col md={2}>
                            <Row>
                                <Col md={9}>
                                    <FormGroup>
                                        <label
                                            className="forlabel bold-label"
                                            htmlFor="sbRequestId"
                                        >
                                            Assesment Id
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="service"
                                            maxLength={15}
                                            name="assesmentId"
                                            readOnly
                                            value={assessmentSheet.assesmentId}
                                            disabled
                                        />
                                    </FormGroup>
                                </Col>

                                <Col md={3} className="d-flex justify-content-end" style={{ marginTop: 21 }}>
                                    <button
                                        className="btn btn-outline-primary btn-margin newButton"
                                        style={{ height: 31, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                        id="submitbtn2"
                                        onClick={handleOpenAssessmentSheetSearch}
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
                                    Assesment Date
                                </label>
                                <div style={{ position: "relative" }}>
                                    <DatePicker
                                        selected={assessmentSheet.assesmentDate}
                                        name="rotationDate"
                                        placeholderText="Assesment Date"
                                        // onChange={(date) => handlePaymentDateChangeHeader(date, 'assesmentDate')}
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
                                    htmlFor="sbRequestId"
                                >
                                    SB Trans Id
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="service"
                                    maxLength={15}
                                    name="assesmentId"
                                    readOnly
                                    value={assessmentSheet.sbTransId}
                                    tabIndex={-1}
                                />
                            </FormGroup>
                        </Col>

                        <Col md={2}>
                            <FormGroup>
                                <label
                                    className="forlabel bold-label"
                                    htmlFor="sbRequestId"
                                >
                                    SB Date
                                </label>
                                <div style={{ position: "relative" }}>
                                    <DatePicker
                                        selected={assessmentSheet.sbDate}
                                        name="rotationDate"
                                        placeholderText="SB Date"
                                        // onChange={(date) => handlePaymentDateChangeHeader(date, 'assesmentDate')}
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
                                    readOnly
                                    name="status"
                                    value={assessmentSheet.status === 'A' ? 'Approved' : assessmentSheet.status === 'N' ? 'New' : ''}
                                    tabIndex={-1}
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
                                    {/* <span className="error-message"></span> */}
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="service"
                                    readOnly
                                    maxLength={15}
                                    name="viaNo"
                                    value={assessmentSheet.createdBy}
                                    tabIndex={-1}
                                />
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>

                        <Col md={2}>
                            <FormGroup>
                                <label
                                    className="forlabel bold-label"
                                    htmlFor="sbRequestId"
                                >
                                    Profitcentre
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        className={`form-control`}
                                        type="text"
                                        maxLength={15}
                                        name="profitcentreName"
                                        value={assessmentSheet.profitcentreName}
                                        readOnly
                                        id={'service'}
                                        disabled
                                    />
                                </div>
                            </FormGroup>
                        </Col>


                        <Col md={2}>
                            <FormGroup>
                                <label
                                    className="forlabel bold-label"
                                    htmlFor="gateNo"
                                >
                                    Bill Party
                                </label>
                                <Input
                                    type="select"
                                    name="billingParty"
                                    className={`form-control ${errors.billingParty ? 'service' : ''}`}
                                    value={assessmentSheet.billingParty}
                                    onChange={(e) => handleFieldChange(e, 'billingParty')}
                                    disabled={assessmentSheet.assesmentId}
                                    id={assessmentSheet.assesmentId ? 'service' : ''}
                                >
                                    <option value="">Select</option>
                                    <option value="CHA">CHA-Billing</option>
                                    <option value="EXP">Exporter-Billing</option>
                                    <option value="FWR">Forwarder-Billing</option>
                                    <option value="OTH">Account-Billing</option>
                                </Input>
                            </FormGroup>
                        </Col>

                        <Col md={2}>
                            <FormGroup>
                                <label
                                    className="forlabel bold-label"
                                    htmlFor="sbRequestId"
                                >
                                    Commodity
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        className={`form-control`}
                                        type="text"
                                        maxLength={15}
                                        name="commodityDescription"
                                        value={assessmentSheet.commodityDescription}
                                        readOnly
                                        id='service'
                                        disabled
                                    />
                                </div>
                            </FormGroup>
                        </Col>

                        <Col md={2}>
                            <FormGroup>
                                <label
                                    className="forlabel bold-label"
                                    htmlFor="sbRequestId"
                                >
                                    Carting Date
                                </label>
                                <div style={{ position: "relative" }}>
                                    <DatePicker
                                        selected={assessmentSheet.minCartingTransDate}
                                        name="minCartingTransDate"
                                        placeholderText="Carting Date"
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


                    </Row>
                    <Row>
                        <Col md={2}>
                            <FormGroup>
                                <label
                                    className="forlabel bold-label"
                                    htmlFor="sbRequestId"
                                >
                                    Exporter Name
                                </label>

                                <Select
                                    options={exporterData}
                                    value={selectedExporter}
                                    onInputChange={(inputValue, { action }) => {
                                        if (action === 'input-change') {
                                            searchExporter(inputValue, 'exp');
                                        }
                                    }}
                                    onChange={(selectedOption) => handleSelectChange(selectedOption, 'exp')}
                                    isClearable
                                    id={assessmentSheet.assesmentId ? 'service' : ''}
                                    isDisabled={assessmentSheet.assesmentId}
                                    components={{ Option: CustomOption }}
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
                        </Col>


                        <Col md={2}>
                            <FormGroup>
                                <label
                                    className="forlabel bold-label"
                                    htmlFor="sbRequestId"
                                >
                                    EXP Address
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        className={`form-control`}
                                        type="text"
                                        maxLength={15}
                                        name="stuffTallyWoTransId"
                                        value={assessmentSheet.expAddress}
                                        readOnly
                                        id={'service'}
                                        disabled
                                    />
                                </div>
                            </FormGroup>
                        </Col>


                        <Col md={2}>
                            <FormGroup>
                                <label
                                    className="forlabel bold-label"
                                    htmlFor="sbRequestId"
                                >
                                    EXP GST No
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        className={`form-control`}
                                        type="text"
                                        maxLength={15}
                                        name="impGst"
                                        value={assessmentSheet.expGst}
                                        readOnly
                                        id='service'
                                        disabled
                                    />
                                </div>
                            </FormGroup>
                        </Col>




                        <Col md={2}>
                            <FormGroup>
                                <label
                                    className="forlabel bold-label"
                                    htmlFor="sbRequestId"
                                >
                                    Account Holder
                                </label>

                                <Select
                                    options={agentData}
                                    value={selectedAgent}
                                    onInputChange={(inputValue, { action }) => {
                                        if (action === 'input-change') {
                                            searchExporter(inputValue, 'agent');
                                        }
                                    }}
                                    onChange={(selectedOption) => handleSelectChange(selectedOption, 'agent')}
                                    isClearable
                                    components={{ Option: CustomOption }}
                                    id={assessmentSheet.assesmentId ? 'service' : ''}
                                    isDisabled={assessmentSheet.assesmentId}
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
                        </Col>

                        <Col md={2}>
                            <FormGroup>
                                <label
                                    className="forlabel bold-label"
                                    htmlFor="sbRequestId"
                                >
                                    Account Address
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        className={`form-control`}
                                        type="text"
                                        maxLength={15}
                                        name="stuffTallyWoTransId"
                                        value={assessmentSheet.accAddress}
                                        readOnly
                                        id={'service'}
                                        disabled
                                    />
                                </div>
                            </FormGroup>
                        </Col>


                        <Col md={2}>
                            <FormGroup>
                                <label
                                    className="forlabel bold-label"
                                    htmlFor="sbRequestId"
                                >
                                    Account GST No
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        className={`form-control`}
                                        type="text"
                                        maxLength={15}
                                        name="impGst"
                                        value={assessmentSheet.accHolderGst}
                                        readOnly
                                        id='service'
                                        disabled
                                    />
                                </div>
                            </FormGroup>
                        </Col>



                    </Row>




                    <Row>
                        <Col md={2}>
                            <FormGroup>
                                <label
                                    className="forlabel bold-label"
                                    htmlFor="sbRequestId"
                                >
                                    CHA
                                </label>

                                <Select
                                    options={chaData}
                                    value={selectedCha}
                                    onInputChange={(inputValue, { action }) => {
                                        if (action === 'input-change') {
                                            searchExporter(inputValue, 'cha');
                                        }
                                    }}
                                    onChange={(selectedOption) => handleSelectChange(selectedOption, 'cha')}
                                    isClearable
                                    components={{ Option: CustomOption }}
                                    id={assessmentSheet.assesmentId ? 'service' : ''}
                                    isDisabled={assessmentSheet.assesmentId}
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
                        </Col>


                        <Col md={2}>
                            <FormGroup>
                                <label
                                    className="forlabel bold-label"
                                    htmlFor="sbRequestId"
                                >
                                    CHA Address
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        className={`form-control`}
                                        type="text"
                                        maxLength={15}
                                        name="stuffTallyWoTransId"
                                        value={assessmentSheet.chaAddress}
                                        readOnly
                                        id={'service'}
                                        disabled
                                    />
                                </div>
                            </FormGroup>
                        </Col>


                        <Col md={2}>
                            <FormGroup>
                                <label
                                    className="forlabel bold-label"
                                    htmlFor="sbRequestId"
                                >
                                    CHA GST No
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        className={`form-control`}
                                        type="text"
                                        maxLength={15}
                                        name="impGst"
                                        value={assessmentSheet.chaGst}
                                        readOnly
                                        id='service'
                                        disabled
                                    />
                                </div>
                            </FormGroup>
                        </Col>






                        <Col md={2}>
                            <FormGroup>
                                <label
                                    className="forlabel bold-label"
                                    htmlFor="sbRequestId"
                                >
                                    Forwarder
                                </label>

                                <Select
                                    options={forwarderData}
                                    value={selectedForwarder}
                                    onInputChange={(inputValue, { action }) => {
                                        if (action === 'input-change') {
                                            searchExporter(inputValue, 'forwarder');
                                        }
                                    }}
                                    onChange={(selectedOption) => handleSelectChange(selectedOption, 'forwarder')}
                                    isClearable
                                    components={{ Option: CustomOption }}
                                    id={assessmentSheet.assesmentId ? 'service' : ''}
                                    isDisabled={assessmentSheet.assesmentId}
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
                        </Col>












                        <Col md={2}>
                            <FormGroup>
                                <label
                                    className="forlabel bold-label"
                                    htmlFor="sbRequestId"
                                >
                                    Forwarder Address
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        className={`form-control`}
                                        type="text"
                                        maxLength={15}
                                        name="stuffTallyWoTransId"
                                        value={assessmentSheet.fwdAddress}
                                        readOnly
                                        id={'service'}
                                        disabled
                                    />
                                </div>
                            </FormGroup>
                        </Col>


                        <Col md={2}>
                            <FormGroup>
                                <label
                                    className="forlabel bold-label"
                                    htmlFor="sbRequestId"
                                >
                                    Forwarder GST No
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        className={`form-control`}
                                        type="text"
                                        maxLength={15}
                                        name="impGst"
                                        value={assessmentSheet.fwdGst}
                                        readOnly
                                        id='service'
                                        disabled
                                    />
                                </div>
                            </FormGroup>
                        </Col>
                    </Row>



                    <Row>
                        <Col md={2}>
                            <FormGroup>
                                <label
                                    className="forlabel bold-label"
                                    htmlFor="sbRequestId"
                                >
                                    Invoice No
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        className={`form-control`}
                                        type="text"
                                        maxLength={15}
                                        name="invoiceNo"
                                        value={assessmentSheet.invoiceNo}
                                        readOnly
                                        id='service'
                                        disabled
                                    />
                                </div>
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
                                        selected={assessmentSheet.invoiceDate}
                                        name="rotationDate"
                                        placeholderText="Invoice Date"
                                        dateFormat="dd/MM/yyyy"
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

                            <Row>


                                <Col md={6}>
                                    <FormGroup>
                                        <label
                                            className="forlabel bold-label"
                                            htmlFor="sbRequestId"
                                        >
                                            Tax
                                        </label>
                                        <Input
                                            type="select"
                                            name="billingParty"
                                            className={`form-control ${errors.taxApplicable ? 'service' : ''}`}
                                            value={assessmentSheet.taxApplicable}
                                            onChange={(e) => handleFieldChange(e, 'taxApplicable')}
                                            style={{ flex: "1 1 0", minWidth: "0", marginRight: "5px" }}
                                            disabled={assessmentSheet.assesmentId}
                                            id={assessmentSheet.assesmentId ? 'service' : ''}
                                        >
                                            <option value="Y">Yes</option>
                                            <option value="N">No</option>

                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <label
                                            className="forlabel bold-label"
                                            htmlFor="sbRequestId"
                                        >
                                            Sez
                                        </label>
                                        <Input
                                            type="select"
                                            name="sez"
                                            className={`form-control ${errors.sez ? 'service' : ''}`}
                                            value={assessmentSheet.sez}
                                            onChange={(e) => handleFieldChange(e, 'sez')}
                                            style={{ flex: "1 1 0", minWidth: "0" }}
                                            disabled={assessmentSheet.assesmentId}
                                            id={assessmentSheet.assesmentId ? 'service' : ''}
                                        >
                                            <option value="N">No</option>
                                            <option value="Y">Yes</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                            </Row>

                        </Col>

                        <Col md={2}>
                            <FormGroup>
                                <label
                                    className="forlabel bold-label"
                                    htmlFor="commodityCode"
                                >
                                    Agri / Non Agri
                                </label>
                                <Input
                                    type="select"
                                    value={assessmentSheet.commodityCode}
                                    className={`form-control ${errors.commodityCode ? 'error-border' : ''}`}
                                    onChange={(e) => handleFieldChange(e, 'commodityCode')}
                                    disabled={assessmentSheet.assesmentId}
                                    id={assessmentSheet.assesmentId ? 'service' : ''}
                                >
                                    <option value="">---Commodity---</option>
                                    {commodity.map((type, idx) => (
                                        <option key={idx} value={type.value}>
                                            {type.label}
                                        </option>
                                    ))}
                                </Input>

                            </FormGroup>
                        </Col>



                        <Col md={2}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="terminalInputs">
                                    Credit Type
                                </label>
                                <Input
                                    type="select"
                                    name="creditType"
                                    className={`form-control`}
                                    value={assessmentSheet.creditType}
                                    onChange={(e) => handleFieldChange(e, 'creditType')}
                                    style={{ flex: "1 1 0", minWidth: "0", marginRight: "5px" }}
                                    disabled
                                    id={assessmentSheet.assesmentId ? 'service' : ''}
                                >
                                    {/* <option value="N">Cash</option> */}
                                    <option value="Y">Credit</option>
                                    {/* <option value="P">PDA</option> */}
                                </Input>
                            </FormGroup>
                        </Col>


                        <Col md={2}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="terminalInputs">
                                    Invoice Category
                                </label>
                                <Input
                                    type="select"
                                    name="billType"
                                    className={`form-control`}
                                    value={assessmentSheet.invoiceCategory}
                                    onChange={(e) => handleFieldChange(e, 'invoiceCategory')}
                                    style={{ flex: "1 1 0", minWidth: "0", marginRight: "5px" }}
                                    disabled={assessmentSheet.assesmentId}
                                    id={assessmentSheet.assesmentId ? 'service' : ''}
                                >
                                    <option value="SINGLE">All(Single Bill)</option>
                                    <option value="STORAGE">Storage</option>
                                    <option value="HANDLING">Handling</option>                                 </Input>
                            </FormGroup>
                        </Col>

                        <Col md={2}>
                            <FormGroup>
                                <label
                                    className="forlabel bold-label"
                                    htmlFor="sbRequestId"
                                >
                                    IRN
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        className={`form-control`}
                                        type="text"
                                        maxLength={15}
                                        name="irn"
                                        value={assessmentSheet.irn}
                                        readOnly
                                        id='service'
                                        disabled
                                    />
                                </div>
                            </FormGroup>
                        </Col>


                        <Col md={2}>
                            <FormGroup>
                                <label
                                    className="forlabel bold-label"
                                    htmlFor="sbRequestId"
                                >
                                    Receipt No
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        className={`form-control`}
                                        type="text"
                                        maxLength={15}
                                        name="receiptNo"
                                        value={assessmentSheet.receiptNo}
                                        readOnly
                                        id='service'
                                        disabled
                                    />
                                </div>
                            </FormGroup>
                        </Col>

                        <Col md={2}>


                            <FormGroup>
                                <label
                                    className="forlabel bold-label"
                                    htmlFor="sbRequestId"
                                >
                                    Credit Allowed.
                                </label>
                                <div className="d-flex flex-wrap">
                                    <input
                                        className="form-control me-1" // Slight margin added to the right for spacing
                                        style={{ flex: "1 1 0", minWidth: "0" }} // Ensure flexibility for both inputs
                                        type="text"
                                        id="service"
                                        readOnly
                                        maxLength={15}
                                        name="creditAllowed"
                                        value={assessmentSheet.creditAllowed}
                                        tabIndex={-1}
                                        disabled
                                    />
                                    <input
                                        className="form-control"
                                        style={{ flex: "1 1 0", minWidth: "0" }} // Ensure flexibility for both inputs
                                        type="text"
                                        id="service"
                                        readOnly
                                        maxLength={15}
                                        name="pendingCredit"
                                        value={assessmentSheet.pendingCredit}
                                        tabIndex={-1}
                                        disabled
                                    />
                                </div>
                            </FormGroup>
                        </Col>


                        <Col md={2}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="terminalInputs">
                                    Print Remarks
                                </label>
                                <Input
                                    type="text"
                                    name="comments"
                                    className={`form-control`}
                                    value={assessmentSheet.comments}
                                    onChange={(e) => handleFieldChange(e, 'comments')}
                                    style={{ flex: "1 1 0", minWidth: "0", marginRight: "5px" }}
                                    maxLength={250}
                                    readOnly={assessmentSheet.invoiceNo}
                                    id={assessmentSheet.invoiceNo ? 'service' : ''}

                                >
                                </Input>
                            </FormGroup>
                        </Col>


                        <Col md={2}>
                            <FormGroup>
                                <label
                                    className="forlabel bold-label"
                                    htmlFor="sbRequestId"
                                >
                                    Internal Remarks
                                </label>
                                <textarea
                                    className="form-control"
                                    name='intComments'
                                    value={assessmentSheet.intComments}
                                    onChange={(e) => handleFieldChange(e, 'intComments')}
                                    maxLength={250}
                                    rows={2}
                                    readOnly={assessmentSheet.invoiceNo}
                                    id={assessmentSheet.invoiceNo ? 'service' : ''}
                                ></textarea>
                            </FormGroup>
                        </Col>
                        {(assessmentSheet.creditType === "P" && assessmentSheet.assesmentId !== "") && (
                            <Col md={2}>
                                <FormGroup>
                                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                                        Advance Amount
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="advanceAmount"
                                        name='advanceAmount'
                                        value={assessmentSheet.advanceAmount}
                                        disabled
                                    />

                                </FormGroup>
                            </Col>
                        )}




                    </Row>


                    <Row className="text-center mt-1 mb-2 justify-content-center">
                        <Col xs="auto" className="d-flex justify-content-center align-items-center">
                            <button
                                className="btn btn-outline-primary btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                onClick={() => handleSave(assessmentSheet, assessmentData)}
                                disabled={assessmentSheet.invoiceNo || loading}
                            >
                                <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
                                Save
                            </button>
                            <button
                                className="btn btn-outline-success btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                onClick={handleProcess}
                                disabled={assessmentSheet.invoiceNo || !assessmentSheet.assesmentId || loading}
                            >
                                <FontAwesomeIcon icon={faSpinner} style={{ marginRight: "5px" }} />
                                Process
                            </button>
                            <button
                                className="btn btn-outline-danger btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                onClick={() => handleClear('main')}
                            >
                                <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
                                Clear
                            </button>


                            {selectedInvoiceType !== 'Export Cargo Carting' && (
                                <button
                                    className="btn btn-outline-success btn-margin newButton"
                                    style={{ marginRight: 10 }}
                                    id="submitbtn2"
                                    disabled={assessmentSheet.invoiceNo || !assessmentSheet.assesmentId}
                                    onClick={openModelForAddServiceServiceWise}
                                >
                                    <FontAwesomeIcon icon={faPlus} style={{ marginRight: "5px" }} />
                                    Add Service
                                </button>
                            )}


                            {assessmentSheet.invoiceNo && (
                                <div className="dropdown">
                                    <button
                                        className="btn btn-outline-primary dropdown-toggle btn-margin newButton"
                                        style={{
                                            marginRight: 10,
                                            fontSize: 13,
                                            display: "inline-block",
                                            height: "100%", // Match other buttons' height
                                        }}
                                        type="button"
                                        id="reportsDropdown"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        Reports
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="reportsDropdown">
                                        <li>
                                            <button
                                                className="dropdown-item"
                                                onClick={handleModelOPenForPrintInvoice}
                                            >
                                                <FontAwesomeIcon icon={faPrint} style={{ marginRight: "5px" }} />
                                                Proforma Report
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                className="dropdown-item"
                                                onClick={(e) => downLoadReport('xls')}
                                            >
                                                <FontAwesomeIcon icon={faFileExcel} style={{ marginRight: "5px" }} />
                                                Proforma xls Report
                                            </button>
                                        </li>
                                    </ul>
                                </div>

                            )}


                        </Col>
                    </Row>


                    {assessmentData && assessmentData.length > 0 && selectedInvoiceType === 'Export Container' && (

                        <div className='assessmentContainer mt-2'>
                            <>

                                <div style={{ fontWeight: 800, fontSize: 20, marginTop: 10 }}>
                                    <span>Invoice Assesment Sheet Export Container</span>
                                </div>
                                <hr style={{ margin: 4 }} />



                                <div className="table-responsive mt-1" style={{ maxHeight: "400px", overflowY: "auto" }}>
                                    <Table className="table table-bordered" style={{ border: '2px solid black' }}>
                                        <thead>
                                            <tr>
                                                <th scope="col" className="text-center" style={{ color: "black" }}>
                                                    Sr No
                                                </th>
                                                <th scope="col" className="text-center" style={{ color: "black", width: "100px" }}>
                                                    Container No
                                                </th>
                                                <th scope="col" className="text-center" style={{ color: "black" }}>
                                                    Size / Type
                                                </th>
                                                <th scope="col" className="text-center" style={{ color: "black" }}>
                                                    Gate In
                                                </th>
                                                <th scope="col" className="text-center" style={{ color: "black" }}>
                                                    Stuff tally Date
                                                </th>
                                                <th scope="col" className="text-center" style={{ color: "black" }}>
                                                    Movement Req Date
                                                </th>
                                                <th scope="col" className="text-center" style={{ color: "black" }}>
                                                    Gate Out Date
                                                </th>

                                                <th scope="col" className="text-center" style={{ color: "black" }}>
                                                    <Input
                                                        className="form-control"
                                                        type="checkbox"
                                                        id="checkInvDate1"
                                                        name='checkInvDate1'
                                                        value={checkInvDate1}
                                                        disabled={checkInvDate === 'Y' || assessmentSheet.assesmentId !== ''}
                                                        onChange={handleCurrentDateCheckBox}
                                                        checked={checkInvDate1 === 'Y'}
                                                        style={{ height: 25, marginLeft: 8, paddingBottom: 15 }}
                                                    />
                                                </th>

                                                <th scope="col" className="text-center" style={{ color: "black" }}>
                                                    Invoice Date
                                                </th>

                                                {assessmentSheet.assesmentId !== '' && (
                                                    <>
                                                        <th scope="col" className="text-center" style={{ color: "black" }}>
                                                            Service Name
                                                        </th>
                                                        <th scope="col" className="text-center" style={{ color: "black" }}>
                                                            Amount
                                                        </th>
                                                    </>)}

                                                {assessmentSheet?.assesmentId && !assessmentSheet?.invoiceNo && (
                                                    <>
                                                        <th scope="col" className="text-center" style={{ color: "black" }}>
                                                            Action
                                                        </th>
                                                    </>)}
                                            </tr>




                                            <tr>
                                                <th scope="col" className="text-center" style={{ color: "black" }}>

                                                </th>
                                                <th scope="col" className="text-center" style={{ color: "black" }}>

                                                </th>
                                                <th scope="col" className="text-center" style={{ color: "black" }}>

                                                </th>
                                                <th scope="col" className="text-center" style={{ color: "black" }}>

                                                </th>
                                                <th scope="col" className="text-center" style={{ color: "black" }}>

                                                </th>
                                                <th scope="col" className="text-center" style={{ color: "black" }}>

                                                </th>
                                                <th scope="col" className="text-center" style={{ color: "black" }}>

                                                </th>
                                                <th scope="col" className="text-center" style={{ color: "black" }}>
                                                    <Input
                                                        className="form-control"
                                                        type="checkbox"
                                                        id="checkInvDate"
                                                        name='checkInvDate'
                                                        value={checkInvDate}
                                                        disabled={checkInvDate1 === 'Y' || assessmentSheet.assesmentId !== ''}
                                                        onChange={handleSelectedDateCheckBox}
                                                        checked={checkInvDate === 'Y'}
                                                        style={{ height: 25, marginLeft: 8, paddingBottom: 15 }}
                                                    />
                                                </th>
                                                <th scope="col" className="text-center" style={{ color: "black" }}>


                                                    <DatePicker
                                                        selected={invDate}
                                                        onChange={handleInvDate}
                                                        id="invDate"
                                                        name="invDate"
                                                        dateFormat="dd/MM/yyyy HH:mm"
                                                        showTimeInput
                                                        disabled={assessmentSheet.assesmentId !== ""}
                                                        timeFormat="HH:mm"
                                                        timeIntervals={15}
                                                        customInput={
                                                            <CustomInput
                                                                className={`inputwidthTukaMax form-control`}
                                                                onKeyDown={handleInvDate}
                                                                onChange={handleInvDate}
                                                            />
                                                        } />

                                                </th>
                                                {assessmentSheet.assesmentId !== '' && (
                                                    <>
                                                        <th scope="col" className="text-center" style={{ color: "black" }}>

                                                        </th>
                                                        <th scope="col" className="text-center" style={{ color: "black" }}>
                                                            {beforeTax}

                                                        </th>
                                                    </>
                                                )}

                                            </tr>


                                        </thead>
                                        <tbody className='text-center'>

                                            {assessmentData.map((item, index) => (
                                                <tr key={index}>

                                                    <td>{index + 1}</td>
                                                    <td>
                                                        {item.containerNo}
                                                    </td>
                                                    <td>
                                                        {item.containerSize} / {item.containerType}
                                                    </td>
                                                    <td>
                                                        <DatePicker
                                                            selected={item.gateInDate ? new Date(item.gateInDate) : null}
                                                            name="gateInDate"
                                                            id="service"
                                                            dateFormat="dd/MM/yyyy HH:mm"
                                                            showTimeInput
                                                            timeFormat="HH:mm"
                                                            timeIntervals={15}
                                                            disabled
                                                            customInput={
                                                                <CustomInput
                                                                    className={`inputwidthTukaMax form-control`} id='service'
                                                                />
                                                            } />
                                                    </td>


                                                    <td>
                                                        <DatePicker
                                                            selected={item.stuffTallyDate ? new Date(item.stuffTallyDate) : null}
                                                            name="stuffTallyDate"
                                                            id="service"
                                                            dateFormat="dd/MM/yyyy HH:mm"
                                                            showTimeInput
                                                            timeFormat="HH:mm"
                                                            timeIntervals={15}
                                                            disabled
                                                            customInput={
                                                                <CustomInput
                                                                    className={`inputwidthTukaMax form-control`} id='service'
                                                                />
                                                            } />
                                                    </td>


                                                    <td>
                                                        <DatePicker
                                                            selected={item.movementDate ? new Date(item.movementDate) : null}
                                                            id="service"
                                                            name="stuffTallyDate"
                                                            dateFormat="dd/MM/yyyy HH:mm"
                                                            showTimeInput
                                                            timeFormat="HH:mm"
                                                            timeIntervals={15}
                                                            disabled
                                                            customInput={
                                                                <CustomInput
                                                                    className={`inputwidthTukaMax form-control`} id='service'
                                                                />
                                                            } />
                                                    </td>


                                                    <td>
                                                        <DatePicker
                                                            selected={item.gateOutDate ? new Date(item.gateOutDate) : null}
                                                            id="service"
                                                            name="gateOutDate"
                                                            dateFormat="dd/MM/yyyy HH:mm"
                                                            showTimeInput
                                                            timeFormat="HH:mm"
                                                            timeIntervals={15}
                                                            disabled
                                                            customInput={
                                                                <CustomInput
                                                                    className={`inputwidthTukaMax form-control`}
                                                                    id='service'
                                                                />
                                                            } />
                                                    </td>


                                                    <td>
                                                        <Input
                                                            className="form-control"
                                                            type="checkbox"
                                                            id="checkDate"
                                                            name='checkDate'
                                                            disabled={assessmentSheet.assesmentId !== ''}
                                                            checked={item.checkDate === 'Y'}
                                                            onChange={(e) => handleSelectDateCheckBox(e, index, item.invoiceDate)}
                                                            style={{ height: 25, marginLeft: 8, paddingBottom: 15 }}
                                                        />
                                                    </td>

                                                    <td>

                                                        <DatePicker
                                                            selected={item.invoiceDate ? new Date(item.invoiceDate) : null}
                                                            onChange={(date) => handleSelectInvDate(date, index)}
                                                            id="invDate"
                                                            name="invDate"
                                                            dateFormat="dd/MM/yyyy HH:mm"
                                                            showTimeInput
                                                            disabled={assessmentSheet.assesmentId !== ""}
                                                            timeFormat="HH:mm"
                                                            timeIntervals={15}
                                                            customInput={
                                                                <CustomInput
                                                                    className={`inputwidthTukaMax form-control`}
                                                                    onKeyDown={(date) => handleSelectInvDate(date, index)}
                                                                    onChange={(date) => handleSelectInvDate(date, index)}
                                                                    id={assessmentSheet.assesmentId ? 'service' : ''}
                                                                    disabled={assessmentSheet.assesmentId !== ''}
                                                                />
                                                            } />

                                                    </td>
                                                    {assessmentSheet.assesmentId !== '' && (
                                                        <>
                                                            <td>{item.serviceName}</td>
                                                            <td>{item.rates}</td>
                                                        </>
                                                    )}

                                                    {assessmentSheet?.assesmentId && (
                                                        <td>
                                                            <button
                                                                type="button"
                                                                className="btn  btn-outline-primary"
                                                                onClick={(e) => openAddServiceModal(item)}
                                                            ><FontAwesomeIcon icon={faEdit} />
                                                            </button>
                                                        </td>
                                                    )}



                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            </>
                        </div>
                    )}

                    {assessmentData && assessmentData.length > 0 && selectedInvoiceType === 'Export Cargo Carting' && (

                        <div className='assessmentContainer mt-2'>
                            <>

                                <div style={{ fontWeight: 800, fontSize: 20, marginTop: 10 }}>
                                    <span>Invoice Assessment Sheet Export Carting</span>
                                </div>
                                <hr style={{ margin: 4 }} />



                                <div className="table-responsive mt-1" style={{ maxHeight: "400px", overflowY: "auto" }}>
                                    <Table className="table table-bordered" style={{ border: '2px solid black' }}>
                                        <thead>
                                            <tr>
                                                <th scope="col" className="text-center" style={{ color: "black" }}>
                                                    sr No
                                                </th>
                                                <th scope="col" className="text-center" style={{ color: "black", width: "100px" }}>
                                                    Commodity Description
                                                </th>
                                                <th scope="col" className="text-center" style={{ color: "black" }}>
                                                    Commodity Type
                                                </th>
                                                <th scope="col" className="text-center" style={{ color: "black" }}>
                                                    No of Package
                                                </th>
                                                <th scope="col" className="text-center" style={{ color: "black" }}>
                                                    SB Gross weight
                                                </th>
                                                <th scope="col" className="text-center" style={{ color: "black" }}>
                                                    Cargo_Type
                                                </th>

                                                {assessmentSheet.assesmentId !== '' && (
                                                    <>
                                                        <th scope="col" className="text-center" style={{ color: "black" }}>
                                                            Service Name
                                                        </th>
                                                        <th scope="col" className="text-center" style={{ color: "black" }}>
                                                            Amount
                                                        </th>
                                                    </>)}

                                            </tr>



                                        </thead>
                                        <tbody className='text-center'>

                                            {assessmentData.map((item, index) => (
                                                <tr key={index}>


                                                    <td>
                                                        {item.assesmentLineNo}
                                                    </td>
                                                    <td>
                                                        {item.commodityDescription}
                                                    </td>


                                                    <td>
                                                        {item.newCommodity}
                                                    </td>
                                                    <td>
                                                        {item.noOfPackages}
                                                    </td>

                                                    <td>
                                                        {item.grossWeight}
                                                    </td>
                                                    <td>
                                                        {item.cargoType}
                                                    </td>


                                                    {assessmentSheet.assesmentId !== '' && (
                                                        <>
                                                            <td>{item.serviceName}</td>
                                                            <td>{item.rates}</td>
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



                    {/* Back To Town */}



                    {assessmentData && assessmentData.length > 0 && selectedInvoiceType === 'Export Cargo' && (

                        <div className='assessmentContainer mt-2'>
                            <>

                                <div style={{ fontWeight: 800, fontSize: 20, marginTop: 10 }}>
                                    <span>Export Back To Town Vehicle Details</span>
                                </div>
                                <hr style={{ margin: 4 }} />



                                <div className="table-responsive mt-1" style={{ maxHeight: "400px", overflowY: "auto" }}>
                                    <Table className="table table-bordered" style={{ border: '2px solid black' }}>
                                        <thead className='text-center'>
                                            <tr className='text-center'>
                                                <th scope="col" className="text-center" style={{ color: "black" }}>
                                                    Sr No
                                                </th>
                                                <th scope="col" className="text-center" style={{ color: "black", width: "100px" }}>
                                                    Commodity
                                                </th>
                                                <th scope="col" className="text-center" style={{ color: "black" }}>
                                                    Carting Date
                                                </th>
                                                <th scope="col" className="text-center" style={{ color: "black" }}>
                                                    Gross Weight
                                                </th>
                                                <th scope="col" className="text-center" style={{ color: "black" }}>
                                                    Area
                                                </th>

                                                <th scope="col" className="text-center d-flex justify-content-center align-items-center">
                                                    <Input
                                                        className="form-control"
                                                        type="checkbox"
                                                        id="checkInvDate1"
                                                        name='checkInvDate1'
                                                        value={checkInvDate1}
                                                        disabled={checkInvDate === 'Y' || assessmentSheet.assesmentId !== ''}
                                                        onChange={handleCurrentDateCheckBox}
                                                        checked={checkInvDate1 === 'Y'}
                                                        style={{ height: 25 }}
                                                    />
                                                </th>

                                                <th scope="col" className="text-center" style={{ color: "black" }}>
                                                    Invoice Date
                                                </th>

                                                {assessmentSheet.assesmentId !== '' && (
                                                    <>
                                                        <th scope="col" className="text-center" style={{ color: "black" }}>
                                                            Service Name
                                                        </th>
                                                        <th scope="col" className="text-center" style={{ color: "black" }}>
                                                            Amount
                                                        </th>
                                                    </>)}

                                                {assessmentSheet?.assesmentId && !assessmentSheet?.invoiceNo && (
                                                    <>
                                                        <th scope="col" className="text-center" style={{ color: "black" }}>
                                                            Action
                                                        </th>
                                                    </>)}
                                            </tr>




                                            <tr className='text-center'>
                                                <th scope="col" className="text-center" style={{ color: "black" }}>

                                                </th>
                                                <th scope="col" className="text-center" style={{ color: "black" }}>

                                                </th>
                                                <th scope="col" className="text-center" style={{ color: "black" }}>

                                                </th>
                                                <th scope="col" className="text-center" style={{ color: "black" }}>

                                                </th>
                                                <th scope="col" className="text-center" style={{ color: "black" }}>

                                                </th>

                                                <th scope="col" className="text-center d-flex justify-content-center align-items-center">
                                                    <Input
                                                        className="form-control"
                                                        type="checkbox"
                                                        id="checkInvDate"
                                                        name='checkInvDate'
                                                        value={checkInvDate}
                                                        disabled={checkInvDate1 === 'Y' || assessmentSheet.assesmentId !== ''}
                                                        onChange={handleSelectedDateCheckBox}
                                                        checked={checkInvDate === 'Y'}
                                                        style={{ height: 25 }}
                                                    />
                                                </th>
                                                <th>
                                                    <DatePicker
                                                        selected={invDate}
                                                        onChange={handleInvDate}
                                                        id="invDate"
                                                        name="invDate"
                                                        dateFormat="dd/MM/yyyy HH:mm"
                                                        showTimeInput
                                                        disabled={assessmentSheet.assesmentId !== ""}
                                                        timeFormat="HH:mm"
                                                        timeIntervals={15}
                                                        customInput={
                                                            <CustomInput
                                                                className={`inputwidthTukaMax form-control`}
                                                                onKeyDown={handleInvDate}
                                                                onChange={handleInvDate}
                                                                disabled={assessmentSheet.assesmentId !== ''}
                                                            />
                                                        } />
                                                </th>

                                                {assessmentSheet.assesmentId !== '' && (
                                                    <>
                                                        <th scope="col" className="text-center" style={{ color: "black" }}>

                                                        </th>
                                                        <th scope="col" className="text-center" style={{ color: "black" }}>
                                                            {beforeTax}

                                                        </th>
                                                    </>
                                                )}

                                            </tr>


                                        </thead>
                                        <tbody className='text-center'>

                                            {assessmentData.map((item, index) => (
                                                <tr key={index}>

                                                    <td>{index + 1}</td>
                                                    <td>
                                                        {item.commodity}
                                                    </td>

                                                    <td>
                                                        <DatePicker
                                                            selected={item.cartingDate ? new Date(item.cartingDate) : null}
                                                            name="gateInDate"
                                                            id="service"
                                                            dateFormat="dd/MM/yyyy HH:mm"
                                                            showTimeInput
                                                            timeFormat="HH:mm"
                                                            timeIntervals={15}
                                                            disabled
                                                            customInput={
                                                                <CustomInput
                                                                    className={`inputwidthTukaMax form-control`} id='service'
                                                                />
                                                            } />
                                                    </td>
                                                    <td>
                                                        {item.backToTownWeight}
                                                    </td>
                                                    <td>
                                                        {item.areaUsed}
                                                    </td>



                                                    <td>
                                                        <Input
                                                            className="form-control"
                                                            type="checkbox"
                                                            id="checkDate"
                                                            name='checkDate'
                                                            disabled={assessmentSheet.assesmentId !== ''}
                                                            checked={item.checkDate === 'Y'}
                                                            onChange={(e) => handleSelectDateCheckBox(e, index, item.invoiceDate)}
                                                            style={{ height: 25, marginLeft: 8, paddingBottom: 15 }}
                                                        />
                                                    </td>

                                                    <td>


                                                        <DatePicker
                                                            selected={item.invoiceDate ? new Date(item.invoiceDate) : null}
                                                            id={assessmentSheet.assesmentId ? 'service' : ''}
                                                            name='invoiceDate'
                                                            onChange={(date) => handleSelectInvDate(date, index)}
                                                            dateFormat="dd/MM/yyyy HH:mm"
                                                            showTimeInput
                                                            disabled={assessmentSheet.assesmentId !== ""}
                                                            timeFormat="HH:mm"
                                                            timeIntervals={15}
                                                            customInput={
                                                                <CustomInput
                                                                    className={`inputwidthTukaMax form-control`}
                                                                    onKeyDown={(event) => handleSelectInvDate(event, index)}
                                                                    onChange={(e) => handleSelectInvDate(e, index)}
                                                                    disabled={assessmentSheet.assesmentId !== ''}
                                                                />
                                                            } />

                                                    </td>
                                                    {assessmentSheet.assesmentId !== '' && (
                                                        <>
                                                            <td>{item.serviceName}</td>
                                                            <td>{item.rates}</td>
                                                        </>
                                                    )}

                                                    {assessmentSheet?.assesmentId && (
                                                        <td>
                                                            <button
                                                                type="button"
                                                                className="btn  btn-outline-primary"
                                                                onClick={(e) => openAddServiceModal(item)}
                                                            ><FontAwesomeIcon icon={faEdit} />
                                                            </button>
                                                        </td>
                                                    )}



                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            </>
                        </div>
                    )}










                    {sbCargoData && sbCargoData.length > 0 && (
                        <>

                            <div style={{ fontWeight: 800, fontSize: 20, marginTop: 10 }}>
                                <span>Shipping Bill Wise Storage Details</span>
                            </div>
                            <hr style={{ margin: 4 }} />


                            <div className="table-responsive mt-1" style={{ maxHeight: "400px", overflowY: "auto" }}>
                                <Table className="table table-bordered" style={{ border: '2px solid black' }}>
                                    <thead>
                                        <tr>
                                            <th scope="col" className="text-center" style={{ color: "black" }}>
                                                Sr No
                                            </th>
                                            <th scope="col" className="text-center" style={{ color: "black", width: "100px" }}>
                                                SB No
                                            </th>
                                            <th scope="col" className="text-center" style={{ color: "black" }}>
                                                Carting Date
                                            </th>
                                            <th scope="col" className="text-center" style={{ color: "black" }}>
                                                Area
                                            </th>
                                            <th scope="col" className="text-center" style={{ color: "black" }}>
                                                Amount
                                            </th>
                                        </tr>

                                    </thead>
                                    <tbody className='text-center'>

                                        {sbCargoData.map((item, index) => (
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
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>


                            </div>











































                        </>

                    )}



                    {/* Add Service Service wise*/}

                    <Modal Modal isOpen={isModalOpenForAddService} onClose={handleClosAddService} toggle={handleClosAddService} style={{ maxWidth: '1200px', fontSize: 14, wioverflow: '-moz-hidden-unscrollable' }}>
                        <ModalHeader toggle={handleClosAddService} style={{
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
                            /> Add Service </h5>

                        </ModalHeader>
                        <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                            <Row>
                                <Col md={3}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                                            Assesment Id
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="service"
                                            disabled
                                            name='processTransId'
                                            value={Cfinvsrvanx.processTransId}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                                            {selectedInvoiceType === 'Export Cargo' ? 'SB No' : 'Container No'}
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="service"
                                            disabled
                                            name='containerNo'
                                            value={selectedInvoiceType === 'Export Cargo' ? assessmentSheet.sbNo : Cfinvsrvanx.containerNo}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row className="text-center mt-1 mb-1">
                                <Col>
                                    <button
                                        className="btn btn-outline-success btn-margin newButton"
                                        style={{ marginRight: 10, fontWeight: 'bold' }}
                                        id="submitbtn2"
                                        onClick={(e) => saveAddService(CfinvsrvanxData)}
                                        disabled={assessmentSheet.invoiceNo}
                                    >
                                        <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
                                        Save
                                    </button>

                                    <button
                                        className="btn btn-outline-primary btn-margin newButton"
                                        style={{ marginRight: 10, fontWeight: 'bold' }}
                                        id="submitbtn2"
                                        onClick={addServiePlus}
                                        disabled={assessmentSheet.invoiceNo}
                                    >
                                        <FontAwesomeIcon icon={faPlus} style={{ marginRight: "5px" }} />
                                        Add Row
                                    </button>



                                </Col>
                            </Row>


                            <hr style={{ margin: 4 }} />
                            <div className="mt-2 table-responsive ">
                                <Table className="table table-bordered tableHeader">
                                    <thead className='tableHeader'>
                                        <tr className='text-center'>
                                            <th scope="col">Sr No</th>
                                            <th scope="col">Service</th>
                                            <th scope="col">Service Unit</th>
                                            <th scope="col">Execution Unit</th>
                                            <th scope="col">Service Unit1</th>
                                            <th scope="col">Execution Unit1</th>
                                            <th scope="col">From Range</th>
                                            <th scope="col">To Range</th>
                                            <th scope="col">Rate</th>
                                            <th scope="col">Actual</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentItemsAddService.map((item, index) => (
                                            <>
                                                <tr key={index} className='text-center'>
                                                    <td>{((currentPagAddService - 1) * itemsPerPage) + index + 1}</td>
                                                    <td>
                                                        <FormGroup>
                                                            {item.alreadySaved !== 'Y' ? (
                                                                <Select
                                                                    options={services}
                                                                    value={selectedServices.find((service) => service.srlNo === item.srlNo)?.selectedOption || null}
                                                                    onChange={(selectedOption) => handleServiceChange(selectedOption, item.srlNo)}
                                                                    onInputChange={(inputValue, { action }) => {
                                                                        if (action === 'input-change') {
                                                                            searchServices(inputValue, item.containerSize ? item.containerSize : 'ALL', item.containerType ? item.containerType : 'ALL');
                                                                        }
                                                                    }}
                                                                    components={{ Option: CustomOptionService }}
                                                                    className={`inputwidthTukaMax ${validationErrors[item.srlNo]?.serviceId ? 'error-border' : ''}`}
                                                                    placeholder="Select Service"
                                                                    isDisabled={assessmentSheet.invoiceNo || (!assessmentSheet.invoiceNo && item.addServices !== 'Y')}
                                                                    id={assessmentSheet.invoiceNo || (!assessmentSheet.invoiceNo && item.addServices !== 'Y') ? 'service' : ''}
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

                                                            ) : (
                                                                // Render Input field for all other rows or if status exists
                                                                <Input
                                                                    type="text"
                                                                    value={item.serviceName}
                                                                    className={`inputwidthTukaMax form-control`}
                                                                    disabled
                                                                    id="service"
                                                                />
                                                            )}


                                                        </FormGroup>
                                                    </td>
                                                    <td>
                                                        <FormGroup>
                                                            <input
                                                                className={`form-control inputwidthTukaMin`}
                                                                type="text"
                                                                maxLength={10}
                                                                value={item.serviceUnit}
                                                                disabled
                                                                id='service'
                                                            />
                                                        </FormGroup>
                                                    </td>
                                                    <td>
                                                        <FormGroup>
                                                            <input
                                                                className={`form-control inputwidthTukaMin ${validationErrors[item.srlNo]?.executionUnit ? 'error-border' : ''}`}
                                                                type="text"
                                                                maxLength={4}
                                                                value={item.executionUnit}
                                                                disabled={assessmentSheet.invoiceNo || (!assessmentSheet.invoiceNo && item.addServices !== 'Y')}
                                                                id={assessmentSheet.invoiceNo || (!assessmentSheet.invoiceNo && item.addServices !== 'Y') ? 'service' : ''}
                                                                onChange={(e) => handleFieldChangeService(e, 'executionUnit', 'number', item.srlNo)}
                                                            />
                                                        </FormGroup>
                                                    </td>
                                                    <td>
                                                        <FormGroup>
                                                            <input
                                                                className={`form-control inputwidthTukaMin`}
                                                                type="text"
                                                                maxLength={10}
                                                                value={item.serviceUnit1}
                                                                disabled
                                                                id='service'
                                                            />
                                                        </FormGroup>
                                                    </td>
                                                    <td>
                                                        <FormGroup>
                                                            <input
                                                                className={`form-control inputwidthTukaMin ${validationErrors[item.srlNo]?.executionUnit ? 'error-border' : ''}`}
                                                                type="text"
                                                                maxLength={4}
                                                                value={item.executionUnit1}
                                                                onChange={(e) => handleFieldChangeService(e, 'executionUnit1', 'number', item.srlNo)}
                                                                disabled={assessmentSheet.invoiceNo || (!assessmentSheet.invoiceNo && item.addServices !== 'Y') || (item.serviceUnit1 === '' || !item.serviceUnit1 || item.serviceUnit1 === 'NA')}
                                                                id={assessmentSheet.invoiceNo || (!assessmentSheet.invoiceNo && item.addServices !== 'Y') ? 'service' : ''}
                                                            />
                                                        </FormGroup>
                                                    </td>

                                                    <td>
                                                        <FormGroup>
                                                            <input
                                                                className={`form-control inputwidthTukaMin`}
                                                                type="text"
                                                                maxLength={10}
                                                                value={item.rangeFrom}
                                                                disabled
                                                                id='service'
                                                            />
                                                        </FormGroup>
                                                    </td>
                                                    <td>
                                                        <FormGroup>
                                                            <input
                                                                className={`form-control inputwidthTukaMin`}
                                                                type="text"
                                                                maxLength={10}
                                                                value={item.rangeTo}
                                                                disabled
                                                                id='service'
                                                            />
                                                        </FormGroup>
                                                    </td>

                                                    <td>
                                                        <FormGroup>
                                                            <input
                                                                className={`form-control inputwidthTuka ${validationErrors[item.srlNo]?.rate ? 'error-border' : ''}`}
                                                                type="text"
                                                                maxLength={10}
                                                                value={item.rate}
                                                                onChange={(e) => handleFieldChangeService(e, 'rate', 'number', item.srlNo)}
                                                                disabled={assessmentSheet.invoiceNo || (!assessmentSheet.invoiceNo && item.addServices !== 'Y')}
                                                                id={assessmentSheet.invoiceNo || (!assessmentSheet.invoiceNo && item.addServices !== 'Y') ? 'service' : ''}
                                                            />
                                                        </FormGroup>
                                                    </td>
                                                    <td>
                                                        <FormGroup>
                                                            <input
                                                                className={`form-control inputwidthTuka`}
                                                                type="text"
                                                                maxLength={10}
                                                                value={item.actualNoOfPackages}
                                                                disabled
                                                                id='service'
                                                            />
                                                        </FormGroup>

                                                    </td>
                                                </tr>
                                            </>
                                        ))}
                                    </tbody>
                                </Table>


                                <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
                                    <Pagination.First onClick={() => handlePageChangeAddService(1)} />
                                    <Pagination.Prev
                                        onClick={() => handlePageChangeAddService(currentPagAddService - 1)}
                                        disabled={currentPagAddService === 1}
                                    />
                                    <Pagination.Ellipsis />

                                    {displayPagesAddService().map((pageNumber) => (
                                        <Pagination.Item
                                            key={pageNumber}
                                            active={pageNumber === currentPagAddService}
                                            onClick={() => handlePageChangeAddService(pageNumber)}
                                        >
                                            {pageNumber}
                                        </Pagination.Item>
                                    ))}

                                    <Pagination.Ellipsis />
                                    <Pagination.Next
                                        onClick={() => handlePageChangeAddService(currentPagAddService + 1)}
                                        disabled={currentPagAddService === totalPagesAddService}
                                    />
                                    <Pagination.Last onClick={() => handlePageChangeAddService(totalPagesAddService)} />
                                </Pagination>


                            </div>
                        </ModalBody>
                    </Modal>






                    {/* Add Service ContainerWise*/}

                    <Modal Modal isOpen={isModalOpenForAddServiceServiceWise} onClose={handleClosAddServiceServiceWise} toggle={handleClosAddServiceServiceWise} style={{ maxWidth: '1200px', fontSize: 14, wioverflow: '-moz-hidden-unscrollable' }}>
                        <ModalHeader toggle={handleClosAddServiceServiceWise} style={{
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
                            /> Add Service </h5>

                        </ModalHeader>
                        <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                            <Row>
                                <Col md={3}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                                            Select Service
                                        </label>

                                        <Select
                                            options={services}
                                            value={selectedService}
                                            onChange={handleServiceChangeContainer}
                                            onInputChange={(inputValue, { action }) => {
                                                if (action === 'input-change') {
                                                    searchServices(inputValue, "ALL", "ALL");
                                                }
                                            }}
                                            components={{ Option: CustomOptionService }}
                                            className={`${validationContainer?.serviceId ? 'error-border' : ''}`}
                                            placeholder="Select Service"
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
                                </Col>

                                <Col md={9}>
                                    <Row>




                                        <Col md={2}>
                                            <FormGroup>
                                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                    Service Unit
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    id="service"
                                                    disabled
                                                    name='containerNo'
                                                    value={Cfinvsrvanx.serviceUnit}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={2}>
                                            <FormGroup>
                                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                    Execution Unit
                                                </label>
                                                <input
                                                    className={`form-control ${validationContainer?.executionUnit ? 'error-border' : ''}`}
                                                    type="text"
                                                    name='executionUnit'
                                                    maxLength={4}
                                                    value={Cfinvsrvanx.executionUnit}
                                                    onChange={(e) => handleFieldChangeContainer(e, 'executionUnit', 'number')}
                                                />
                                            </FormGroup>
                                        </Col>

                                        <Col md={2}>
                                            <FormGroup>
                                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                    Service Unit1
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    id="service"
                                                    disabled
                                                    name='containerNo'
                                                    value={Cfinvsrvanx.serviceUnit1}
                                                />
                                            </FormGroup>
                                        </Col>


                                        <Col md={2}>
                                            <FormGroup>
                                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                    Execution Unit1
                                                </label>
                                                <input
                                                    className={`form-control ${validationContainer?.executionUnit1 ? 'error-border' : ''}`}
                                                    disabled
                                                    type="text"
                                                    maxLength={4}
                                                    name='executionUnit1'
                                                    value={Cfinvsrvanx.executionUnit1}
                                                    onChange={(e) => handleFieldChangeContainer(e, 'executionUnit1', 'number')}
                                                />
                                            </FormGroup>
                                        </Col>

                                        <Col md={2}>
                                            <FormGroup>
                                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                    Rate
                                                </label>
                                                <input
                                                    className={`form-control ${validationContainer?.rate ? 'error-border' : ''}`}
                                                    type="text"
                                                    name='rate'
                                                    value={Cfinvsrvanx.rate}
                                                    maxLength={7}
                                                    onChange={(e) => handleFieldChangeContainer(e, 'rate', 'number')}
                                                />
                                            </FormGroup>
                                        </Col>


                                        <Col md={2}>
                                            <FormGroup>
                                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                    Actual Amount
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    id="service"
                                                    disabled
                                                    name='actualNoOfPackages'
                                                    value={Cfinvsrvanx.actualNoOfPackages}
                                                />
                                            </FormGroup>
                                        </Col>

                                    </Row>
                                </Col>






                            </Row>

                            <Row className="text-center mt-1 mb-1">
                                <Col>
                                    <button
                                        className="btn btn-outline-primary btn-margin newButton"
                                        style={{ marginRight: 10, fontWeight: 'bold' }}
                                        id="submitbtn2"
                                        onClick={(e) => saveAddServiceContainerWise(selectedContainers)}
                                    >
                                        <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
                                        Save
                                    </button>

                                    <button
                                        className="btn btn-outline-danger btn-margin newButton"
                                        style={{ marginRight: 10, fontWeight: 'bold' }}
                                        id="submitbtn2"
                                        onClick={handleReset}
                                    >
                                        <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
                                        Clear
                                    </button>



                                </Col>
                            </Row>


                            <hr style={{ margin: 4, }} />
                            <div className="mt-2 table-responsive ">



                                {selectedInvoiceType !== 'Export Cargo' && (
                                    <Table className="table table-bordered tableHeader">
                                        <thead className='tableHeader'>
                                            <tr className='text-center'>
                                                <th scope="col">
                                                    <Input
                                                        className="form-check-input radios"
                                                        type="checkbox"
                                                        style={{ width: '1.2vw', height: '1.2vw' }}
                                                        name="taxApplicable"
                                                        checked={selectedContainersAll}
                                                        onChange={handleSelectAllToggleContainer} />
                                                </th>
                                                <th scope="col">Sr No</th>
                                                <th scope="col">ContainerNo</th>
                                                <th scope="col">Size/Type</th>
                                                <th scope="col">Gate In Date</th>
                                                <th scope="col">Stuff tally Date</th>
                                                <th scope="col">Movement Req Date</th>
                                                <th scope="col">Gate Out Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {containerDataServiceWise.map((item, index) => (
                                                <>
                                                    <tr key={index} className='text-center'>
                                                        <td>
                                                            <Input
                                                                className="form-check-input radios"
                                                                type="checkbox"
                                                                style={{ width: '1.2vw', height: '1.2vw' }}
                                                                name="taxApplicable"
                                                                checked={selectedContainers.some((imports) => imports.containerNo === item.containerNo)}
                                                                onChange={() => handleRowCheckboxChangeContainer(index)}
                                                            />
                                                        </td>
                                                        <td>{index + 1}</td>
                                                        <td>
                                                            {item.containerNo}
                                                        </td>
                                                        <td>
                                                            {item.containerSize} / {item.containerType}
                                                        </td>

                                                        <td>
                                                            {convertToCustomDateTime(item.startDate)}
                                                        </td>

                                                        <td>
                                                            {convertToCustomDateTime(item.stuffTallyDate)}
                                                        </td>


                                                        <td>
                                                            {convertToCustomDateTime(item.movReqDate)}
                                                        </td>

                                                        <td>
                                                            {convertToCustomDateTime(item.gateOutDate)}
                                                        </td>
                                                    </tr>
                                                </>
                                            ))}
                                        </tbody>
                                    </Table>
                                )}

                                {selectedInvoiceType === 'Export Cargo' && (
                                    <Table className="table table-bordered tableHeader">
                                        <thead className='tableHeader'>
                                            <tr className='text-center'>
                                                <th scope="col">
                                                    <Input
                                                        className="form-check-input radios"
                                                        type="checkbox"
                                                        style={{ width: '1.2vw', height: '1.2vw' }}
                                                        name="taxApplicable"
                                                        checked={selectedContainersAll}
                                                        onChange={handleSelectAllToggleContainer} />
                                                </th>
                                                <th scope="col">Sr No</th>
                                                <th scope="col">Sb No</th>
                                                <th scope="col">Carting Date</th>
                                                <th scope="col">Commodity</th>
                                                <th scope="col">Gross Weight</th>
                                                <th scope="col">Area</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {containerDataServiceWise.map((item, index) => (
                                                <>
                                                    <tr key={index} className='text-center'>
                                                        <td>
                                                            <Input
                                                                className="form-check-input radios"
                                                                type="checkbox"
                                                                style={{ width: '1.2vw', height: '1.2vw' }}
                                                                name="taxApplicable"
                                                                checked={selectedContainers.some((imports) => imports.lineNo === item.lineNo)}
                                                                onChange={() => handleRowCheckboxChangeContainer(index)}
                                                            />
                                                        </td>
                                                        <td>{index + 1}</td>
                                                        <td>
                                                            {item.docRefNo}
                                                        </td>
                                                        <td>
                                                            {convertToCustomDateTime(item.cartingDate)}
                                                        </td>

                                                        <td>
                                                            {item.commodityDescription}
                                                        </td>

                                                        <td>
                                                            {item.grossWeight}
                                                        </td>
                                                        <td>
                                                            {item.areaUsed}
                                                        </td>


                                                    </tr>
                                                </>
                                            ))}
                                        </tbody>
                                    </Table>
                                )}



                            </div>
                        </ModalBody>
                    </Modal>


                </div>
                {/* )} */}

                {/* Payment Modes */}

                {assessmentSheet.assesmentId !== '' && (
                    <>
                        <div style={{ marginTop: 10 }}>
                            <div style={{ fontWeight: 800, fontSize: 20 }}>
                                <span>Payment Details</span>
                            </div>
                            <hr style={{ margin: 4 }} />

                            <Row>
                                <Col md={2}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                                            TDS Deductee / Perc
                                        </label>
                                        <div className="d-flex flex-wrap">
                                            <Input
                                                className="form-control me-1" // Slight margin added to the right for spacing
                                                style={{ flex: "0 0 65%", minWidth: "0" }}
                                                type="select"
                                                id="tdsDeductee"
                                                name='tdsDeductee'
                                                value={tdsDeductee}
                                                disabled={assessmentSheet.invoiceNo !== ''}
                                                onChange={handleTdsDeductee}
                                            >
                                                <option value=""></option>
                                                {assessmentSheet.cha !== '' && (<option value="CHA">CHA</option>)}
                                                {assessmentSheet.importerId !== '' && (<option value="EXP">Exporter</option>)}
                                                {assessmentSheet.onAccountOf !== '' && (<option value="FWR">Forwarder</option>)}
                                                {assessmentSheet.othPartyId !== '' && (<option value="OTH">Other</option>)}
                                            </Input>

                                            <Input
                                                className="form-control me-1" // Slight margin added to the right for spacing
                                                style={{ flex: "0 0 29%", minWidth: "0" }}
                                                type="text"
                                                id="tdsPerc"
                                                name='tdsPerc'
                                                value={tdsPerc}
                                                onChange={(e) => setTdsPerc(e.target.value)}
                                                maxLength={10}
                                                disabled
                                            />

                                        </div>
                                    </FormGroup>
                                </Col>

                                <Col md={2}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                                            Tan No
                                        </label>

                                        <Input
                                            className="form-control"
                                            type="text"
                                            id="tanNo"
                                            name='tanNo'
                                            value={tanNo}
                                            onChange={(e) => setTanNo(e.target.value)}
                                            maxLength={10}
                                            disabled
                                        />


                                    </FormGroup>
                                </Col>
                                <Col md={2}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                                            Before Tax
                                        </label>

                                        <Input
                                            className="form-control"
                                            type="text"
                                            id="beforeTax"
                                            name='beforeTax'
                                            value={beforeTax}
                                            disabled
                                        />


                                    </FormGroup>
                                </Col>
                                <Col md={2}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                                            Invoice Amt
                                        </label>

                                        <Input
                                            className="form-control"
                                            type="text"
                                            id="invoiceAmt"
                                            name='invoiceAmt'
                                            value={invoiceAmt}
                                            disabled
                                        />


                                    </FormGroup>
                                </Col>
                                {/* <Col md={2}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                                            Receipt Amt
                                        </label>


                                        <Input
                                            className="form-control"
                                            type="text"
                                            id="receiptAmt"
                                            name='receiptAmt'
                                            value={receiptAmt}
                                            disabled
                                        />

                                    </FormGroup>
                                </Col>
                                <Col md={2}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                                            Balance For Payment
                                        </label>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            id="balanceAmt"
                                            name='balanceAmt'
                                            value={balanceAmt}
                                            disabled
                                        />

                                    </FormGroup>
                                </Col> */}
                            </Row>
                            {(tanNo && assessmentSheet.creditType !== "Y") && (
                                <Row>
                                    <span style={{ color: 'red' }}>The TDS will be deducted as per the applicable TDS percentage.</span>
                                </Row>
                            )}
                            {(tanNo && assessmentSheet.creditType === "Y") && (
                                <Row>
                                    <span style={{ color: 'red' }}>During receipt the TDS will be deducted as per the applicable TDS percentage.</span>
                                </Row>
                            )}

                        </div>
                    </>

                )}

                <Modal Modal isOpen={isModalOpenForAssesMentSearch} onClose={handleCloseAssesMentSearch} toggle={handleCloseAssesMentSearch} style={{ maxWidth: '1100px', fontSize: 14, wioverflow: '-moz-hidden-unscrollable' }}>

                    <ModalHeader toggle={handleCloseAssesMentSearch} style={{
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
                        /> Search Export Container Invoice</h5>

                    </ModalHeader>
                    <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                                        Search by Assesment Id / Invoice No / SB No / container No
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="searchCartingvalues"
                                        maxLength={15}
                                        name='searchCartingvalues'
                                        value={searchAssesMentvalues}
                                        onChange={(e) => setSearchAssesMentvalues(e.target.value)}
                                    />

                                </FormGroup>
                            </Col>
                            <Col md={6} style={{ marginTop: 24 }}>
                                <button
                                    className="btn btn-outline-primary btn-margin newButton"
                                    style={{ marginRight: 10, fontWeight: 'bold', fontSize: 13 }}
                                    id="submitbtn2"
                                    onClick={() => searchAssesMentSearch(searchAssesMentvalues)}
                                >
                                    <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
                                    Search
                                </button>
                                <button
                                    className="btn btn-outline-danger btn-margin newButton"
                                    style={{ marginRight: 10, fontWeight: 'bold', fontSize: 13 }}
                                    id="submitbtn2"
                                    onClick={clearAssesMentSearch}
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
                                        <th scope="col">Assesment Id</th>
                                        <th scope="col">Assesment Date</th>
                                        <th scope="col">profitCentre</th>
                                        <th scope="col">SB Trans Id</th>
                                        <th scope="col">SB No</th>
                                        <th scope="col">SB Date</th>
                                        <th scope="col">Commodity</th>
                                        <th scope="col">Exporter</th>
                                        <th scope="col">Invoice No</th>
                                        <th scope="col">Trans Type</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                    <tr className='text-center'>
                                        <th scope="col"></th>
                                        <th scope="col">{assesmentSearchData.length}</th>
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
                                            <input type="radio" name="radioGroup" onChange={() => selectAssesMentSearchRadio('', '', '', '')} value={''} />
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
                                    </tr>
                                    {currentItemsAssesMentSearch.map((item, index) => (
                                        <>
                                            <tr key={index} className='text-center'>
                                                <td>
                                                    <input
                                                        type="radio"
                                                        name="radioGroup"
                                                        onClick={() => selectAssesMentSearchRadio(item[11], item[0], item[9], item[3])}
                                                        value={item[0]}
                                                    />
                                                </td>

                                                <td>{item[0]}</td>
                                                <td>{item[1]}</td>
                                                <td>{item[2]}</td>
                                                <td>{item[3]}</td>
                                                <td>{item[4]}</td>
                                                <td>{item[5]}</td>
                                                <td>{item[6]}</td>
                                                <td>{item[7]}</td>
                                                <td>{item[9]}</td>
                                                <td>{item[10]}</td>
                                                <td>{item[8] === 'A' ? 'Approved' : item[8] === 'N' ? 'New' : ''}</td>

                                            </tr>
                                        </>
                                    ))}
                                </tbody>
                            </table>
                            <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
                                <Pagination.First onClick={() => handlePageChangeAssesMent(1)} />
                                <Pagination.Prev
                                    onClick={() => handlePageChangeAssesMent(currentPageSearch - 1)}
                                    disabled={currentPageSearch === 1}
                                />
                                <Pagination.Ellipsis />

                                {displayPagesAssesMentSearch().map((pageNumber) => (
                                    <Pagination.Item
                                        key={pageNumber}
                                        active={pageNumber === currentPageSearch}
                                        onClick={() => handlePageChangeAssesMent(pageNumber)}
                                    >
                                        {pageNumber}
                                    </Pagination.Item>
                                ))}
                                <Pagination.Ellipsis />
                                <Pagination.Next
                                    onClick={() => handlePageChangeAssesMent(currentPageSearch + 1)}
                                    disabled={currentPageSearch === totalPagesCartingSearch}
                                />
                                <Pagination.Last onClick={() => handlePageChangeAssesMent(totalPagesCartingSearch)} />
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
                        {/* <FontAwesomeIcon icon="fa-solid fa-truck-arrow-right" style={{ marginRight: '9px' }}/> */}
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

                            {/* Example form fields for the modal */}
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
                                                Proforma Format 1
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
                                                Proforma Format 2
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



                            {/* Add more form fields as needed */}
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
export default ExportProforma
