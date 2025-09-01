import axios from "axios";
import ipaddress from "../Components/IpAddress";


const service_url = `${ipaddress}service/`
const party_url = `${ipaddress}parties`
const cfsservice_url = `${ipaddress}cfstarrif`
const tarrif_url = `${ipaddress}tarrif/`
const range_url = `${ipaddress}range/`
const user_url = `${ipaddress}user/`
const import_url = `${ipaddress}importmain/`
const airline_url = `${ipaddress}Airline/`
const jardetail_url = `${ipaddress}jardetail/` 
const ImportHistory_url = `${ipaddress}history/`
const importPc_url = `${ipaddress}importpc/`
const ExternalUser_url = `${ipaddress}externalParty/`
const importHeavy_url = `${ipaddress}importHeavy/`
const newreprentative_url = `${ipaddress}NewReprentative/`
const cfgatein = `${ipaddress}cfgateinc/`


class Rate_Chart_Service {

// Get username  by external userId
getUsernameByexternalUserId(compId,branchId,externalUserId)
{
return axios.get(`${ExternalUser_url}${compId}/${branchId}/${externalUserId}/getByUsernameByID`)
};




  getServices(compid,branchid) {
    return axios.get(`${service_url}${compid}/${branchid}`);
  }
  getExcludedServices(compid,branchid,excludedserviceIds) {
    return axios.get(`${service_url}${compid}/${branchid}/diffservice?excludedserviceIds=${excludedserviceIds}`);
  }

  getByServiceId(compid,branchid,sid) {
    return axios.get(`${service_url}${compid}/${branchid}/${sid}`)
  }


  
  getAllParties(cid,bid) 
  {
    return axios.get(`${party_url}/getAll/${cid}/${bid}`);
  }

  getParties(cid,bid,excludedPartyIds) {
    const excludedPartyIdsStr = excludedPartyIds.join(','); // Convert array to comma-separated string
    return axios.get(`${party_url}/${cid}/${bid}/diffparty?excludedPartyIds=${excludedPartyIdsStr}`);
  }

  
  getPartyById(companyId, branchId, partyId) {
    return axios.get(`${party_url}/${companyId}/${branchId}/${partyId}`)
  }









  addCFSserviceOnlyService(companyId, branchId, currentUser, service_Id, cfsService) {
    return axios.post(`${cfsservice_url}/${companyId}/${branchId}/${currentUser}/${service_Id}/service`, cfsService)
  }

  addCFSservice(companyId, branchId, currentUser, cfsService) {
    return axios.post(`${cfsservice_url}/${companyId}/${branchId}/${currentUser}`, cfsService)
  }

  getCFSServiceById(cfsTarrifNo) {
    return axios.get(`${cfsservice_url}/${cfsTarrifNo}/cfstservices`);
  }
  getCFSService(compId, BranchId) {
    return axios.get(`${cfsservice_url}/${compId}/${BranchId}`);
  }

  updateCFSservice(companyId, branchId, currentUser, cfstarrifno, cfsService) {
    return axios.put(`${cfsservice_url}/${companyId}/${branchId}/${currentUser}/${cfstarrifno}`, cfsService)
  }

  updateCFSservicestatus(companyId, branchId, currentUser, cfstarrifno, cfsService) {
    return axios.put(`${cfsservice_url}/${companyId}/${branchId}/${currentUser}/${cfstarrifno}/status`, cfsService)
  }

  findByTarrifNoAndServiceID(compid,branchid,tarrifNo,amndno,ServiceId) {
    return axios.get(`${cfsservice_url}/${compid}/${branchid}/${tarrifNo}/${amndno}/${ServiceId}/Single`)
  }
  // All Tarifs Functions

  // getAllTarrifs(compId,branchId) {
  //   return axios.get(`${tarrif_url}${compId}/${branchId}`)
  // }

  getAllTarrifs(compId,branchId) {
    return axios.get(`${tarrif_url}${compId}/${branchId}/getAll`)
  }

