import axios from "axios";
import ipaddress from "../Components/IpAddress";
const url = `${ipaddress}apservices/`
class masterservice {

    getServices(compid, branchid, jwtToken) {
        return axios.get(`${url}${compid}/${branchid}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });
    }

    addServices(cid, bid, user, service) {
        return axios.post(`${url}${cid}/${bid}/${user}`, service);
    }

    deleteService(compId, branchId, sid) {
        return axios.delete(`${url}${compId}/${branchId}/${sid}`)
    }

    updateService(cid, bid, sid, user, service) {
        return axios.put(`${url}${cid}/${bid}/${sid}/${user}`, service)
    }

    getByServiceId(compid, branchid, sid) {
        return axios.get(`${url}${compid}/${branchid}/${sid}`)
    }

    updateServiceStatus(cid, bid, sid, user, service, jwtToken) {
        return axios.put(`${url}${cid}/${bid}/${sid}/${user}/status`, service, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
    }
}
export default new masterservice();