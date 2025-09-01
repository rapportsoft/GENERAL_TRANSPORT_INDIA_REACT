import axios from "axios";
import ipaddress from "../Components/IpAddress";

const proforma_url = `${ipaddress}proforma/`;
const tariff_url = `${ipaddress}tarrif/`;
const exportInvoice_url = `${ipaddress}exportInvoice/`;
const assesment_url = `${ipaddress}assessment/`;
const creditNote_url = `${ipaddress}creditNote/`;
const quatation_url = `${ipaddress}quotation/`;
const auction_url = `${ipaddress}auctionInvoice/`;

class financeService {

    constructor(axiosInstance) {
        this.axios = axiosInstance;
    }


    addServiceExportInvoiceServiceWisePro(companyId, branchId, userId, assesmentSheet, selectedContainers, jwtToken, type) {
        const requestData = {
            assesmentSheet: assesmentSheet,
            Cfinvsrvanx: selectedContainers
        };
        return axios.post(`${assesment_url}saveBondAddServicePro`, requestData, {
            params: {
                companyId: companyId,
                branchId: branchId,
                userId: userId,
                type: type
            },
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });
    }



    addServiceExportInvoiceServiceWiseGen(companyId, branchId, userId, assesmentSheet, selectedContainers, jwtToken, type) {
        const requestData = {
            assesmentSheet: assesmentSheet,
            Cfinvsrvanx: selectedContainers
        };
        return axios.post(`${assesment_url}saveBondAddService`, requestData, {
            params: {
                companyId: companyId,
                branchId: branchId,
                userId: userId,
                type: type
            },
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });
    }


    // Quatation 

    downLoadTariffTemplateQuatation(dataTosend, jwtToken) {
        return axios.get(`${quatation_url}downLoadTariffReportTemlate`, {
            params: dataTosend,
            responseType: 'arraybuffer',
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });
    };