  addTarrif(compId, BranchId, currentUser, tarrif) {
    return axios.post(`${tarrif_url}${compId}/${BranchId}/${currentUser}`, tarrif);
  }

  updateTarrif(compId, BranchId, currentUser,cfstarrifno, tarrif) {
    return axios.put(`${tarrif_url}${compId}/${BranchId}/${currentUser}/${cfstarrifno}/update`, tarrif);
  }

  ammendTarrif(compId, BranchId, currentUser,cfstarrifno, tarrif) {
    return axios.post(`${tarrif_url}${compId}/${BranchId}/${currentUser}/${cfstarrifno}/ammend`, tarrif);
  }

  updateTarrifStatus(compId, BranchId, currentUser,cfstarrifno, tarrif) {
    return axios.put(`${tarrif_url}${compId}/${BranchId}/${currentUser}/${cfstarrifno}/status`, tarrif);
  }

  getCFSTarrifById(compId, BranchId,cfsTarrifNo) {
    return axios.get(`${tarrif_url}${compId}/${BranchId}/${cfsTarrifNo}/cfstarrif`);
  }


  getRangeByTarrifNoAndServiceId(compId,branchId,tarrifno,amondno,serlno)
  {
    return axios.get(`${range_url}${compId}/${branchId}/${tarrifno}/${amondno}/${serlno}/ser`)
  }


  addTarrifRange(compId, BranchId, currentUser, range) {
    return axios.post(`${range_url}${compId}/${BranchId}/${currentUser}/add`, range);
  }

  updateTarrifRange(compId, BranchId, currentUser,cfstarrifno, range) {
    return axios.put(`${range_url}${compId}/${BranchId}/${currentUser}/${cfstarrifno}/update`, range);
  }

  updateTarrifRangeStatus(compId, BranchId, currentUser,cfstarrifno, range) {
    return axios.put(`${range_url}${compId}/${BranchId}/${currentUser}/${cfstarrifno}/status`, range);
  }
  

  getCombinedServicesSingleTarrifNo(cid,bid,cfsTarrifNo) {
    return axios.get(`${range_url}${cid}/${bid}/${cfsTarrifNo}/join`);
  }

