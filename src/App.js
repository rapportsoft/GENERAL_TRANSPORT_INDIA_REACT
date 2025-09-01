import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import AddBillingHeads from "./ChildMenus/AddBillingHeads";
import AddJarDetails from "./ChildMenus/AddJarDetails";
import AddParty from "./ChildMenus/AddParty";
import AddPort from "./ChildMenus/AddPort";
import AddProfitCenter from "./ChildMenus/AddProfitCenter";
import AddVoyage from "./ChildMenus/AddVoyage";
import Approvals from "./ChildMenus/Approvals";
import BillingHeads from "./ChildMenus/BillingHeads";
import GroupOfMaster from "./ChildMenus/GroupOfMaster";
import IsoContainer from "./ChildMenus/IsoContainer";
import NoObjectionCertifacate from "./ChildMenus/NoObjectionCertifacate";
import Party from "./ChildMenus/Party";
import Port from "./ChildMenus/Port";
import ProfitCenter from "./ChildMenus/ProfitCenter";
import ServiceMapping from "./ChildMenus/ServiceMapping";
import User from "./ChildMenus/User";
import UserRights from "./ChildMenus/UserRights";
import VesselDetails from "./ChildMenus/VesselDetails";
import Voyage from "./ChildMenus/Voyage";
import YardMaster from "./ChildMenus/YardMaster";
import ChainManagement from "./Common Pages/ChainManagement";
import ChainOne from "./Common Pages/ChainOne";
import ChainTwo from "./Common Pages/ChainTwo";
import { AuthProvider } from './Components/AuthProvider';
import Dashboard from "./Components/Dashboard";
import ErrorPage from "./Components/ErrorPage";
import ForgotPassword from "./Components/ForgotPassword";
import Login from './Components/Login';
import Navbar from './Components/NavBar';
import SideBar from "./Components/SideBar";
import './Components/Style.css';
import CreditNote from "./Finance/CreditNote";
import Finance from "./Finance/Finance";
import Proforma from "./Finance/Proforma";
import GeneralDeliveryCargo from "./General/GeneralDeliveryCargo";
import GeneralGateInCargo from "./General/GeneralGateInCargo";
import GeneralGatePass from "./General/GeneralGatePass";
import GeneralProcess from "./General/GeneralProcess";
import GeneralReports from "./General/GeneralReports";
import JobEntry from "./General/JobEntry";
import ReceingGeneralCargo from "./General/ReceingGeneralCargo";
import HubMain from "./Hub/HubMain";
import AllDashboard from "./Parent Pages/AllDashboard";
import AuctionNotice from "./Parent Pages/AuctionNotice";
import AuctionNotice2 from "./Parent Pages/AuctionNotice2";
import AuctionNoticeFinal from "./Parent Pages/AuctionNoticeFinal";
import AuctionProcess from "./Parent Pages/AuctionProcess";
import BondAuditTrail from "./Parent Pages/BondAuditTrail";
import BondDeliveryRegister from "./Parent Pages/BondDeliveryRegister";
import BondDepositeRegister from "./Parent Pages/BondDepositeRegister";
import BondGatePass from "./Parent Pages/BondGatePass";
import BondingAuditTrailMenu from "./Parent Pages/BondingAuditTrailMenu";
import BondingDashBoard from "./Parent Pages/BondingDashBoard";
import BondingReports from "./Parent Pages/BondingReports";
import BondInventoryReport from "./Parent Pages/BondInventoryReport";
import CFSBonding from "./Parent Pages/CFSBonding";
import Common from "./Parent Pages/Common";
import CommonReports from "./Parent Pages/CommonReports";
import DMRReport from "./Parent Pages/DMRReport";
import ExBondAuditTrail from "./Parent Pages/ExBondAuditTrail";
import ExBonding from "./Parent Pages/ExBonding";
import ExpiredBondReport from "./Parent Pages/ExpiredBondReport";
import Export from "./Parent Pages/Export";
import ExportDashboard from "./Parent Pages/ExportDashboard";
import ExportOperationalReport from "./Parent Pages/ExportOperationalReport";
import ExportReports from "./Parent Pages/ExportReports";
import FinanceOperationsReport from "./Parent Pages/FinanceOperationsReport";
import FinanceReports from "./Parent Pages/FinanceReports";
import FormABReport from "./Parent Pages/FormABReport";
import GateInBondedCargo from "./Parent Pages/GateInBondedCargo";
import GeneralDashboard from "./Parent Pages/GeneralDashboard";
import Import from "./Parent Pages/Import";
import ImportCargoDtls from "./Parent Pages/ImportCargoDtls";
import ImportDashboard from "./Parent Pages/ImportDashboard";
import ImportOperationalReports from "./Parent Pages/ImportOperationalReports";
import ImportReports from "./Parent Pages/ImportReports";
import InBondAuditTrail from "./Parent Pages/InBondAuditTrail";
import InBondCargo from "./Parent Pages/InBondCargo";
import InvoicesDashBoard from "./Parent Pages/InvoicesDashBoard";
import LiveBondReport from "./Parent Pages/LiveBondReport";
import MovementSummeryReport from "./Parent Pages/MovementSummeryReport";
import NocDepositeReport from "./Parent Pages/NocDepositeReport";
import Quotation from "./Parent Pages/Quotation";
import Section49ExpiredBondReport from "./Parent Pages/Section49ExpiredBondReport";
import Section49LiveBondReport from "./Parent Pages/Section49LiveBondReport";
import Tariff from "./Parent Pages/Tariff";
import SCMTRHead from "./SCMTR/SCMTRHead";
import AddVendorBillingHeads from "./VendorInvoice/AddVendorBillingHeads";
import VendorBillingHeads from "./VendorInvoice/VendorBillingHeads";
import VendorInvoice from "./VendorInvoice/VendorInvoice";
import VendorReceipt from "./VendorInvoice/VendorReceipt";
import VendorTariff from "./VendorInvoice/VendorTariff";
import CommodityMaster from "./ChildMenus/CommodityMaster";


