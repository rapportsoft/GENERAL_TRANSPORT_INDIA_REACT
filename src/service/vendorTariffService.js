import axios from "axios";
import ipaddress from "../Components/IpAddress";


const tariff_url = `${ipaddress}vendorTarrif/`;

class vendorTariffService {

    constructor(axiosInstance) {
        this.axios = axiosInstance;
    }



    // Export Container Invoice





    // Tariff   

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





    
}
export default vendorTariffService;