  saveAllTarrifRanges(TarrifRanges,user)
  {
    return axios.post(`${range_url}tariffRanges/saveAll/${user}`,TarrifRanges)
  }




deletecfssrvTarrif(cid,bid,TarrifNo,amndno,ServiceId)
{
  return axios.delete(`${cfsservice_url}/${cid}/${bid}/${TarrifNo}/${amndno}/${ServiceId}/delete`);
}

deletecfsrangeTarrif(cid,bid,TarrifNo,amndno,ServiceId)
{
  return axios.delete(`${range_url}${cid}/${bid}/${TarrifNo}/${amndno}/${ServiceId}/delete`);
}


getUserbyUserId(userId,cid,bid)
{
  return axios.get(`${user_url}get-user/${userId}/${cid}/${bid}`);
}





// Import Urls









updateNSDLStatus(compid,branchid,transid,mawb,hawb,sir,userId)
{
  return axios.post(`${import_url}${compid}/${branchid}/${transid}/${mawb}/${hawb}/${sir}/${userId}/updateNIPT`)
}



addNIPTImport(compid, bid, username, url) {
  return axios.get(`${import_url}${compid}/${bid}/${username}/addNIPT`, {
    params: { url }, // Pass the URL as a parameter
  });
};


getAllImports(compId,branchId)
{
  return axios.get(`${import_url}${compId}/${branchId}/All`);
}

getByMAWBNo(compId,branchId,mawbno)
{
  return axios.get(`${import_url}${compId}/${branchId}/${mawbno}`);
}
addImport(compid,bid,username,import2)
{
  return axios.post(`${import_url}${compid}/${bid}/${username}/add`,import2);
}
updateImport(compid,bid,username,import2)
{
  return axios.put(`${import_url}${compid}/${bid}/${username}/update`,import2);
}

ModifyupdateImport(compid,bid,username,import2)
{
  return axios.put(`${import_url}${compid}/${bid}/${username}/modifyupdate`,import2);
}
updateCartingAgentStatus(cid,bid,user,otp,agent,reprentativeId,ImportList)
{
  return axios.put(`${import_url}${cid}/${bid}/${user}/${otp}/${agent}/${reprentativeId}/CartingAgentupdate`,ImportList)
}
updateSingleCartingAgentStatus(cid,bid,user,otp,agent,reprentativeId,Import)
{
  return axios.put(`${import_url}${cid}/${bid}/${user}/${otp}/${agent}/${reprentativeId}/SingleCartingAgent`,Import)
};


updatePartyOrCHAStatus(cid,bid,user,otp,userId,reprentativeId,ImportList)
{
  return axios.put(`${import_url}${cid}/${bid}/${user}/${otp}/${userId}/${reprentativeId}/PartyOrCHAupdate`,ImportList)
};



GetByMAWBandHAWBImage(compid,bid,transId,MAWb,HAWB,sirNo)
{
  return axios.get(`${import_url}${compid}/${bid}/${transId}/${MAWb}/${HAWB}/${sirNo}/getImage`);
}

GetByMAWBandHAWB(compid,bid,transId,MAWb,HAWB,sirNo)
{
  return axios.get(`${import_url}${compid}/${bid}/${transId}/${MAWb}/${HAWB}/${sirNo}/getSingle`);
}
deleteimportofmawb(compid,bid,transId,MAWb,HAWB,sirNo)
{
  return axios.delete(`${import_url}${compid}/${bid}/${transId}/${MAWb}/${HAWB}/${sirNo}/delete`);
}

getByCompIdBranchIdDgdcStatus(cid,bid)
{
  return axios.get(`${import_url}${cid}/${bid}/carting`);
}


updateImportStatusCondition(companyid, branchId, transId, mawb, hawb, sir,user ,buttonType,import3)
{
  return axios.put(`${import_url}${companyid}/${branchId}/${transId}/${mawb}/${hawb}/${sir}/${user}/${buttonType}/ChangeStatus`,import3)
}


SearchImports(params)
{
  return axios.get(`${import_url}search`,params)
}

// New Imports for hand over to party or Cha 

getImportsofPartyORCha(cid,bid,importer)
{
  return axios.get(`${import_url}${cid}/${bid}/${importer}/ForPartyorCha`);
};
getReprentativeByCompIdBranchIdUserId(cid,bid,userId)
{
  return axios.get(`${newreprentative_url}${cid}/${bid}/${userId}/ByUserID`);
};

// Receiced from Carting Agents
getImportsforReceivedCarting(cid,bid,cartingId,representativeId)
{
  return axios.get(`${import_url}${cid}/${bid}/${cartingId}/${representativeId}/Receivedcarting`);
};

updateReceivedCartingAgents(cid,bid,user,otp,userId,reprentativeId,ImportList)
{
  return axios.put(`${import_url}${cid}/${bid}/${user}/${otp}/${userId}/${reprentativeId}/ReceivedFromCarting`,ImportList)
}


// Import History

getHistoryBySIRNo(cid,bid,mawb,hawb,sirno)
{
  return axios.get(`${ImportHistory_url}${cid}/${bid}/${mawb}/${hawb}/${sirno}`);
};



getImportPCbyIds(cid,bid,mawb,hawb,sirno)
{
  return axios.get(`${importPc_url}${cid}/${bid}/${mawb}/${hawb}/${sirno}/getSingle`)
};

addImportPCOBJECTS(cid,bid,user,mawb,hawb,sirno,importPCObject)
{
  return axios.post(`${importPc_url}${cid}/${bid}/${user}/${mawb}/${hawb}/${sirno}/addimportpc`,importPCObject)
};
updateImportPCOBJECTS(cid,bid,user,mawb,hawb,sirno,importPCObject)
{
  return axios.post(`${importPc_url}${cid}/${bid}/${user}/${mawb}/${hawb}/${sirno}/updateimportpc`,importPCObject)
};




// Airline 
getAllairline (cid,bid)
{
  return axios.get(`${airline_url}list/${cid}/${bid}`);
};



findByFlightNo(flightno,cid,bid)
{
  return axios.get(`${airline_url}find/${cid}/${bid}/${flightno}`);
};

getjarsByJarId(jarId,company_Id)
{
  return axios.get(`${jardetail_url}jarIdList/${jarId}/${company_Id}`);
};


// External Party  Url

getAllExternalUser(compid,branchId)
{
  return axios.get(`${ExternalUser_url}${compid}/${branchId}/getAll`);
};

getSingleExternalUser(compid,branchId,userId)
{
  return axios.get(`${ExternalUser_url}${compid}/${branchId}/${userId}/get`);
};


addExternalUser(compid,branchId,user,encodedCompanyId,encodedBranchId,ipaddress,externalUser)
{
  return axios.post(`${ExternalUser_url}${compid}/${branchId}/${user}/${encodedCompanyId}/${encodedBranchId}/${ipaddress}/add`,externalUser);
};

updateExternalUser(compid,branchId,EUSERID,user,externalUser)
{
  return axios.put(`${ExternalUser_url}${compid}/${branchId}/${EUSERID}/${user}/delete`,externalUser);
};

getExternalUserByType(compid,branchId,type)
{
  return axios.get(`${ExternalUser_url}${compid}/${branchId}/${type}/getByUsertype`);
};
getExternalUserByTypeForImport(compid,branchId,type)
{
  return axios.get(`${ExternalUser_url}${compid}/${branchId}/${type}/GetForImport`);
};


// Representative Party 

getAllReprentative(compid,branchId,type)
{
  return axios.get(`${newreprentative_url}${compid}/${branchId}/${type}/Bytype`)
};

getReprentativeById(compid,branchId,userId,id)
{
  return axios.get(`${newreprentative_url}${compid}/${branchId}/${userId}/${id}/Byid`)
};
getReprentativeByIdImage(compid,branchId,userId,id)
{
  return axios.get(`${newreprentative_url}${compid}/${branchId}/${userId}/${id}/getImage`)
};



getAllHeavyParcels(compId,branchId,mawb,hawb,transId,sir)
{
  return axios.get(`${importHeavy_url}${compId}/${branchId}/${transId}/${mawb}/${hawb}/${sir}/getAllHeavy`)
};

getHeavyParcelsByPackageNumber(compId,branchId,mawb,hawb,transId,sir,packageno)
{
  return axios.get(`${importHeavy_url}${compId}/${branchId}/${transId}/${mawb}/${hawb}/${sir}/${packageno}/getByPakageNo`)
};

addIMportHeavy(compId,branchId,user,importheavy)
{
  return axios.post(`${importHeavy_url}${compId}/${branchId}/${user}/addHeavy`,importheavy)
};

DeleteByPackageNumber(compId,branchId,mawb,hawb,transId,sir,packageno)
{
  return axios.delete(`${importHeavy_url}${compId}/${branchId}/${transId}/${mawb}/${hawb}/${sir}/${packageno}/delete`)
};

updateByPackageNumber(compId,branchId,mawb,hawb,transId,sir,packageno,importheavy)
{
  return axios.put(`${importHeavy_url}${compId}/${branchId}/${transId}/${mawb}/${hawb}/${sir}/${packageno}/update`,importheavy)
};

updateCfGateInDamgeContainerStatus(containerList)
{
   return axios.put(`${cfgatein}updateDamageContainerFromGateIN`,containerList);
};

updateCfGateInForAddMNRActivity(containerList)
{
   return axios.put(`${cfgatein}addToMNRActivity`,containerList);
};



}

export default new Rate_Chart_Service();  