    uploadTariffQuatation(companyId, branchId, userId, cfsTariff, jwtToken) {
        const formData = new FormData();

        if (cfsTariff.selectedFile) {
            formData.append('file', cfsTariff.selectedFile);
        }
        formData.append('companyId', companyId);
        formData.append('branchId', branchId);
        formData.append('userId', userId);
        formData.append('cfsTariff', JSON.stringify(cfsTariff));

        return axios.post(`${quatation_url}uploadTariff`, formData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            }
        });
    };


    downLoadTariffReportQuatation(searchData, jwtToken) {
        return axios.get(`${quatation_url}downLoadTariffReport`, {
            params: searchData,
            responseType: 'arraybuffer',
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });
    };

    ammendTariffQuatation(companyid, branchId, userId, cfsTariff, jwtToken) {
        return axios.post(`${quatation_url}ammendTariff`, cfsTariff, {
            params: {
                companyId: companyid,
                branchId: branchId,
                userId: userId
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
    };


    addDetailCfsTariffServiceQuatation(companyid, branchId, cfsTariff, cfsTariffService, userId, jwtToken) {

        const requestData = {
            cfsTariff: cfsTariff,
            cfsTariffService: cfsTariffService
        };

        return axios.post(`${quatation_url}addDetailCfsTariffService`, requestData, {
            params: {
                companyId: companyid,
                branchId: branchId,
                userId: userId
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
    };


    addHeaderCfsTariffQuatation(companyid, branchId, userId, cfsTariff, type, jwtToken) {
        return axios.post(`${quatation_url}addHeaderCfsTariff`, cfsTariff, {
            params: {
                companyId: companyid,
                branchId: branchId,
                userId: userId,
                type: type
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
    };

    getSavedTariffQuatation(searchValue, jwtToken) {
        return axios.get(`${quatation_url}getSavedTariff`, {
            params: searchValue,
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        });
    }

    searchExporterQuatation(companyId, branchId, searchValue, type, jwtToken) {
        return axios.get(`${quatation_url}getPartyByTypeValue`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                searchValue: searchValue,
                type: type
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        });
    }


    searchSavedTariffQuatation(companyId, branchId, type, jwtToken) {
        return axios.get(`${quatation_url}searchSavedTariff`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                type: type
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        });
    }


    getAllServicesQuatation(companyId, branchId, jwtToken) {
        return axios.get(`${quatation_url}getAllServices`, {
            params: {
                companyId: companyId,
                branchId: branchId
            },
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
    };


    getSingleServiceQuatation(companyId, branchId, serviceId, tariffNo, cfsAmndNo, jwtToken) {
        return axios.get(`${quatation_url}getSingleService`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                serviceId: serviceId,
                tariffNo: tariffNo,
                cfsAmndNo: cfsAmndNo
            },
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
    };




























    // Credit Note
    getCreditNoteToSelect(companyId, branchId, searchvalue, jwtToken) {
        return axios.get(`${creditNote_url}getCreditNoteToSelect`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                searchValue: searchvalue,
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
    };



    getSelectedCreditNoteSearch(companyId, branchId, profitcentreId, creditNoteNo, invoiceNo, jwtToken) {

        return axios.get(`${creditNote_url}getSelectedCreditNoteSearch`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                creditNoteNo: creditNoteNo,
                invoiceNo: invoiceNo,
                profitCenterId: profitcentreId,
            },
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
    };




    saveCreditNote(companyId, branchId, userId, assesmentSheet, assesmentData, jwtToken) {

        const requestData = {
            creditNoteHdr: assesmentSheet,
            CreditNoteDtl: assesmentData
        }

        return axios.post(`${creditNote_url}saveCreditNote`, requestData, {
            params: {
                companyId: companyId,
                branchId: branchId,
                userId: userId,
                creditType: 'Hii'
            },
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });
    }





    processCreditNote(companyId, branchId, userId, requestData, creditType, jwtToken) {

        return axios.post(`${creditNote_url}processCreditNote`, requestData, {
            params: {
                companyId: companyId,
                branchId: branchId,
                userId: userId,
                creditType: 'Hii'
            },
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });
    }










    // Credit Note

    searchInvoiceNoForCreditNote(companyId, branchId, profitCentreId, searchValue, jwtToken) {
        return axios.get(`${creditNote_url}getInvoiceListForCreditNote`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                searchValue: searchValue,
                profitCentreId: profitCentreId
            },
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
    };



    handleGetselectedInvoiceNoData(companyId, branchId, profitCentreId, invoiceNo, jwtToken) {
        return axios.get(`${creditNote_url}getDataForSeletdInvoiceNo`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                invoiceNo: invoiceNo,
                profitCentreId: profitCentreId
            },
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
    };






























    // Export Proforma

    saveExportAssesmentContainerProForma(companyId, branchId, userId, invoiceType, assesmentSheet, assesmentData, jwtToken) {

        const requestData = {
            assesmentSheet: assesmentSheet,
            containerData: assesmentData
        }

        return axios.post(`${exportInvoice_url}saveExportAssesmentContainerProForma`, requestData, {
            params: {
                companyId: companyId,
                branchId: branchId,
                userId: userId,
                invoiceType: invoiceType
            },
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });
    }


    processExportAssesmentContainerProForma(companyId, branchId, userId, requestData, selectedInvoiceType, creditType, jwtToken) {

        return axios.post(`${exportInvoice_url}processExportAssesmentContainerProForma`, requestData, {
            params: {
                companyId: companyId,
                branchId: branchId,
                userId: userId,
                invoiceType: selectedInvoiceType,
                creditStatus: creditType
            },
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });
    }


    getAllCfInvSrvAnxListPro(companyId, branchId, assesmentId, assesmentLineNo, containerNo, profiCentreId, jwtToken) {
        return axios.get(`${exportInvoice_url}getAllCfInvSrvAnxListByAssesmentIdProForma`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                assesmentId: assesmentId,
                assesmentLineNo: assesmentLineNo,
                containerNo: containerNo,
                profiCentreId: profiCentreId
            },
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });
    }



    saveAddServiceContainerWiseProForma(companyId, branchId, userId, assesmentSheet, cfInvsrvanxData, jwtToken) {
        const requestData = {
            assesmentSheet: assesmentSheet,
            CfinvsrvanxPro: cfInvsrvanxData
        };
        return axios.post(`${exportInvoice_url}saveAddServiceContainerWiseProForma`, requestData, {
            params: {
                companyId: companyId,
                branchId: branchId,
                userId: userId
            },
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });
    }



    getAllContainerDetailsOfAssesmentIdProForma(companyId, branchId, assesmentId, profiCentreId, invoiceType, jwtToken) {
        return axios.get(`${exportInvoice_url}getAllContainerDetailsOfAssesmentIdProForma`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                assesmentId: assesmentId,
                profiCentreId: profiCentreId,
                invoiceType: invoiceType
            },
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });
    }



    getAllContainerListOfAssessMentSheetProForma(companyId, branchId, assesmentId, profiCentreId, invoiceType, jwtToken) {
        return axios.get(`${exportInvoice_url}getAllContainerListOfAssessMentSheetProForma`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                assesmentId: assesmentId,
                profiCentreId: profiCentreId,
                invoiceType: invoiceType
            },
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });
    }



    addServiceExportInvoiceServiceWiseProForma(companyId, branchId, userId, assesmentSheet, selectedContainers, jwtToken) {
        const requestData = {
            assesmentSheet: assesmentSheet,
            CfinvsrvanxPro: selectedContainers
        };
        return axios.post(`${exportInvoice_url}saveAddServiceServiceWisePro`, requestData, {
            params: {
                companyId: companyId,
                branchId: branchId,
                userId: userId
            },
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });
    }


    getAssesMentEntriesToSelectProForma(companyId, branchId, searchvalue, selectedInvoiceType, jwtToken) {
        return axios.get(`${exportInvoice_url}getAssesMentEntriesToSelectProForma`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                searchValue: searchvalue,
                transType: selectedInvoiceType
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
    };



    getSelectedAssesMentSearchProForma(companyId, branchId, profitcentreId, assesMentId, invoiceNo, sbTransId, selectedInvoiceType, jwtToken) {

        return axios.get(`${exportInvoice_url}getSelectedAssesMentSearchProForma`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                assesMentId: assesMentId,
                invoiceNo: invoiceNo,
                sbTransId: sbTransId,
                profitCenterId: profitcentreId,
                transType: selectedInvoiceType
            },
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
    };



    searchServicesForAddServiceProForma(companyId, branchId, searchvalue, commodity, containerSize, cargoType, assessmentSheet, jwtToken) {
        return axios.post(`${exportInvoice_url}searchServicesForAddServiceProForma`, assessmentSheet, {
            params: {
                companyId: companyId,
                branchId: branchId,
                searchValue: searchvalue,
                commodity: commodity,
                containerSize: containerSize,
                cargoType: cargoType
            },
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
    };














    // Ports
    getSelectedAssesMentSearch(companyId, branchId, profitcentreId, assesMentId, invoiceNo, sbTransId, selectedInvoiceType, jwtToken) {

        return axios.get(`${exportInvoice_url}getSelectedAssesMentSearch`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                assesMentId: assesMentId,
                invoiceNo: invoiceNo,
                sbTransId: sbTransId,
                profitCenterId: profitcentreId,
                transType: selectedInvoiceType
            },
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
    };


    // Ports
    getAssesMentEntriesToSelect(companyId, branchId, searchvalue, selectedInvoiceType, jwtToken) {
        return axios.get(`${exportInvoice_url}getAssesMentEntriesToSelect`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                searchValue: searchvalue,
                transType: selectedInvoiceType
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
    };






    processExportAssesmentContainer(companyId, branchId, userId, requestData, selectedInvoiceType, creditType, jwtToken) {

        return axios.post(`${exportInvoice_url}processExportAssesmentContainer`, requestData, {
            params: {
                companyId: companyId,
                branchId: branchId,
                userId: userId,
                invoiceType: selectedInvoiceType,
                creditStatus: creditType
            },
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });
    }



    getPartyTdsPercentage(companyId, branchId, partyId, jwtToken) {
        return axios.get(`${assesment_url}getTdsPerc`, {
            params: {
                cid: companyId,
                bid: branchId,
                val: partyId
            },
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });
    }


    addServiceExportInvoiceServiceWise(companyId, branchId, userId, assesmentSheet, selectedContainers, jwtToken) {
        const requestData = {
            assesmentSheet: assesmentSheet,
            Cfinvsrvanx: selectedContainers
        };
        return axios.post(`${exportInvoice_url}saveAddServiceServiceWise`, requestData, {
            params: {
                companyId: companyId,
                branchId: branchId,
                userId: userId
            },
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });
    }



    getAllContainerListOfAssessMentSheet(companyId, branchId, assesmentId, profiCentreId, invoiceType, jwtToken) {
        return axios.get(`${exportInvoice_url}getAllContainerListOfAssessMentSheet`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                assesmentId: assesmentId,
                profiCentreId: profiCentreId,
                invoiceType: invoiceType
            },
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });
    }






    getAllContainerDetailsOfAssesmentId(companyId, branchId, assesmentId, profiCentreId, invoiceType, jwtToken) {
        return axios.get(`${exportInvoice_url}getAllContainerDetailsOfAssesmentId`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                assesmentId: assesmentId,
                profiCentreId: profiCentreId,
                invoiceType: invoiceType
            },
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });
    }



    searchServicesForAddService(companyId, branchId, searchvalue, commodity, containerSize, cargoType, assessmentSheet, jwtToken) {
        return axios.post(`${exportInvoice_url}searchServicesForAddService`, assessmentSheet, {
            params: {
                companyId: companyId,
                branchId: branchId,
                searchValue: searchvalue,
                commodity: commodity,
                containerSize: containerSize,
                cargoType: cargoType
            },
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
    };


    addServiceExportInvoice(companyId, branchId, userId, assesmentSheet, cfInvsrvanxData, jwtToken) {
        const requestData = {
            assesmentSheet: assesmentSheet,
            Cfinvsrvanx: cfInvsrvanxData
        };
        return axios.post(`${exportInvoice_url}saveAddServiceContainerWise`, requestData, {
            params: {
                companyId: companyId,
                branchId: branchId,
                userId: userId
            },
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });
    }



    getAllCfInvSrvAnxList(companyId, branchId, assesmentId, assesmentLineNo, containerNo, profiCentreId, jwtToken) {
        return axios.get(`${exportInvoice_url}getAllCfInvSrvAnxListByAssesmentId`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                assesmentId: assesmentId,
                assesmentLineNo: assesmentLineNo,
                containerNo: containerNo,
                profiCentreId: profiCentreId
            },
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });
    }



    saveExportAssesmentContainer(companyId, branchId, userId, invoiceType, assesmentSheet, assesmentData, jwtToken) {

        const requestData = {
            assesmentSheet: assesmentSheet,
            containerData: assesmentData
        }

        return axios.post(`${exportInvoice_url}saveExportAssesmentContainer`, requestData, {
            params: {
                companyId: companyId,
                branchId: branchId,
                userId: userId,
                invoiceType: invoiceType
            },
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });
    }





    searchAssesmentBySelectedValue(searchParameter, jwtToken) {
        return axios.get(`${exportInvoice_url}searchAssesmentBySelectedValue`, {
            params: searchParameter,
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        });
    }




    searchSBNoOrContainerNo(companyId, branchId, searchValue, type, profitCentreId, invoiceType, jwtToken) {
        return axios.get(`${exportInvoice_url}getSbListOrContainer`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                searchValue: searchValue,
                type: type,
                profitCentreId: profitCentreId,
                invoiceType: invoiceType
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        });
    }


    searchExporterExportInvoice(companyId, branchId, searchValue, type, jwtToken) {
        return axios.get(`${exportInvoice_url}getPartyByTypeValue`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                searchValue: searchValue,
                type: type
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        });
    }









    downLoadTariffTemplate(dataTosend, jwtToken) {
        return axios.get(`${tariff_url}downLoadTariffReportTemlate`, {
            params: dataTosend,
            responseType: 'arraybuffer',
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });
    };


    uploadTariff(companyId, branchId, userId, cfsTariff, jwtToken) {
        const formData = new FormData();

        console.log(cfsTariff.selectedFile);

        if (cfsTariff.selectedFile) {
            formData.append('file', cfsTariff.selectedFile);
        }
        formData.append('companyId', companyId);
        formData.append('branchId', branchId);
        formData.append('userId', userId);
        formData.append('cfsTariff', JSON.stringify(cfsTariff));

        return axios.post(`${tariff_url}uploadTariff`, formData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                // 'Content-Type': 'multipart/form-data'
            }
        });
    };


    downLoadTariffReport(searchData, jwtToken) {
        return axios.get(`${tariff_url}downLoadTariffReport`, {
            params: searchData,
            responseType: 'arraybuffer',
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });
    };

    ammendTariff(companyid, branchId, userId, cfsTariff, jwtToken) {
        return axios.post(`${tariff_url}ammendTariff`, cfsTariff, {
            params: {
                companyId: companyid,
                branchId: branchId,
                userId: userId
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
    };


    addDetailCfsTariffService(companyid, branchId, cfsTariff, cfsTariffService, userId, jwtToken) {

        const requestData = {
            cfsTariff: cfsTariff,
            cfsTariffService: cfsTariffService
        };

        return axios.post(`${tariff_url}addDetailCfsTariffService`, requestData, {
            params: {
                companyId: companyid,
                branchId: branchId,
                userId: userId
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
    };


    addHeaderCfsTariff(companyid, branchId, userId, cfsTariff, type, jwtToken) {
        return axios.post(`${tariff_url}addHeaderCfsTariff`, cfsTariff, {
            params: {
                companyId: companyid,
                branchId: branchId,
                userId: userId,
                type: type
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
    };

    getSavedTariff(searchValue, jwtToken) {
        return axios.get(`${tariff_url}getSavedTariff`, {
            params: searchValue,
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        });
    }

    searchExporter(companyId, branchId, searchValue, type, jwtToken) {
        return axios.get(`${tariff_url}getPartyByTypeValue`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                searchValue: searchValue,
                type: type
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        });
    }


    searchSavedTariff(companyId, branchId, type, jwtToken) {
        return axios.get(`${tariff_url}searchSavedTariff`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                type: type
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        });
    }


    // getAllActiveServices...
    getAllServices(companyId, branchId, jwtToken) {
        return axios.get(`${tariff_url}getAllServices`, {
            params: {
                companyId: companyId,
                branchId: branchId
            },
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
    };


    getSingleService(companyId, branchId, serviceId, tariffNo, cfsAmndNo, jwtToken) {
        return axios.get(`${tariff_url}getSingleService`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                serviceId: serviceId,
                tariffNo: tariffNo,
                cfsAmndNo: cfsAmndNo
            },
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
    };





    addServiceExportInvoiceServiceWise1(companyId, branchId, userId, assesmentSheet, selectedContainers, jwtToken) {
        const requestData = {
            assesmentSheet: assesmentSheet,
            Cfinvsrvanx: selectedContainers
        };
        return axios.post(`${assesment_url}saveAddServiceServiceWise`, requestData, {
            params: {
                companyId: companyId,
                branchId: branchId,
                userId: userId
            },
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });
    }


    getAllContainerListOfAssessMentSheet1(companyId, branchId, assesmentId, profiCentreId, jwtToken) {
        return axios.get(`${assesment_url}getAllContainerListOfAssessMentSheet`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                assesmentId: assesmentId,
                profiCentreId: profiCentreId
            },
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });
    }

    addServiceExportInvoiceServiceWise2(companyId, branchId, userId, assesmentSheet, selectedContainers, jwtToken, type) {
        const requestData = {
            assesmentSheet: assesmentSheet,
            Cfinvsrvanx: selectedContainers
        };
        return axios.post(`${assesment_url}saveBondAddService`, requestData, {
            params: {
                companyId: companyId,
                branchId: branchId,
                userId: userId,
                type: type
            },
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });
    }

    addServiceExportInvoiceServiceWise4(companyId, branchId, userId, assesmentSheet, selectedContainers, jwtToken) {
        const requestData = {
            assesmentSheet: assesmentSheet,
            Cfinvsrvanx: selectedContainers
        };
        return axios.post(`${proforma_url}saveAddServiceServiceWise`, requestData, {
            params: {
                companyId: companyId,
                branchId: branchId,
                userId: userId
            },
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });
    }

    addServiceImportInvoice(companyId, branchId, userId, assesmentSheet, cfInvsrvanxData, jwtToken) {
        const requestData = {
            assesmentSheet: assesmentSheet,
            Cfinvsrvanx: cfInvsrvanxData
        };
        return axios.post(`${assesment_url}saveAddServiceContainerWise`, requestData, {
            params: {
                companyId: companyId,
                branchId: branchId,
                userId: userId
            },
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });
    }

    getAllCfInvSrvAnxList1(companyId, branchId, assesmentId, assesmentLineNo, containerNo, profiCentreId, jwtToken) {
        return axios.get(`${proforma_url}getAllCfInvSrvAnxListByAssesmentId`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                assesmentId: assesmentId,
                assesmentLineNo: assesmentLineNo,
                containerNo: containerNo,
                profiCentreId: profiCentreId
            },
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });
    }


    addServiceImportInvoice1(companyId, branchId, userId, assesmentSheet, cfInvsrvanxData, jwtToken) {
        const requestData = {
            assesmentSheet: assesmentSheet,
            Cfinvsrvanx: cfInvsrvanxData
        };
        return axios.post(`${proforma_url}saveAddServiceContainerWise`, requestData, {
            params: {
                companyId: companyId,
                branchId: branchId,
                userId: userId
            },
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });
    }

    getAllContainerListOfAssessMentSheet2(companyId, branchId, assesmentId, profiCentreId, jwtToken) {
        return axios.get(`${proforma_url}getAllContainerListOfAssessMentSheet`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                assesmentId: assesmentId,
                profiCentreId: profiCentreId
            },
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });
    }

    // addServiceExportInvoiceServiceWise2(companyId, branchId, userId, assesmentSheet, selectedContainers, jwtToken) {
    //     const requestData = {
    //         assesmentSheet: assesmentSheet,
    //         Cfinvsrvanx: selectedContainers
    //     };
    //     return axios.post(`${proforma_url}saveAddServiceServiceWise`, requestData, {
    //         params: {
    //             companyId: companyId,
    //             branchId: branchId,
    //             userId: userId
    //         },
    //         headers: {
    //             Authorization: `Bearer ${jwtToken}`
    //         }
    //     });
    // }

    addServiceExportInvoiceServiceWise3(companyId, branchId, userId, assesmentSheet, selectedContainers, jwtToken, type) {
        const requestData = {
            assesmentSheet: assesmentSheet,
            Cfinvsrvanx: selectedContainers
        };
        return axios.post(`${proforma_url}saveBondAddService`, requestData, {
            params: {
                companyId: companyId,
                branchId: branchId,
                userId: userId,
                type: type
            },
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });
    }


    addServiceAuctionInvoice(companyId, branchId, userId, assesmentSheet, cfInvsrvanxData, jwtToken) {
        const requestData = {
            assesmentSheet: assesmentSheet,
            Cfinvsrvanx: cfInvsrvanxData
        };
        return axios.post(`${auction_url}saveAddServiceContainerWise`, requestData, {
            params: {
                companyId: companyId,
                branchId: branchId,
                userId: userId
            },
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });
    }

    addServiceAuctionInvoiceServiceWise1(companyId, branchId, userId, assesmentSheet, selectedContainers, jwtToken) {
        const requestData = {
            assesmentSheet: assesmentSheet,
            Cfinvsrvanx: selectedContainers
        };
        return axios.post(`${auction_url}saveAddServiceServiceWise`, requestData, {
            params: {
                companyId: companyId,
                branchId: branchId,
                userId: userId
            },
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });
    }

    getAuctionAllContainerListOfAssessMentSheet1(companyId, branchId, assesmentId, profiCentreId, jwtToken) {
        return axios.get(`${auction_url}getAllContainerListOfAssessMentSheet`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                assesmentId: assesmentId,
                profiCentreId: profiCentreId
            },
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });
    }

    addServiceGeneralConInvoice(companyId, branchId, userId, assesmentSheet, cfInvsrvanxData, jwtToken, type) {
        const requestData = {
            assesmentSheet: assesmentSheet,
            Cfinvsrvanx: cfInvsrvanxData
        };
        return axios.post(`${assesment_url}saveGeneralAddServiceContainerWise`, requestData, {
            params: {
                companyId: companyId,
                branchId: branchId,
                userId: userId,
                type: type
            },
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });
    }

    getAllContainerListOfAssessMentSheetGeneralCon(companyId, branchId, assesmentId, profiCentreId, jwtToken) {
        return axios.get(`${assesment_url}getAllContainerListOfAssessMentSheetForGeneralCon`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                assesmentId: assesmentId,
                profiCentreId: profiCentreId
            },
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });
    }

    addServiceGeneralConInvoicePro(companyId, branchId, userId, assesmentSheet, cfInvsrvanxData, jwtToken, type) {
        const requestData = {
            assesmentSheet: assesmentSheet,
            Cfinvsrvanx: cfInvsrvanxData
        };
        return axios.post(`${proforma_url}saveGeneralAddServiceContainerWise`, requestData, {
            params: {
                companyId: companyId,
                branchId: branchId,
                userId: userId,
                type: type
            },
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });
    }


    getAllContainerListOfAssessMentSheetGeneralConPro(companyId, branchId, assesmentId, profiCentreId, jwtToken) {
        return axios.get(`${proforma_url}getAllContainerListOfAssessMentSheetForGeneralCon`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                assesmentId: assesmentId,
                profiCentreId: profiCentreId
            },
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });
    }


}
export default financeService;