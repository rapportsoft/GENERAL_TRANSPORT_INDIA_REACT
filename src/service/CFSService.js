import axios from "axios";
import ipaddress from "../Components/IpAddress";

const auth_url = `${ipaddress}auth/`;
const user_url = `${ipaddress}user/`;
const port_url = `${ipaddress}port/`;
const jar_url = `${ipaddress}jardetail/`;
const exportSb_url = `${ipaddress}ExportSbEntry/`;
const party_url = `${ipaddress}party/`;
const profitCentre_url = `${ipaddress}api/profitcentres/`;
const exportGateIn_url = `${ipaddress}gateIn/`;
const equipment_url = `${ipaddress}equipmentActivity/`;
const exportCarting_url = `${ipaddress}carting/`;
const impGrid_url = `${ipaddress}impGrid/`;
const yard_url = `${ipaddress}api/yardblockcells/`;
const stuffing_url = `${ipaddress}ExportStuffing/`;
const vessel_url = `${ipaddress}vessel/`;
const exportReport_url = `${ipaddress}exportReport/`;
const generalRec_url = `${ipaddress}api/receiving/`;



class CFSService {


    constructor(axiosInstance) {
        this.axios = axiosInstance;
    }






 downLoadDamageReport(searchData, jwtToken) {
        return axios.get(`${generalRec_url}downLoadDamageReport`, {
            params: searchData,
            responseType: 'arraybuffer',
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });
    };




