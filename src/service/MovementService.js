import axios from "axios";
import ipaddress from "../Components/IpAddress";



const movement_url = `${ipaddress}ExportMovement/`;
const party_url = `${ipaddress}party/`;
const iso_url = `${ipaddress}IsoContainer/`;
const exportGateIn_url = `${ipaddress}gateIn/`;
const port_url = `${ipaddress}port/`;
const tally_url = `${ipaddress}stuffTally/`;
const transfer_url = `${ipaddress}sbTransfer/`;
const hub_url = `${ipaddress}Hub/`;
const exportRepot_url = `${ipaddress}exportReport/`;
const impSplOut_url = `${ipaddress}api/gateOutController/`;


class MovementService {

    constructor(axiosInstance) {
        this.axios = axiosInstance;
    }



// SPL Delivery...
getSelectedSplOutEntry(companyId, branchId, gateOutId, profitCenterId, jwtToken) {

    return axios.get(`${impSplOut_url}getSelectedSplOutEntry`, {
        params: {
            companyId: companyId,
            branchId: branchId,          
            gateOutId: gateOutId,          
            profitCenterId: profitCenterId
        },
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    })
};


// Ports
getSplOutToSelect(companyId, branchId, searchvalue, jwtToken) {
    return axios.get(`${impSplOut_url}getSplOutToSelect`, {
        params: {
            companyId: companyId,
            branchId: branchId,
            searchValue: searchvalue,
        },
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    })
};


saveGateOutSPLImport(companyid, branchId, userId, saveGateOutSPLImport, jwtToken) {
    return axios.post(`${impSplOut_url}saveGateOutSPLImport`, saveGateOutSPLImport, {
        params: {
            companyId: companyid, 
            branchId: branchId, 
            user: userId           
        },
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    })
};


    searchGatePassNoForSPLImport(companyId, branchId, searchValue, profitcentreId, jwtToken) {
        return axios.get(`${impSplOut_url}searchGatePassNoForSPLImport`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                gatePassNo: searchValue,
                profitcentreId: profitcentreId
            },
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
    };

    selectGatePassNoForSPLImport(companyId, branchId, searchValue, profitcentreId, jwtToken) {
        return axios.get(`${impSplOut_url}selectGatePassNoForSPLImport`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                gatePassNo: searchValue,
                profitcentreId: profitcentreId
            },
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
    };
















































