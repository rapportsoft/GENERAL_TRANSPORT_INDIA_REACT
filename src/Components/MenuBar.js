import React from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import Export_personal_gate_pass from "../Child_Pages/Export_personal_gate_pass";
function MenuBar() {
  return (
    <div>
      <ListGroup>
        <Link className="list-group-item list-item-group-action"  tag="a" to="/parent/import">Import</Link>
        <Link className="list-group-item list-item-group-action"  tag="a" to="/parent/export"> Export</Link>
        <Link className='list-group-item list-item-group-action ' tag="a" to="/parent/import-unidentified" >Import Unidentified</Link>
        <Link className='list-group-item list-item-group-action ' tag="a" to="/parent/subcontract-export" >SubContract Export</Link>
        <Link className='list-group-item list-item-group-action ' tag="a" to="/parent/subcontract-import" >Sub Contract Import</Link>

        <Link className='list-group-item list-item-group-action ' tag="a" to="/parent/detention-list" >Detection List</Link>
        <Link className='list-group-item list-item-group-action ' tag="a" to="/parent/payment-bill" >Payment_and_bill</Link>
        <Link className='list-group-item list-item-group-action ' tag="a" to="/parent/rate-chart" >Rate_chart</Link>
        <Link className='list-group-item list-item-group-action ' tag="a" to="/parent/holiday-list" >Holiday_list</Link>
        <Link className='list-group-item list-item-group-action ' tag="a" to="/parent/manage-e-user" >ManageExternalUser</Link>
        <Link className='list-group-item list-item-group-action ' tag="a" to="/parent/manage-i-user" >ManageInternalUser</Link>
        <Link className='list-group-item list-item-group-action ' tag="a" to="/parent/manage-party" >ManageParty</Link>

        <Link className='list-group-item list-item-group-action ' tag="a" to="/child/carting-agent" >Carting_Agent</Link>
        <Link className='list-group-item list-item-group-action ' tag="a" to="/child/common">Common</Link>
        <Link className='list-group-item list-item-group-action ' tag="a" to="/child/export-personal-gate-pass"element={<Export_personal_gate_pass />} >Export_personal_gate_pass</Link>
        <Link className='list-group-item list-item-group-action ' tag="a" to="/child/forward-parcel">Forwardparcel</Link>
        <Link className='list-group-item list-item-group-action ' tag="a" to="/child/heavy-parcel">Heavy_parcel</Link>
        <Link className='list-group-item list-item-group-action ' tag="a" to="/child/print-tag">Print_tag</Link>
        <Link className='list-group-item list-item-group-action ' tag="a" to="/child/generate-awb-ser">Generate_AWB_SER </Link>
        <Link className='list-group-item list-item-group-action ' tag="a" to="/child/scan-personal-be">Scan_personal_BE</Link>
        <Link className='list-group-item list-item-group-action ' tag="a" to="/child/nipt-be-scan">Nipt_BE_Scan </Link>
        <Link className='list-group-item list-item-group-action ' tag="a" to="/child/scan-be-qr-code"> Scan_BE_QR_Code</Link>
        <Link className='list-group-item list-item-group-action ' tag="a" to="/child/import-tp">Importtp </Link>
        <Link className='list-group-item list-item-group-action ' tag="a" to="/child/export-tp"> Exporttp</Link>
        <Link className='list-group-item list-item-group-action ' tag="a" to="/child/import-pctm">Import_PCTM </Link>
        <Link className='list-group-item list-item-group-action ' tag="a" to="/child/export-pctm">ExportPctm </Link>
        <Link className='list-group-item list-item-group-action ' tag="a" to="/child/export-register">Export_register </Link>
        <Link className='list-group-item list-item-group-action ' tag="a" to="/child/import-register">Import_Register </Link>
        <Link className='list-group-item list-item-group-action ' tag="a" to="/child/carting-sheet"> Carting_Sheet</Link>
        <Link className='list-group-item list-item-group-action ' tag="a" to="/child/export-transaction"> Export_transaction</Link>
        <Link className='list-group-item list-item-group-action ' tag="a" to="/child/import-transaction">Import_transaction</Link>
        <Link className='list-group-item list-item-group-action ' tag="a" to="/child/delivery-order"> Delivery_order</Link>
        <Link className='list-group-item list-item-group-action ' tag="a" to="/child/stock-at-vault"> Stock_at_vault</Link>
        <Link className='list-group-item list-item-group-action ' tag="a" to="/child/subcontract-report"> Subcontract_report </Link>
        <Link className='list-group-item list-item-group-action ' tag="a" to="/child/party-bill-summary"> Party_bill_summary</Link>
        <Link className='list-group-item list-item-group-action ' tag="a" to="/child/sub-import-transaction"> Sub_import_transaction</Link>
        <Link className='list-group-item list-item-group-action ' tag="a" to="/child/user"> User</Link>
        <Link className='list-group-item list-item-group-action ' tag="a" to="/child/userRights"> UserRights</Link>
       </ListGroup>
    </div>
  );
}