    getDamageReport(searchcriteria, jwtToken) {
        return axios.get(`${generalRec_url}getDamageReport`, {
            params: searchcriteria,
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
    };



    uploadGeneralDocument(companyId, branchId, sbNo, sbTransId, hsbTransId, sbLineNo, sbDocumentUpload, removedList, userId, jwtToken) {

        const data = {
            FileResponseDTO: sbDocumentUpload,
            removedFiles: removedList
        }

        return axios.post(`${generalRec_url}saveGeneralDocumentUpload`, data, {
            params: {
                companyId,
                branchId,
                userId,
                sbNo,
                sbTransId,
                hsbTransId,
                sbLineNo, sbLineNo
            },
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
    };


    getDataForDocumentuploadGeneral(companyId, branchId, receivingId, gateInId, srNo, sbTransId, jwtToken) {


        console.log('  gateInId, srNo, sbTransId ', gateInId, srNo, sbTransId);

        return axios.get(`${generalRec_url}getDataForDocumentuploadGeneral`, {
            params: {
                companyId, branchId,
                profitcentreId: "profitcentreId",
                sbTransId: sbTransId,
                hSbTransId: gateInId,
                sbNo: receivingId,
                sbLineNo: srNo
            },
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
    };








































    uploadSbDocument(companyid, branchId, sbNo, sbTransId, hsbTransId, sbLineNo, sbDocumentUpload, removedList, userId, jwtToken) {

        const data = {
            FileResponseDTO: sbDocumentUpload,
            removedFiles: removedList
        }

        return axios.post(`${exportSb_url}saveSBDocumentUpload`, data, {
            params: {
                companyId: companyid,
                branchId: branchId,
                userId: userId,
                sbNo: sbNo,
                sbTransId: sbTransId,
                hsbTransId: hsbTransId,
                sbLineNo: sbLineNo,
                // removedList: removedList
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
    };


    getDataForDocumentupload(companyId, branchId, profitcentreId, sbTransId, hSbTransId, sbNo, sbLineNo, jwtToken) {
        return axios.get(`${exportSb_url}getDataForDocumentupload`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                profitcentreId: profitcentreId,
                sbTransId: sbTransId,
                hSbTransId: hSbTransId,
                sbNo: sbNo,
                sbLineNo: sbLineNo
            },
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
    };












    downLoadExportPortReturnReport(searchData, jwtToken) {
        return axios.get(`${exportReport_url}downLoadExportPortReturnReport`, {
            params: searchData,
            responseType: 'arraybuffer',
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });
    };



    downLoadExportGateInReport(searchData, jwtToken) {
        return axios.get(`${exportReport_url}downLoadExportGateInReport`, {
            params: searchData,
            responseType: 'arraybuffer',
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });
    };




    downLoadExportBackToTownReport(searchData, jwtToken) {
        return axios.get(`${exportReport_url}downLoadExportBackToTownReport`, {
            params: searchData,
            responseType: 'arraybuffer',
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });
    };


    saveEquipMentCommonCarting(equipment, userId, jwtToken) {
        return axios.post(`${equipment_url}saveEquipMentCommonCarting`, equipment, {
            params: {
                userId: userId
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        });
    };



    // Containerwise Stuffing Request Save
    saveExportStuffRequestContainer(companyid, branchId, userId, stuffRequest, jwtToken) {
        return axios.post(`${stuffing_url}saveExportStuffRequestContainer`, stuffRequest, {
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







    // Select JarBy JarId
    getJarDetailSelect(companyId, jarId, jwtToken) {
        return axios.get(`${jar_url}getJarDetailSelect`, {
            params: {
                companyId: companyId,
                jarId: jarId
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
    };




    searchSbNoForStuffing(companyId, branchId, searchValue, profitcentreId, stuffReqId, jwtToken) {
        return axios.get(`${stuffing_url}searchSbNoForStuffing`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                searchValue: searchValue,
                profitcentreId: profitcentreId,
                stuffReqId: stuffReqId
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
    };


    searchContainerNoForStuffingContainerWise(searchParameter, jwtToken) {
        return axios.get(`${stuffing_url}searchContainerNoForStuffingContainerWise`, {
            params: searchParameter,
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
    };


    // searchContainerNoForStuffingContainerWise(companyId, branchId, searchValue, profitcentreId,jwtToken) {
    //     return axios.get(`${stuffing_url}searchContainerNoForStuffingContainerWise`, {
    //         params: {
    //             companyId: companyId,
    //             branchId: branchId,
    //             searchValue: searchValue,
    //             profitcentreId: profitcentreId
    //         },
    //         headers: {
    //             'Authorization': `Bearer ${jwtToken}`
    //         }
    //     })
    // };


















    // Ports
    searchVessel(companyId, branchId, searchValue, jwtToken) {
        return axios.get(`${vessel_url}searchVoyage`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                searchValue: searchValue
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
    };











    // To UserS To Select
    saveExportStuffRequest(companyid, branchId, userId, stuffRequest, jwtToken) {
        return axios.post(`${stuffing_url}saveExportStuffRequest`, stuffRequest, {
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


    searchContainerNoForStuffing(searchParameter, jwtToken) {
        return axios.get(`${stuffing_url}searchContainerNoForStuffing`, {
            params: searchParameter,
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
    };


    // To UserS To Select
    getAllUsersToSelect(companyid, branchId, jwtToken) {
        return axios.get(`${user_url}getAllUsersSelect`, {
            params: {
                companyId: companyid,
                branchId: branchId
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
    };

    // To UserS To Select
    getAllUsersRights(companyid, branchId, userId, jwtToken) {
        return axios.get(`${user_url}getAllUsersRights`, {
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

    // To UserS To Select
    saveUserRights(companyid, branchId, userId, rightsUserId, userRightsList, jwtToken) {
        return axios.post(`${user_url}saveUserRights`, userRightsList, {
            params: {
                companyId: companyid,
                branchId: branchId,
                userId: userId,
                rightsUserId: rightsUserId
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
    };


    getNotSavedEntriesRights(companyId, branchId, searchvalue, userId, jwtToken) {
        return axios.get(`${user_url}getNotSavedEntriesRights`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                userId: userId,
                searchValue: searchvalue
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
    };



    getDataForOutOfCharge(companyId, branchId, profitcentreId, sbTransId, hSbTransId, sbNo, jwtToken) {
        return axios.get(`${exportSb_url}getDataForOutOfCharge`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                profitcentreId: profitcentreId,
                sbTransId: sbTransId,
                hSbTransId: hSbTransId,
                sbNo: sbNo,
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
    };



    updateOutOfCharge(companyId, branchId, leoData, userId, jwtToken) {
        return axios.post(`${exportSb_url}updateOutOfCharge`, leoData, {
            params: {
                companyId: companyId,
                branchId: branchId,
                userId: userId
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        });
    };



    saveImpExpGrid(yardGrid, userId, jwtToken, cartingObject) {

        const requestData = {
            yardGrid: yardGrid,
            cartingObject: cartingObject
        };

        return axios.post(`${impGrid_url}saveImpExpGrid`, requestData, {
            params: {
                userId: userId
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        });
    };


    // Ports
    searchYardCells(companyId, branchId, searchvalue, jwtToken) {
        return axios.get(`${yard_url}searchYardCells`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                searchValue: searchvalue
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
    };





    deleteYardCell(companyId, branchId, processTransId, lineNo, subSrNo, userId, jwtToken) {
        return axios.get(`${impGrid_url}deleteYardCell`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                cartingTransId: processTransId,
                cartingLineId: lineNo,
                subLineNo: subSrNo,
                userId: userId
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
    };

    getYardCellBySubLine(companyId, branchId, processTransId, lineNo, subSrNo, jwtToken) {
        return axios.get(`${impGrid_url}getimpexpGridBySubLine`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                cartingTransId: processTransId,
                cartingLineId: lineNo,
                subLineNo: subSrNo
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
    };







    getYardCellByCartingId(companyId, branchId, cartingTransId, cartingLineId, jwtToken) {
        return axios.get(`${impGrid_url}getYardCellByCartingId`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                cartingTransId: cartingTransId,
                cartingLineId: cartingLineId,
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
    };






    getAllEquipmentsCommonCarting(companyId, branchId, cartingTransId, profitCenterId, gateInId, jwtToken) {
        return axios.get(`${equipment_url}getAllEquipmentsCommonCarting`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                cartingTransId: cartingTransId,
                profitCenterId: profitCenterId,
                gateInId: gateInId
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
    };

    getAllEquipmentsCarting(companyId, branchId, processId, profitCenterId, cartingTransId, gateInId, sbTransId, sbNo, jwtToken) {
        return axios.get(`${equipment_url}getAllEquipmentsCarting`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                processId: processId,
                profitCenterId: profitCenterId,
                gateInId: gateInId,
                sbTransId: sbTransId,
                sbNo: sbNo,
                cartingTransId: cartingTransId
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
    };







    // Ports
    getSelectedCartingEntry(companyId, branchId, cartingTransId, cartingLineId, sbNo, profitcentreId, jwtToken) {

        return axios.get(`${exportCarting_url}getSelectedCartingEntry`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                cartingTransId: cartingTransId,
                cartingLineId: cartingLineId,
                sbNo: sbNo,
                profitCenterId: profitcentreId
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
    };


    // Ports
    getCartingEntriesToSelect(companyId, branchId, searchvalue, jwtToken) {
        return axios.get(`${exportCarting_url}getCartingEntriesToSelect`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                searchValue: searchvalue
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
    };















    addExportCarting(companyId, branchId, exportCarting, jwtToken, userId, status) {

        return axios.post(`${exportCarting_url}addExportCarting`, exportCarting, {
            params: {
                companyId: companyId,
                branchId: branchId,
                userId: userId,
                status: status
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        });

    }




    // addExportCarting(companyId, branchId, exportCarting, jwtToken, userId) {

    //     return axios.post(`${exportCarting_url}addExportCarting`, exportCarting, {
    //         params: {
    //             companyId: companyId,
    //             branchId: branchId,
    //             userId: userId
    //         },
    //         headers: {
    //             'Authorization': `Bearer ${jwtToken}`
    //         }
    //     });

    // }







    getGateInEntryFromVehicleNo(companyId, branchId, vehicleNo, profitCenter, jwtToken) {
        return axios.get(`${exportGateIn_url}getGateInEntryFromVehicleNo`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                vehicleNo: vehicleNo,
                profitCenter: profitCenter
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        });
    }

    // VehiclNos
    searchVehicleNos(companyId, branchId, searchvalue, profitCenterId, jwtToken) {
        return axios.get(`${exportGateIn_url}searchVehicleNos`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                searchValue: searchvalue,
                profitCenterId: profitCenterId
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
    };


    getAllEquipmentsCommon(companyId, branchId, processId, profitCenterId, gateInId, jwtToken) {
        return axios.get(`${equipment_url}getAllEquipmentsCommon`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                processId: processId,
                profitCenterId: profitCenterId,
                gateInId: gateInId
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
    };




    getSavedGateInRecords(companyId, branchId, profitCenterId, gateInId, jwtToken) {
        return axios.get(`${exportGateIn_url}getSavedGateInRecords`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                profitCenterId: profitCenterId,
                gateInId: gateInId
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
    };




    // Ports
    searchExportMain(searchCriteria, jwtToken) {
        return axios.get(`${exportSb_url}searchExportMain`, {
            params: searchCriteria,
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
    };


    // Ports
    searchSbNosToGateIn(companyId, branchId, searchvalue, jwtToken) {
        return axios.get(`${exportSb_url}searchSbNosToGateIn`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                searchValue: searchvalue
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
    };





    getEquipment(companyId, branchId, processId, profitCenterId, gateInId, sbTransId, sbNo, equipMent, srNo, jwtToken) {
        return axios.get(`${equipment_url}getEquipments`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                processId: processId,
                profitCenterId: profitCenterId,
                gateInId: gateInId,
                sbTransId: sbTransId,
                sbNo: sbNo,
                srNo: srNo,
                equipMent: equipMent

            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
    };


    deleteEquipment(companyId, branchId, processId, profitCenterId, gateInId, sbTransId, sbNo, equipMent, srNo, userId, jwtToken) {
        return axios.get(`${equipment_url}deleteEquipment`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                processId: processId,
                profitCenterId: profitCenterId,
                gateInId: gateInId,
                sbTransId: sbTransId,
                sbNo: sbNo,
                srNo: srNo,
                equipMent: equipMent,
                userId: userId
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
    };


    saveEquipMent(equipment, userId, jwtToken) {
        return axios.post(`${equipment_url}saveEquipMent`, equipment, {
            params: {
                userId: userId
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        });
    };





    saveEquipMentCommon(equipment, userId, jwtToken) {
        return axios.post(`${equipment_url}saveEquipMentCommon`, equipment, {
            params: {
                userId: userId
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        });
    };



    getEquipmentVendor(companyId, branchId, jwtToken) {
        return axios.get(`${equipment_url}getVendor`, {
            params: {
                cid: companyId,
                bid: branchId
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
    };


    getAllEquipments(companyId, branchId, processId, profitCenterId, gateInId, sbTransId, sbNo, jwtToken) {
        return axios.get(`${equipment_url}getAllEquipments`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                processId: processId,
                profitCenterId: profitCenterId,
                gateInId: gateInId,
                sbTransId: sbTransId,
                sbNo: sbNo,
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
    };




    // Ports
    getSelectedGateInEntry(companyId, branchId, gateInId, sbTransId, sbNo, profitCenterId, jwtToken) {

        return axios.get(`${exportGateIn_url}getSelectedGateInEntry`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                sbTransId: sbTransId,
                gateInId: gateInId,
                sbNo: sbNo,
                profitCenterId: profitCenterId
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
    };


    // Ports
    // getGateInEntriesToSelect(companyId, branchId, searchvalue, jwtToken) {
    //     return axios.get(`${exportGateIn_url}getGateInEntriesToSelect`, {
    //         params: {
    //             companyId: companyId,
    //             branchId: branchId,
    //             searchValue: searchvalue
    //         },
    //         headers: {
    //             'Authorization': `Bearer ${jwtToken}`
    //         }
    //     })
    // };

    getGateInEntriesToSelect(companyId, branchId, searchvalue, processId, jwtToken) {
        return axios.get(`${exportGateIn_url}getGateInEntriesToSelect`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                searchValue: searchvalue,
                processId: processId
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
    };



    addExportGateIn(companyId, branchId, exportGateIn, jwtToken, userId) {

        return axios.post(`${exportGateIn_url}addExportGateIn`, exportGateIn, {
            params: {
                companyId: companyId,
                branchId: branchId,
                userId: userId
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        });

    }




    checkDuplicateSbNoCargoGateIn(companyId, branchId, sbNo, gateInId, jwtToken) {
        return axios.get(`${exportSb_url}getSbCargoGateIn`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                gateInId: gateInId,
                sbNo: sbNo
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        });
    }



    getProgitCenters(companyId, branchId, jwtToken) {
        return axios.get(`${profitCentre_url}getProgitCenters`, {
            params: {
                companyId: companyId,
                branchId: branchId,
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        });
    }

    // Ports
    // getGateInEntriesToSelect(companyId, branchId, searchvalue, jwtToken) {
    //     return axios.get(`${exportGateIn_url}getGateInEntriesToSelect`, {
    //         params: {
    //             companyId: companyId,
    //             branchId: branchId,
    //             searchValue: searchvalue
    //         },
    //         headers: {
    //             'Authorization': `Bearer ${jwtToken}`
    //         }
    //     })
    // };













    // Ports
    getCustomerCodes(companyId, branchId, code1, code2, jwtToken) {
        return axios.get(`${party_url}getCustomerCodes`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                code1: code1,
                code2: code2
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
    };





    // Ports
    getSelectedSbEntry(companyId, branchId, sbTransId, hsbTransId, sbNo, profitCenterId, jwtToken) {
        return axios.get(`${exportSb_url}getSelectedSbEntry`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                sbTransId: sbTransId,
                hsbTransId: hsbTransId,
                sbNo: sbNo,
                profitCenterId: profitCenterId
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
    };



    // Ports
    getSbEntriesToSelect(companyId, branchId, searchvalue, jwtToken) {
        return axios.get(`${exportSb_url}getSbEntriesToSelect`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                searchValue: searchvalue
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
    };



    // Ports
    getPortToSelect(companyId, branchId, jobPrefix, jwtToken) {
        return axios.get(`${port_url}getPortListToSelect`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                jobPrefix: jobPrefix
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
    };


    checkDuplicateSbNo(companyId, branchId, finYear, profitCenterId, sbTransId, sbNo, jwtToken) {
        return axios.get(`${exportSb_url}checkDuplicateSbNo`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                sbTransId: sbTransId,
                profitCenterId: profitCenterId,
                finYear: finYear,
                sbNo: sbNo
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        });
    }





    addExportSbEntry(companyId, branchId, exportSbEntry, exportSbCargoEntry, jwtToken, userId) {

        const requestData = {
            exportSbEntry: exportSbEntry,
            exportSbCargoEntry: exportSbCargoEntry
        };

        return axios.post(`${exportSb_url}addExportSbEntry`, requestData, {
            params: {
                companyId: companyId,
                branchId: branchId,
                userId: userId
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        });

    }




    getProgitCenterById(companyId, branchId, profitCenterId, jwtToken) {
        return axios.get(`${profitCentre_url}getDataById`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                profitcentreId: profitCenterId
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        });
    }


    // Export Sb Entry

    searchExporter(companyId, branchId, searchValue, jwtToken, type) {
        return axios.get(`${party_url}getPartyByType`, {
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

    // Select Tags
    getPortByPortCodeAndPortTransId(companyId, branchId, portCode, portTransId, jwtToken) {
        return axios.get(`${port_url}getSinglePort`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                portCode: portCode,
                portTransId: portTransId
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
    };

    // Select JarBy JarId
    getjarByJarId(companyId, jarId, jwtToken) {
        return axios.get(`${jar_url}getJarDetail`, {
            params: {
                companyId: companyId,

                jarId: jarId
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
    };


    // Select JarBy JarId
    getCityStateCountry(companyId, jwtToken) {
        return axios.get(`${jar_url}getCityStateCountry`, {
            params: {
                companyId: companyId
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
    };


    // Select Tags
    getSelectTags(companyId, branchId, jwtToken) {
        return axios.get(`${port_url}getSelectTags`, {
            params: {
                companyId: companyId,
                branchId: branchId
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
    };

    // Ports
    searchPorts(params, jwtToken) {
        return axios.get(`${port_url}searchPorts`, {
            params: params,
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
    };

    // AddPorts
    addPort(port, user, jwtToken) {
        return axios.post(`${port_url}addPort`, port, {
            params: {
                user: user
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
    };

    // UpdatePort
    updatePort(port, user, jwtToken) {
        return axios.patch(`${port_url}updatePort`, port, {
            params: {
                user: user
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
    };

    // DeletePort
    deletePort(companyId, branchId, portCode, portTransId, user, jwtToken) {
        return axios.delete(`${port_url}deletePort`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                portCode: portCode,
                portTransId: portTransId,
                user: user
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
    };








    // To UserS To Select
    getAllUsersToSelect(companyid, branchId, jwtToken) {
        return axios.get(`${user_url}getAllUsersSelect`, {
            params: {
                companyId: companyid,
                branchId: branchId
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
    };

    // To UserS To Select
    getAllUsersRights(companyid, branchId, userId, jwtToken) {
        return axios.get(`${user_url}getAllUsersRights`, {
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

    // To UserS To Select
    saveUserRights(companyid, branchId, userId, rightsUserId, userRightsList, jwtToken) {
        return axios.post(`${user_url}saveUserRights`, userRightsList, {
            params: {
                companyId: companyid,
                branchId: branchId,
                userId: userId,
                rightsUserId: rightsUserId
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
    };


    // To Get All Companies
    getAllCompanies() {
        return axios.get(`${auth_url}getAllCompanies`)
    };

    // To Get Branches By Companies
    getBranchByCompany(companyId) {
        return axios.get(`${auth_url}getBranchByCompany`, { params: { companyId: companyId } })
    };

    // To Get Branches By Companies
    login(data, otp) {
        return axios.post(`${auth_url}login/${otp}`, data, {
            headers: {
                'React-Page-Name': 'Login'
            }
        })
    };

    // sendOtpForForgotPassword
    updatePassword(companyId, branchId, userId, password, jwtToken) {


        const requestData = {
            params: {
                companyId: companyId,
                branchId: branchId,
                userId: userId,
                password: password,
            }
        };

        return axios.get(`${auth_url}UpdatePassword`, requestData)
    };


    getAllCompanies1(reactPageName, jwtToken) {
        return axios.get(`${auth_url}company`, { headers: { 'React-Page-Name': reactPageName } });
    };

    // getBranchesOfCompany2(companyId, reactPageName, jwtToken) {
    //     return axios.get(`${auth_url}${companyId}/branch`, { headers: { 'React-Page-Name': reactPageName } });
    // };

    getBranchesOfCompany2(companyId, reactPageName, jwtToken) {
        return axios.get(`${auth_url}branch`, { headers: { 'React-Page-Name': reactPageName } });
    };


    //getUserByUserId
    getUserByUserId(compId, branchId, userId) {
        // console.log("In service " + userId);
        return axios.get(`${auth_url}${compId}/${branchId}/${userId}/findByUserId`)
    };
    // sendOtpForForgotPassword
    sendOtpForgotPassword(companyId, branchId, userId, mobileNo) {
        const requestData = {
            params: {
                companyId: companyId,
                branchId: branchId,
                userId: userId,
                mobileNo: mobileNo,
            }
        };
        return axios.get(`${auth_url}passwordChange`, requestData)
    };

    confirmOtp(companyId, branchId, userId, otp) {

        const requestData = {
            params: {
                companyId: companyId,
                branchId: branchId,
                userId: userId,
                otp: otp,
            }
        };
        return axios.get(`${auth_url}checkOtpForPasswordChange`, requestData)
    };

}
export default CFSService;