    searchValuesInputSearch(companyId, branchId, searchValue, jwtToken, type) {
        return axios.get(`${exportRepot_url}searchValuesInputSearch`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                searchValue: searchValue,
                type: type
            },
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });
    }



    addExportAudit(companyId, branchId, requestData, jwtToken, type, userId, sbNo, containerNo) {        

        return axios.post(`${exportRepot_url}saveExporAudit`, requestData, {
            params: {
                companyId: companyId,
                branchId: branchId,
                userId: userId,
                type: type, sbNo: sbNo, containerNo: containerNo
            },
            headers: {
                Authorization : `Bearer ${jwtToken}`
            }
        });

    }





    searchAuditMain(searchCriteria, jwtToken) {
        return axios.get(`${exportRepot_url}exportAuditTrailSearh`, {
            params: searchCriteria,
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
    };














    // Hub Main Search
    // Ports
    searchHubMain(searchCriteria, jwtToken) {
        return axios.get(`${hub_url}searchHubMain`, {
            params: searchCriteria,
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
    };

    downLoadHubReport(searchData, jwtToken) {
        return axios.get(`${hub_url}downLoadHubReport`, {
            params: searchData,
            responseType: 'arraybuffer',
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });
    };




// HUB Gate Pass
getSelectedGatePassEntry(companyId, branchId, gatePassId, jwtToken) {
    return axios.get(`${hub_url}getSelectedGatePassEntry`, {
        params: {
            companyId: companyId,
            branchId: branchId,
            gatePassId: gatePassId           
        },
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    })
};

getGatePassEntriesToSelect(companyId, branchId, searchvalue, profitCenterId, jwtToken) {
        return axios.get(`${hub_url}getGatePassEntriesToSelect`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                searchValue: searchvalue,
                profitCenterId: profitCenterId
            },
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
    };



saveHubGatePass(companyid, branchId, userId, stuffRequest, jwtToken) {
    return axios.post(`${hub_url}saveHubGatePass`, stuffRequest, {
        params: {
            companyId: companyid,
            branchId: branchId,
            userId: userId           
        },
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    })
};



searchContainerNoForHubGatePass(companyId, branchId, searchValue, profitCenterId, jwtToken) {
    return axios.get(`${hub_url}searchContainerNoForHubGatePass`, {
        params: {
            companyId: companyId,
            branchId: branchId,
            containerNo: searchValue,
            profitcentreId : profitCenterId
        },
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    });
};

searchContainerNoForHubGatePassSelect(companyId, branchId, searchValue, profitCenterId, jwtToken) {
    return axios.get(`${hub_url}searchContainerNoForHubGatePassSelect`, {
        params: {
            companyId: companyId,
            branchId: branchId,
            containerNo: searchValue,
            profitcentreId : profitCenterId
        },
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    });
};


















// HUB CLP

getSelectedStuffingEntry(companyId, branchId, stuffingReqId, jwtToken) {
    return axios.get(`${hub_url}getSelectedStuffingEntry`, {
        params: {
            companyId: companyId,
            branchId: branchId,
            stuffingReqId: stuffingReqId           
        },
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    })
};

getStuffingEntriesToSelect(companyId, branchId, searchvalue, profitCenterId, jwtToken) {
        return axios.get(`${hub_url}getStuffingEntriesToSelect`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                searchValue: searchvalue,
                profitCenterId: profitCenterId
            },
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
    };

// Hub Stuffing Request Save
saveHubStuffRequestContainer(companyid, branchId, userId, stuffRequest, jwtToken) {
    return axios.post(`${hub_url}saveHubStuffRequestContainer`, stuffRequest, {
        params: {
            companyId: companyid,
            branchId: branchId,
            userId: userId           
        },
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    })
};






searchIgmNoForStuffing(companyId, branchId, searchValue, profitcentreId, stuffReqId,jwtToken) {
    return axios.get(`${hub_url}searchIgmNoForStuffing`, {
        params: {
            companyId: companyId,
            branchId: branchId,
            searchValue: searchValue,
            profitcentreId: profitcentreId,
            stuffReqId:stuffReqId
        },
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    })
};

  // Ports
  getPortToSelectNew(companyId, branchId, jobPrefix, jwtToken) {
    return axios.get(`${port_url}getPortListToSelectNew`, {
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

searchContainerNoForHubCLP(companyId, branchId, searchValue, profitCenterId, jwtToken) {
    return axios.get(`${hub_url}searchContainerNoForHubCLP`, {
        params: {
            companyId: companyId,
            branchId: branchId,
            containerNo: searchValue,
            profitcentreId : profitCenterId
        },
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    });
};


























// HUB


addHubGateIn(companyId, branchId, exportGateIn, jwtToken, userId) {

    return axios.post(`${hub_url}addHubGateIn`, exportGateIn, {
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

getSelectedGateInEntryHub(companyId, branchId, gateInId, hubTransId, igmNo, profitCenterId, jwtToken) {

    return axios.get(`${hub_url}getSelectedGateInEntry`, {
        params: {
            companyId: companyId,
            branchId: branchId,
            hubTransId: hubTransId,
            gateInId: gateInId,
            igmNo: igmNo,
            profitCenterId: profitCenterId
        },
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    })
};

getGateInEntriesToSelectHub(companyId, branchId, searchvalue, processId, profitCenterId, jwtToken) {
    return axios.get(`${hub_url}getGateInEntriesToSelect`, {
        params: {
            companyId: companyId,
            branchId: branchId,
            searchValue: searchvalue,
            processId: processId,
            profitCenterId: profitCenterId 
        },
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    })
};



// HUB
checkDuplicateIgmNoCargoGateIn(companyId, branchId, hubTransId, gateInId, igmNo, profitCentreId, jwtToken) {
return axios.get(`${hub_url}getIgmCargoGateIn`, {
    params: {
        companyId: companyId,
        branchId: branchId,
        gateInId: gateInId,
        hubTransId: hubTransId,
        igmNo: igmNo,
        profitCentreId: profitCentreId
    },
    headers: {
        Authorization : `Bearer ${jwtToken}`
    }
});
}


// HUB
searchIgmNoToGateIn(companyId, branchId, profitCentreId, searchvalue, gateInId, jwtToken) {
return axios.get(`${hub_url}searchIgmNosToGateIn`, {
    params: {
        companyId: companyId,
        branchId: branchId,
        searchValue: searchvalue,
        profitCentreId: profitCentreId,
        gateInId: gateInId
    },
    headers: {
        Authorization : `Bearer ${jwtToken}`
    }
})
};




getSelectedHubEntry(companyId, branchId, profitCenterId, transId, igmNo, jwtToken) {

return axios.get(`${hub_url}getSelectedHubEntry`, {
    params: {
        companyId: companyId,
        branchId: branchId,          
        transId: transId,          
        profitCenterId: profitCenterId,
        igmNo: igmNo
    },
    headers: {
        Authorization: `Bearer ${jwtToken}`
    }
})
};


getHubEntriesToSelect(companyId, branchId, searchvalue, profitCenterId, jwtToken) {
return axios.get(`${hub_url}getHubEntriesToSelect`, {
    params: {
        companyId: companyId,
        branchId: branchId,
        searchValue: searchvalue,
        profitCenterId: profitCenterId
    },
    headers: {
        Authorization: `Bearer ${jwtToken}`
    }
})
};





addHubDocumentEntry(companyId, branchId, userId, hubEntry, jwtToken) {
         return axios.post(`${hub_url}addHubDocumentEntry`, hubEntry, {
        params: {
            companyId: companyId,
            branchId: branchId,
            userId: userId
        },
        headers: {
            Authorization : `Bearer ${jwtToken}`
        }
    });
}











































// Ports
getSelectedTransferEntry(companyId, branchId, profitCenterId, sbChangeTransId, srNo, jwtToken) {

    return axios.get(`${transfer_url}getSelectedTransferEntry`, {
        params: {
            companyId: companyId,
            branchId: branchId,          
            sbChangeTransId: sbChangeTransId,          
            profitCenterId: profitCenterId,
            srNo: srNo
        },
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    })
};


// Ports
getTransferEntriesToSelect(companyId, branchId, searchvalue, profitCenterId, jwtToken) {
    return axios.get(`${transfer_url}getTransferEntriesToSelect`, {
        params: {
            companyId: companyId,
            branchId: branchId,
            searchValue: searchvalue,
            profitCenterId: profitCenterId
        },
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    })
};






















    addExportTransfer(companyId, branchId, exportTransfer, exportTransferDetail, userId, jwtToken) {

        const requestData = {
            exportTransfer: exportTransfer,
            exportTransferDetail: exportTransferDetail
        };

        return axios.post(`${transfer_url}addExportTransfer`, requestData, {
            params: {
                companyId: companyId,
                branchId: branchId,
                userId: userId
            },
            headers: {
                Authorization : `Bearer ${jwtToken}`
            }
        });
    }

    gateTateInEntriesFromSbNo(companyId, branchId,  profitcentreId, sbNo, sbLineNo, sbTransId, jwtToken){

        return axios.get(`${transfer_url}gateTateInEntriesFromSbNo`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                profitcentreId: profitcentreId,
                sbNo: sbNo,
                sbLineNo: sbLineNo,
                sbTransId: sbTransId
            },
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })

    }


// SB transfer process
searchSbNoForTransfer(companyId, branchId, searchValue, profitcentreId, type,jwtToken) {
    return axios.get(`${transfer_url}searchSbNoForTransfer`, {
        params: {
            companyId: companyId,
            branchId: branchId,
            searchValue: searchValue,
            profitcentreId: profitcentreId,
            type: type
        },
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    })
};




    // 

    searchContainerNoForMovementWork(companyid, branchId, searchValue, profitcentreId, movementType, jwtToken) {
        return axios.get(`${movement_url}searchContainerNoForMovementWork`, {
            params: {
                companyId: companyid,
                branchId: branchId,
                containerNo: searchValue ,
                profitcentreId: profitcentreId  ,
                movementType: movementType      
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
    };

// Ports
getSelectedBufferStuffingEntry(companyId, branchId, stuffTallyId, profitCenterId, containerNo, jwtToken) {

    return axios.get(`${tally_url}getSelectedBufferStuffingEntry`, {
        params: {
            companyId: companyId,
            branchId: branchId,          
            stuffTallyId: stuffTallyId,          
            profitCenterId: profitCenterId,
            containerNo: containerNo
        },
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    })
};


// Ports
getBufferStuffingToSelect(companyId, branchId, searchvalue, jwtToken) {
    return axios.get(`${tally_url}getBufferStuffingToSelect`, {
        params: {
            companyId: companyId,
            branchId: branchId,
            searchValue: searchvalue,
        },
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    })
};




    // To UserS To Select
    saveExportTallyBuffer(companyid, branchId, userId, stuffTallyBuffer, jwtToken) {
    return axios.post(`${tally_url}saveExportTallyBuffer`, stuffTallyBuffer, {
        params: {
            companyId: companyid,
            branchId: branchId,
            userId: userId           
        },
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    })
};


    searchContainerNoForStufingTallyBuffer(companyId, branchId, searchValue, profitcentreId, jwtToken) {
        return axios.get(`${tally_url}searchContainerNoBuffer`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                containerNo: searchValue,
                profitcentreId: profitcentreId
            },
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
    };



    searchSbNoForBuffer(companyId, branchId, searchValue, profitcentreId, stuffTallyId, sbType,jwtToken) {
        return axios.get(`${tally_url}searchSbNoForBuffer`, {
            params: {
                companyId: companyId,
                branchId: branchId,
                searchValue: searchValue,
                profitcentreId: profitcentreId,
                stuffTallyId: stuffTallyId,
                sbType: sbType
            },
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
    };




    searchPortsData(companyId, branchId, searchValue, jwtToken) {
        return axios.get(`${port_url}getPortListToSelectTally`, {
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
    







// Ports
getSelectedGateInEntry(companyId, branchId, gateInId, profitCenterId, processId, jwtToken) {

    return axios.get(`${exportGateIn_url}getSavedGateInRecordsBuffer`, {
        params: {
            companyId: companyId,
            branchId: branchId,          
            gateInId: gateInId,          
            profitCenterId: profitCenterId,
            processId: processId
        },
        headers: {
            'Authorization': `Bearer ${jwtToken}`
        }
    })
};


// Ports
getGateInEntriesToSelect(companyId, branchId, searchvalue, processId, jwtToken) {
    return axios.get(`${exportGateIn_url}getGateInEntriesToSelectNew`, {
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



// Containerwise Stuffing Request Save
saveExportGateInBuffer(companyid, branchId, userId, ExportGateIn, jwtToken, woNo) {
    return axios.post(`${exportGateIn_url}addGateInBuffer`, ExportGateIn, {
        params: {
            companyId: companyid,
            branchId: branchId,
            userId: userId,
            woNo: woNo           
        },
        headers: {
            'Authorization': `Bearer ${jwtToken}`
        }
    })
};



    searchByIsoCodeList(companyId, jwtToken) {

        return axios.get(`${iso_url}searchByIsoCodeList`, {
            params: {
                companyId: companyId               
            },
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
    };




    searchExporter(companyId, branchId, searchValue, jwtToken, type) {
        return axios.get(`${party_url}getPartyByTypeValue`, {
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


 // Ports
 getSelectedMovementEntry(companyId, branchId, movementReqId, lineId, ContainerNo, profitcentreId, jwtToken) {

    return axios.get(`${movement_url}getSelectedMovementEntry`, {
        params: {
            companyId: companyId,
            branchId: branchId,
            movementReqId: movementReqId,
            lineId: lineId,
            ContainerNo: ContainerNo,
            profitCenterId: profitcentreId
        },
        headers: {
            'Authorization': `Bearer ${jwtToken}`
        }
    })
};


 // Ports
 getMovementEntriesToSelect(companyId, branchId, searchvalue, jwtToken) {
    return axios.get(`${movement_url}getMovementEntriesToSelect`, {
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






    // searchContainerNoForMovementWork(companyid, branchId, searchValue, profitcentreId, jwtToken) {
    //     return axios.get(`${movement_url}searchContainerNoForMovementWork`, {
    //         params: {
    //             companyId: companyid,
    //             branchId: branchId,
    //             containerNo: searchValue ,
    //             profitcentreId: profitcentreId         
    //         },
    //         headers: {
    //             'Authorization': `Bearer ${jwtToken}`
    //         }
    //     })
    // };


// Containerwise Stuffing Request Save
saveExportMovement(companyid, branchId, userId, ExportMovement, jwtToken) {
    return axios.post(`${movement_url}saveExportMovement`, ExportMovement, {
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



}
export default MovementService;