export default MenuBar;
//  <Routes >
//             <Route  path='/dash' element={<Dashboard/>} />
//             <Route path='/login' element={<Login2/>} />
//             <Route path="/parent/export" element={<Export />} />
//             <Route path="/parent/import" element={<Import />} />
//             <Route path="/parent/import-unidentified" element={<Import_Unidentified />} />
//             <Route path="/parent/subcontract-export" element={<Subcontract_Export />} />
//             <Route path="/parent/subcontract-import" element={<Subcontract_Import />} />
//             <Route path="/parent/detention-list" element={<Detection_List />} />
//             <Route path="/parent/payment-bill" element={<Payment_and_bill />} />
//             <Route path="/parent/rate-chart" element={<Rate_chart />} />
//             <Route path="/parent/holiday-list" element={<Holiday_list />} />
//             <Route path="/parent/manage-e-user" element={<ManageExternalUser />} />
//             <Route path="/parent/manage-i-user" element={<ManageInternalUser />} />
//             <Route path="/parent/manage-party" element={<ManageParty />} />

//             <Route path="/child/carting-agent" element={<Carting_Agent />} />
//             <Route path="/child/common" element={<Common />} />
//             <Route path="/child/export-personal-gate-pass" element={<Export_personal_gate_pass />} />
//             <Route path="/child/forward-parcel" element={<Forwardparcel />} />
//             <Route path="/child/heavy-parcel" element={<Heavy_parcel />} />
//             <Route path="/child/update-nsdl-status" element={<Update_Nsdl_status />} />
//             <Route path="/child/print-tag" element={<Print_tag />} />
//             <Route path="/child/generate-awb-ser" element={<Generate_AWB_SER />} />
//             <Route path="/child/scan-personal-be" element={<Scan_personal_BE />} />
//             <Route path="/child/nipt-be-scan" element={<Nipt_BE_Scan />} />
//             <Route path="/child/scan-be-qr-code" element={<Scan_BE_QR_Code />} />
//             <Route path="/child/import-tp" element={<Importtp />} />
//             <Route path="/child/export-tp" element={<Exporttp />} />
//             <Route path="/child/import-pctm" element={<Import_PCTM />} />
//             <Route path="/child/export-pctm" element={<ExportPctm />} />
//             <Route path="/child/export-register" element={<Export_register />} />
//             <Route path="/child/import-register" element={<Import_Register />} />
//             <Route path="/child/carting-sheet" element={<Carting_Sheet />} />
//             <Route path="/child/export-transaction" element={<Export_transaction />} />
//             <Route path="/child/import-transaction" element={<Import_transaction />} />
//             <Route path="/child/delivery-order" element={<Delivery_order />} />
//             <Route path="/child/stock-at-vault" element={<Stock_at_vault />} />
//             <Route path="/child/subcontract-report" element={<Subcontract_report />} />
//             <Route path="/child/party-bill-summary" element={<Party_bill_summary />} />
//             <Route path="/child/sub-import-transaction" element={<Sub_import_transaction />} />
//             <Route path="/child/user" element={<User/>} />
//             <Route path="/child/userRights" element={<UserRights />} />
//           </Routes>