const App = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOnline) {
    return <ErrorPage />;
  }
  return (
    <div style={{ background: 'linear-gradient(to bottom, #FDFCFB , #E4EfE9)' }}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/" element={<Login />} />
            <Route path="*" element={<MainLayout />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
};

const MainLayout = () => {
  const location = useLocation();
  const hideNavAndSidebar = ['/login', '/forgot-password', '/'].includes(location.pathname);
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);
  const isMobile = window.innerWidth <= 768; // Detect mobile view
  const sidebarWidth = isMobile ? (collapsed ? "0px" : "250px") : (collapsed ? "80px" : "250px");

  return (
    <>
      {!hideNavAndSidebar && <Navbar toggleSidebar={toggleSidebar} />}
      <div className={`main-content ${hideNavAndSidebar ? '' : 'app-container'}`} style={{ background: '#f0f0f5' }}>
        {!hideNavAndSidebar && <SideBar collapsed={collapsed} toggleSidebar={toggleSidebar} />}
        {/* <div className={`content-area ${collapsed ? 'expanded' : ''}`} style={{ marginTop: '67px' }}> */}
        <div
          className={`content-area ${collapsed ? 'expanded' : ''}`}
          style={{ marginTop: '67px', marginLeft: hideNavAndSidebar ? '0' : sidebarWidth }}
        >
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/parent/import" element={<Import />} />
            <Route path="/parent/common" element={<Common />} />
            <Route path="/master/party" element={<Party />} />
            <Route path="/master/yard" element={<YardMaster />} />

            <Route path="/master/commodity" element={<CommodityMaster />} />
            <Route path="/master/vessel" element={<VesselDetails />} />
            <Route path="/master/voyage" element={<Voyage />} />
            <Route path="/master/addParty" element={<AddParty />} />
            <Route path="/master/port" element={<Port />} />
            <Route path="/master/jar" element={<GroupOfMaster />} />
            <Route path="/master/profitCenter" element={<ProfitCenter />} />
            <Route path="/master/isoContainer" element={<IsoContainer />} />
            <Route path="/master/addProfitCenter" element={<AddProfitCenter />} />
            <Route path="/master/serviceMapping" element={<ServiceMapping />} />
            <Route path="/master/AddJarDetails/:jarid/:jartype" element={<AddJarDetails />} />
            <Route path="/master/port/add-port" element={<AddPort />} />
            <Route path="/parent/export" element={<Export />} />
            <Route path="/master/addvoyage" element={<AddVoyage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/securities/user" element={<User />} />
            <Route path="/securities/userRights" element={<UserRights />} />
            <Route path="/master/billingHeads" element={<BillingHeads />} />
            <Route path="/master/billingHeadsAddPage" element={<AddBillingHeads />} />
            <Route path="/master/importCargoDtls" element={<ImportCargoDtls />} />
            <Route path="/master/tariff" element={<Tariff />} />
            <Route path="/parent/financeProcess" element={<Finance />} />
            <Route path="/cfsBonding/nocDepositeRegister" element={<NocDepositeReport />} />
            <Route path="/parent/cfsBonding" element={<CFSBonding />} />
            <Route path="/parent/cfsBondingReport" element={<BondingReports />} />
            <Route path="/parent/bondingAuditTrail" element={<BondingAuditTrailMenu />} />
            <Route path="/parent/bondedInventoryReport" element={<BondInventoryReport />} />
            <Route path="/parent/bondDepositeRegister" element={<BondDepositeRegister />} />
            <Route path="/parent/bondDeliveryRegister" element={<BondDeliveryRegister />} />
            <Route path="/parent/liveBondReport" element={<LiveBondReport />} />
            <Route path="/parent/expiredBondReport" element={<ExpiredBondReport />} />
            <Route path="/parent/sectionLiveBondReport" element={<Section49LiveBondReport />} />
            <Route path="/parent/sectionExpiredBondReport" element={<Section49ExpiredBondReport />} />
            <Route path="/parent/bondAuditTrail" element={<BondAuditTrail />} />
            <Route path="/cfsBonding/noc" element={<NoObjectionCertifacate />} />
            <Route path="/parent/formABReport" element={<FormABReport />} />
            <Route path="/cfsBonding/gateInBondedCargo" element={<GateInBondedCargo />} />
            <Route path="/cfsBonding/inBondCargo" element={<InBondCargo />} />
            <Route path="/cfsBonding/exBondCargo" element={<ExBonding />} />
            <Route path="/cfsBonding/bondGatePass" element={<BondGatePass />} />
            <Route path="/cfsBonding/inBondAuditTrail" element={<InBondAuditTrail />} />
            <Route path="/cfsBonding/exBondAuditTrail" element={<ExBondAuditTrail />} />
            <Route path="/master/partyApprovals" element={<Approvals />} />

            <Route path="/vendor/billingHeads" element={<VendorBillingHeads />} />
            <Route path="/vendor/addBillingHeads" element={<AddVendorBillingHeads />} />
            <Route path="/vendor/tariff" element={<VendorTariff />} />
            <Route path="/vendor/vendorInvoice" element={<VendorInvoice />} />
            <Route path="/vendor/vendorReceipt" element={<VendorReceipt />} />

            <Route path="/parent/importReports" element={<ImportReports />} />
            <Route path="/import/importOperationalReports" element={<ImportOperationalReports />} />

            <Route path="/parent/exportReports" element={<ExportReports />} />
            <Route path="/export/exportOperationalReports" element={<ExportOperationalReport />} />


            <Route path="/parent/chainManagement" element={<ChainManagement />} />
            <Route path="/change/changeOne" element={<ChainOne />} />
            <Route path="/change/changeTwo" element={<ChainTwo />} />

            <Route path="/parent/commonReports" element={<CommonReports />} />
            <Route path="/common/movementSummeryReport" element={<MovementSummeryReport />} />
            <Route path="/common/dmrReport" element={DMRReport} />
            <Route path="/parent/financeReports" element={<FinanceReports />} />
            <Route path="/finance/financeReport" element={<FinanceOperationsReport />} />


            <Route path="/parent/dashboard" element={<Dashboard />} />
            <Route path="/dash/dashboard" element={<AllDashboard />} />
            <Route path="/dash/importDashboard" element={<ImportDashboard />} />
            <Route path="/dash/ExportDashboard" element={<ExportDashboard />} />
            <Route path="/dash/BondingDashboard" element={<BondingDashBoard />} />
            <Route path="/dash/invoicesDashboard" element={<InvoicesDashBoard />} />
            <Route path="/dash/generalDashboard" element={<GeneralDashboard />} />

            <Route path="/parent/quotation" element={<Quotation />} />

            <Route path="/parent/proformaProcess" element={<Proforma />} />

            <Route path="/parent/CreditNote" element={<CreditNote />} />

            <Route path="/parent/auctionProcess" element={<AuctionProcess />} />
            <Route path="/auction/auctionNotice" element={<AuctionNotice />} />
            <Route path="/auction/auctionNotice2" element={<AuctionNotice2 />} />
            <Route path="/auction/auctionNoticeF" element={<AuctionNoticeFinal />} />

            <Route path="/general/generalProcess" element={<GeneralProcess />} />
            <Route path="/general/jobEntry" element={<JobEntry />} />
            <Route path="/general/gateInCargo" element={<GeneralGateInCargo />} />
            <Route path="/general/receivingCargo" element={<ReceingGeneralCargo />} />
            <Route path="/general/deliveryCargo" element={<GeneralDeliveryCargo />} />
            <Route path="/general/gatePassCargo" element={<GeneralGatePass />} />
            <Route path="/general/generalReport" element={<GeneralReports />} />

            <Route path="/import/Hub" element={<HubMain />} />

            <Route path="/parent/SCMTR" element={<SCMTRHead />} />


          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;

