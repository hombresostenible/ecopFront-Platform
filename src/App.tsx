import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './styles.css';
// GENERALES
import WhatsApp from './components/GeneralComponents/WhatsApp/WhatsApp';
import Telegram from './components/GeneralComponents/Telegram/Telegram';
import Scroll from "./components/GeneralComponents/Scroll/Scroll";
import Notification from './components/PanelUser/Notifications/Notification';
import ScrollToTop from './components/GeneralComponents/ScrollToTop/ScrollToTop';
// REGISTER
import RegisterPage from './pages/Register/RegisterPage';
import RegisterUserPage from './pages/Register/User/00RegisterUserPage';
// LOGIN
import LoginPage from './pages/Login/LoginPage';
import ResetPasswordPage from './pages/Login/ResetPassword/ResetPasswordPage';
import UnblockingAccountPage from './pages/Login/UnblockingAccount/UnblockingAccountPage';
// ERROR 404
import Error404 from './pages/Error404/Error404';
// PROTECCION DE RUTAS
import ProtectedRoute from './ProtectedRoute';
// NAVBAR PLATAFORMA - QUESTIONS
import QuestionsPage from './pages/PanelUser/00NavBar/01Questions/QuestionsPage';
import KeyInformationManageYourBusiness from './pages/PanelUser/00NavBar/01Questions/01KeyInformationManageYourBusiness/KeyInformationManageYourBusiness';
import ContactSupport from './pages/PanelUser/00NavBar/01Questions/02ContactSupport/ContactSupport';
import OperationPlatform from './pages/PanelUser/00NavBar/01Questions/03OperationPlatform/OperationPlatform';
// NAVBAR PLATAFORMA - SERVICES
import ServicesPage from './pages/PanelUser/00NavBar/02ServicesPage/ServicesPage';
import ServiceActivateNewPlansPage from './pages/PanelUser/00NavBar/02ServicesPage/01ServiceActivateNewPlans/ServiceActivateNewPlansPage';
// NAVBAR PLATAFORMA - NOTIFICATIONS
import NotificationsPage from './pages/PanelUser/00NavBar/03Notifications/NotificationsPage';
// NAVBAR PLATAFORMA - CONFIGURATION
import ProfileUserPage from './pages/PanelUser/00NavBar/04Configuration/01ProfileUser/ProfileUserPage';
// import YourCurrentPlanPage from './pages/PanelUser/00NavBar/04Configuration/02YourCurrentPlan/YourCurrentPlanPage';
import MailConfigurationPage from './pages/PanelUser/00NavBar/04Configuration/05MailConfiguration/MailConfigurationPage';
// import BillingConfigurationPage from './pages/PanelUser/00NavBar/04Configuration/03BillingConfiguration/BillingConfigurationPage';
// import RoleInformationPage from './pages/PanelUser/00NavBar/04Configuration/04RoleInformation/RoleInformationPage';
// SIDEBAR - HOME
import HomePage from './pages/PanelUser/01Home/HomePage';
// SIDEBAR - TUS SEDES
import ConsultBranchPage from './pages/PanelUser/02Branch/ConsultBranch/ConsultBranchPage';
import CreateBranchPage from './pages/PanelUser/02Branch/CreateBranch/CreateBranchPage';
// SIDEBAR - INVENTARIOS
import BranchPage from './pages/PanelUser/02Branch/BranchPage';
import InventoriesPage from './pages/PanelUser/03Inventories/InventoriesPage';
// SIDEBAR - INVENTARIOS - ASSETS
import ConsultAssetsPage from './pages/PanelUser/03Inventories/01InventoryAssets/ConsultAssets/ConsultAssetsPage';
import CreateAssetsPage from './pages/PanelUser/03Inventories/01InventoryAssets/CreateAssets/CreateAssetsPage';
// SIDEBAR - INVENTARIOS - MERCHANDISES
import ConsultMerchandisesPage from './pages/PanelUser/03Inventories/02InventoryMerchadises/ConsultMerchandises/ConsultMerchandisesPage';
import CreateMerchandisesPage from './pages/PanelUser/03Inventories/02InventoryMerchadises/CreateMerchandises/CreateMerchandisesPage';
// SIDEBAR - INVENTARIOS - PRODUCTS
import ConsultProductsPage from './pages/PanelUser/03Inventories/03InventoryProducts/ConsultProducts/ConsultProductsPage';
import CreateProductsPage from './pages/PanelUser/03Inventories/03InventoryProducts/CreateProducts/CreateProductsPage';
import QuoteProductsPage from './pages/PanelUser/03Inventories/03InventoryProducts/QuoteProducts/QuoteProductsPage';
// SIDEBAR - INVENTARIOS - RAWMATERIALS
import ConsultRawMateralsPage from './pages/PanelUser/03Inventories/04InventoryRawMaterals/ConsultRawMaterals/ConsultRawMateralsPage';
import CreateRawMateralsPage from './pages/PanelUser/03Inventories/04InventoryRawMaterals/CreateRawMaterals/CreateRawMateralsPage';
// SIDEBAR - INVENTARIOS - SERVICES
import ConsultServicesPage from './pages/PanelUser/03Inventories/05InventoryServices/ConsultServices/ConsultServicesPage';
import CreateServicesPage from './pages/PanelUser/03Inventories/05InventoryServices/CreateServices/CreateServicesPage';
// SIDEBAR - ACCOUNTS
import AccountsPage from './pages/PanelUser/04Accounts/AccountsPage';
import SeeRecordsPage from './pages/PanelUser/04Accounts/01SeeRecordsAccountsBook/SeeRecordsAccountsBookPage';
import ConsultIncomesPage from './pages/PanelUser/04Accounts/01SeeRecordsAccountsBook/01ConsultIncomes/ConsultIncomesPage';
import ConsultCxcPage from './pages/PanelUser/04Accounts/01SeeRecordsAccountsBook/02ConsultCXC/ConsultCxcPage';
import ConsultExpencesPage from './pages/PanelUser/04Accounts/01SeeRecordsAccountsBook/03ConsultExpences/ConsultExpencesPage';
import ConsultCxpPage from './pages/PanelUser/04Accounts/01SeeRecordsAccountsBook/04ConsultCXP/ConsultCxpPage';
import CreateIncomePage from './pages/PanelUser/04Accounts/02Income/CreateIncome/CreateIncomePage';
import FastIncomesPage from './pages/PanelUser/04Accounts/FastIncomes/FastIncomesPage';
import CreateExpensesPage from './pages/PanelUser/04Accounts/03Expenses/CreateExpenses/CreateExpensesPage';
import PendingApprovalPage from './pages/PanelUser/04Accounts/04PendingApproval/PendingApprovalPage';
// SIDEBAR - INVOICING-AND-POS
import InvoicingAndPosPage from './pages/PanelUser/05InvoicingAndPos/InvoicingAndPosPage';
import SellPointOfSalePage from './pages/PanelUser/05InvoicingAndPos/01SellPointOfSalePage/01SellPointOfSale/SellPointOfSalePage';
import ElectronicInvoicingPage from './pages/PanelUser/05InvoicingAndPos/01SellPointOfSalePage/02ElectronicInvoicing/ElectronicInvoicingPage';
import SeeElectronicInvoicingPosPage from './pages/PanelUser/05InvoicingAndPos/02SeeElectronicInvoicingPosPage/SeeElectronicInvoicingPosPage';
import ConsultCreditNotes from './pages/PanelUser/05InvoicingAndPos/03CreditNotes/ConsultCreditNotes/ConsultCreditNotes';
import CreateCreditNotesPage from './pages/PanelUser/05InvoicingAndPos/03CreditNotes/CreateCreditNotes/CreateCreditNotesPage';
import ConsultDebitNotesPage from './pages/PanelUser/05InvoicingAndPos/04DebitNotes/ConsultDebitNotes/ConsultDebitNotesPage';
import CreateDebitNotesPage from './pages/PanelUser/05InvoicingAndPos/04DebitNotes/CreateDebitNotes/CreateDebitNotesPage';
import RecurringInvoicesPage from './pages/PanelUser/05InvoicingAndPos/05RecurringInvoices/RecurringInvoicesPage';
// import QuotationsPage from './pages/PanelUser/05InvoicingAndPos/06Quotations/QuotationsPage';
import ReceivedPaymentsPage from './pages/PanelUser/05InvoicingAndPos/07ReceivedPayments/ReceivedPaymentsPage';
// SIDEBAR - ELECTRONIC-PAYROLL
import ElectronicPayrollPage from './pages/PanelUser/06ElectronicPayroll/ElectronicPayrollPage';
import ConsultCollaboratorPage from './pages/PanelUser/06ElectronicPayroll/01Collaborator/01ConsultCollaborator/ConsultCollaboratorPage';
import CreateCollaboratorPage from './pages/PanelUser/06ElectronicPayroll/01Collaborator/02CreateCollaborator/CreateCollaboratorPage';
// import ConsultPayrollPaymentsPage from './pages/PanelUser/06ElectronicPayroll/02PayrollPayments/01ConsultPayrollPayments/ConsultPayrollPaymentsPage';
// import CreatePayrollPaymentsPage from './pages/PanelUser/06ElectronicPayroll/02PayrollPayments/02CreatePayrollPayments/CreatePayrollPaymentsPage';
// import CertificationsPage from './pages/PanelUser/06ElectronicPayroll/03Certifications/CertificationsPage';
// import PayrollSettlementPage from './pages/PanelUser/06ElectronicPayroll/04PayrollSettlement/PayrollSettlementPage';
// SIDEBAR - CRM-CLIENT
import CrmClientsPage from './pages/PanelUser/07CrmClients/CrmClientsPage';
import ConsultCrmClientsPage from './pages/PanelUser/07CrmClients/ConsultCrmClients/ConsultCrmClientsPage';
import CreateCrmClientPage from './pages/PanelUser/07CrmClients/CreateCrmClient/CreateCrmClientPage';
// SIDEBAR - CRM-SUPPLIER
import CrmSuppliersPage from './pages/PanelUser/08CrmSuppliers/CrmSuppliersPage';
import ConsultCrmSuppliersPage from './pages/PanelUser/08CrmSuppliers/ConsultCrmSuppliers/ConsultCrmSuppliersPage';
import CreateCrmSupplierPage from './pages/PanelUser/08CrmSuppliers/CreateCrmSuppliers/CreateCrmSuppliersPage';
import TrackingYourPurchases from './pages/PanelUser/08CrmSuppliers/TrackingYourPurchases/TrackingYourPurchases';
import CustomerTracking from './pages/PanelUser/07CrmClients/CustomerTracking/CustomerTracking';
// SIDEBAR - SUSTAINABILITY
import SustainabilityPage from './pages/PanelUser/09Sustainability/SustainabilityPage';
import EnvironmentalStandardsConsultationPage from './pages/PanelUser/09Sustainability/01EnvironmentalStandardsConsultation/EnvironmentalStandardsConsultationPage';
import PlanDesignPage from './pages/PanelUser/09Sustainability/02PlanDesign/PlanDesignPage';
import AsgReportsPage from './pages/PanelUser/09Sustainability/03AsgReports/AsgReportsPage';
import SustainabilityStoriesPage from './pages/PanelUser/09Sustainability/04SustainabilityStories/SustainabilityStoriesPage';
import DiagnosticsPage from './pages/PanelUser/09Sustainability/05Diagnostics/DiagnosticsPage';
// SIDEBAR - REPORT-AND-INDICATORS
import ReportsAndIndicatorsPage from './pages/PanelUser/10ReportsAndIndicators/ReportsAndIndicatorsPage';
import BillingIndicatorsPage from './pages/PanelUser/10ReportsAndIndicators/01BillingIndicators/BillingIndicatorsPage';
import AccountsAndInventoryIndicatorsPage from './pages/PanelUser/10ReportsAndIndicators/02AccountsAndInventoryIndicators/AccountsAndInventoryIndicatorsPage';
import CalculateIndicatorsFinancialsPage from './pages/PanelUser/10ReportsAndIndicators/02AccountsAndInventoryIndicators/CalculateIndicatorsFinancials/CalculateFinancialIndicatorsPage';
import MarketingIndicatorsPage from './pages/PanelUser/10ReportsAndIndicators/03MarketingIndicators/MarketingIndicatorsPage';
import CalculateIndicatorsMarketingPage from './pages/PanelUser/10ReportsAndIndicators/03MarketingIndicators/CalculateIndicatorsMarketing/CalculateIndicatorsMarketingPage';
// import SustainabilityIndicatorsPage from './pages/PanelUser/10ReportsAndIndicators/04SustainabilityIndicators/SustainabilityIndicatorsPage';
import CustomReportPage from './pages/PanelUser/10ReportsAndIndicators/05CustomReport/CustomReportPage';
import DailyReportPage from './pages/PanelUser/10ReportsAndIndicators/06DailyReport/DailyReportPage';
import EndOfMonthReportPage from './pages/PanelUser/10ReportsAndIndicators/07EndOfMonthReport/EndOfMonthReportPage';
import SuggestedReportPage from './pages/PanelUser/10ReportsAndIndicators/08SuggestedReport/SuggestedReportPage';
// SIDEBAR - STRATEGIC-NOTIFICATIONS
import StrategicNotificationsPage from './pages/PanelUser/11StrategicNotifications/StrategicNotificationsPage';
import ProductExpiryPage from './pages/PanelUser/11StrategicNotifications/01ProductExpiry/ProductExpiryPage';
import TaxCalendarPage from './pages/PanelUser/11StrategicNotifications/02TaxCalendar/TaxCalendarPage';
// SIDEBAR - CONSULTANCIES
import ConsultanciesPage from './pages/PanelUser/12Consultancies/ConsultanciesPage';
import ContactAnAdvisorPage from './pages/PanelUser/12Consultancies/01ContactAnAdvisor/ContactAnAdvisorPage';

function App() {
    const [notifications, setNotifications] = useState<{ id: number; type: 'success' | 'delete' | 'blocked' | 'error'; message: string }[]>([]);

    const addNotification = (type: 'success' | 'delete' | 'blocked' | 'error', message: string) => {
      const id = Date.now();
      setNotifications([...notifications, { id, type, message }]);
  
      setTimeout(() => {
        setNotifications((notifications) => notifications.filter(notification => notification.id !== id));
      }, 5000);
    };

    return (
        <div className="container__General">
            <BrowserRouter>
                <WhatsApp />
                <Telegram />
                <Scroll />
                <ScrollToTop />
                <div className="notification__Container">
                    {notifications.map(({ id, type, message }) => (
                        <Notification key={id} type={type} message={message} onClose={() => setNotifications(notifications.filter(notification => notification.id !== id))} />
                    ))}
                </div>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" replace />} />
                    {/* Login */}
                    <Route path='/login' element={<LoginPage addNotification={addNotification} />} />
                    <Route path='/reset-password/complete/:idParams/:passwordResetCode' element={<ResetPasswordPage />} />
                    <Route path='/unblocking-account/complete/:idParams' element={<UnblockingAccountPage />} />
                    {/* Registros */}
                    <Route path='/register' element={<RegisterPage />} />
                    <Route path='/register-user' element={<RegisterUserPage />} />
                    {/* Rutas Protegidas */}
                    <Route element={<ProtectedRoute />}>
                        <Route path='/home' element={<HomePage />} />
                        {/* Sección NavBar - Questions */}
                        <Route path='/questions' element={<QuestionsPage />} />
                        <Route path='/questions/information-manage-your-business' element={<KeyInformationManageYourBusiness />} />
                        <Route path='/questions/support-contact' element={<ContactSupport />} />
                        <Route path='/questions/operation-platform' element={<OperationPlatform />} />
                        {/* Sección NavBar - Services */}
                        <Route path='/services' element={<ServicesPage />} />
                        <Route path='/services/activate-new-plans' element={<ServiceActivateNewPlansPage />} />
                        {/* Sección NavBar - Notifications */}
                        <Route path='/notifications' element={<NotificationsPage />} />
                        {/* Sección NavBar - Configuration */}
                        <Route path='/configuration/profile' element={<ProfileUserPage />} />
                        {/* <Route path='/configuration/your-current-plan' element={<YourCurrentPlanPage />} /> */}
                        <Route path='/configuration/mail-configuration' element={<MailConfigurationPage />} />
                        {/* <Route path='/configuration/billing-configuration' element={<BillingConfigurationPage />} /> */}
                        {/* <Route path='/configuration/role-information' element={<RoleInformationPage />} /> */}
                        {/* SideBar Home */}
                        {/* SideBar Tus Sedes */}
                        <Route path='/branches' element={<BranchPage />} />
                        <Route path='/branches/consult-branches' element={<ConsultBranchPage addNotification={addNotification} />} />
                        <Route path='/branches/create-branches' element={<CreateBranchPage addNotification={addNotification} />} />
                        {/* SideBar Inventarios */}
                        <Route path='/inventories' element={<InventoriesPage />} />
                        <Route path='/inventories/consult-assets' element={<ConsultAssetsPage />} />
                        <Route path='/inventories/create-assets' element={<CreateAssetsPage addNotification={addNotification} />} />
                        <Route path='/inventories/consult-merchandises' element={<ConsultMerchandisesPage />} />
                        <Route path='/inventories/create-merchandises' element={<CreateMerchandisesPage addNotification={addNotification}/>} />
                        <Route path='/inventories/consult-products' element={<ConsultProductsPage />} />
                        <Route path='/inventories/create-products' element={<CreateProductsPage selectedBranchId={''} addNotification={addNotification}/>} />
                        <Route path='/inventories/quote-products' element={<QuoteProductsPage />} />
                        <Route path='/inventories/consult-raw-materals' element={<ConsultRawMateralsPage />} />
                        <Route path='/inventories/create-raw-materals' element={<CreateRawMateralsPage addNotification={addNotification}/>} />
                        <Route path='/inventories/consult-services' element={<ConsultServicesPage />} />
                        <Route path='/inventories/create-services' element={<CreateServicesPage addNotification={addNotification}/>} />
                        {/* SideBar Cuentas */}
                        <Route path='/accounts' element={<AccountsPage />} />
                        <Route path='/accounts/see-records' element={<SeeRecordsPage />} />
                        <Route path='/accounts/consult-incomes' element={<ConsultIncomesPage />} />
                        <Route path='/accounts/consult-cxc' element={<ConsultCxcPage />} />
                        <Route path='/accounts/consult-expences' element={<ConsultExpencesPage />} />
                        <Route path='/accounts/consult-cxp' element={<ConsultCxpPage />} />
                        <Route path='/accounts/create-incomes' element={<CreateIncomePage />} />
                        <Route path='/accounts/fast-incomes' element={<FastIncomesPage />} />
                        
                        <Route path='/accounts/create-expenses' element={<CreateExpensesPage />} />
                        <Route path='/accounts/consult-pending-approval' element={<PendingApprovalPage />} />
                        {/* SideBar CRM Clientes */}
                        <Route path='/crm-clients' element={<CrmClientsPage />} />
                        <Route path='/crm-clients/consult-crm-clients' element={<ConsultCrmClientsPage />} />
                        <Route path='/crm-clients/create-crm-clients' element={<CreateCrmClientPage addNotification={addNotification} />} />
                        <Route path='/crm-clients/customer-tracking' element={<CustomerTracking />} />
                        {/* SideBar CRM Proveedores */}
                        <Route path='/crm-suppliers' element={<CrmSuppliersPage />} />
                        <Route path='/crm-suppliers/consult-crm-suppliers' element={<ConsultCrmSuppliersPage />} />
                        <Route path='/crm-suppliers/create-crm-suppliers' element={<CreateCrmSupplierPage addNotification={addNotification}/>} />
                        <Route path='/crm-suppliers/tracking-your-purchases' element={<TrackingYourPurchases />} />
                        {/* SideBar Facturación y POS */}
                        <Route path='/invoicing-and-pos' element={<InvoicingAndPosPage />} />
                        <Route path='/invoicing-and-pos/pos' element={<SellPointOfSalePage />} />
                        <Route path='/invoicing-and-pos/electronic-invoicing' element={<ElectronicInvoicingPage />} />
                        <Route path='/invoicing-and-pos/see-electronic-invoicing-pos' element={<SeeElectronicInvoicingPosPage />} />
                        <Route path='/invoicing-and-pos/recurring-invoices' element={<RecurringInvoicesPage />}  />
                        {/* <Route path='/invoicing-and-pos/quotations' element={<QuotationsPage />}  /> */}
                        <Route path='/invoicing-and-pos/received-payments' element={<ReceivedPaymentsPage />} />
                        <Route path='/credit-notes/consult-credit-notes' element={<ConsultCreditNotes />} />
                        <Route path='/credit-notes/create-credit-notes' element={<CreateCreditNotesPage />} />
                        <Route path='/debit-notes/consult-debit-notes' element={<ConsultDebitNotesPage />} />
                        <Route path='/debit-notes/create-debit-notes' element={<CreateDebitNotesPage />} />
                        {/* SideBar Nomina electrónica */}
                        <Route path='/electronic-payroll' element={<ElectronicPayrollPage />} />
                        <Route path='/electronic-payroll/consult-collaborators' element={<ConsultCollaboratorPage />} />
                        <Route path='/electronic-payroll/create-collaborators' element={<CreateCollaboratorPage addNotification={addNotification}/>} />
                        {/* <Route path='/electronic-payroll/consult-payroll-payments' element={<ConsultPayrollPaymentsPage />} />
                        <Route path='/electronic-payroll/create-payroll-payments' element={<CreatePayrollPaymentsPage />} />
                        <Route path='/electronic-payroll/certifications' element={<CertificationsPage />} />
                        <Route path='/electronic-payroll/payroll-settlement' element={<PayrollSettlementPage />} /> */}
                        {/* SideBar Sostenibilidad */}
                        <Route path='/sustainability' element={<SustainabilityPage />} />
                        <Route path='/sustainability/environmental-standards-consultation' element={<EnvironmentalStandardsConsultationPage />} />
                        <Route path='/sustainability/plan-design' element={<PlanDesignPage />} />
                        <Route path='/sustainability/asg-reports' element={<AsgReportsPage />} />
                        <Route path='/sustainability/sustainability-stories' element={<SustainabilityStoriesPage />} />
                        <Route path='/sustainability/diagnostics' element={<DiagnosticsPage />} />
                        {/* SideBar Reportes e indicadores */}
                        <Route path='/reports-and-indicators' element={<ReportsAndIndicatorsPage />} />
                        <Route path='/reports-and-indicators/billing-indicators' element={<BillingIndicatorsPage />} />
                        <Route path='/reports-and-indicators/accounts-and-inventory-indicators' element={<AccountsAndInventoryIndicatorsPage />} />
                        <Route path='/reports-and-indicators/accounts-and-inventory-indicators/calculate-financial-items' element={<CalculateIndicatorsFinancialsPage />} />
                        <Route path='/reports-and-indicators/marketing-indicators' element={<MarketingIndicatorsPage />} />
                        <Route path='/reports-and-indicators/marketing-indicators/calculate-marketing-items' element={<CalculateIndicatorsMarketingPage />} />
                        {/* <Route path='/reports-and-indicators/sustainability-indicators' element={<SustainabilityIndicatorsPage />} /> */}
                        <Route path='/reports-and-indicators/custom-report' element={<CustomReportPage />} />
                        <Route path='/reports-and-indicators/daily-report' element={<DailyReportPage />} />
                        <Route path='/reports-and-indicators/end-of-month-report' element={<EndOfMonthReportPage />} />
                        <Route path='/reports-and-indicators/suggested-report' element={<SuggestedReportPage />} />
                        {/* SideBar Notificaciones estratégicas */}
                        <Route path='/strategic-notifications' element={<StrategicNotificationsPage />} />
                        <Route path='/strategic-notifications/product-expiry' element={<ProductExpiryPage />} />
                        <Route path='/strategic-notifications/tax-calendar' element={<TaxCalendarPage />} />
                        {/* SideBar Asesorías para toma de decisiones */}
                        <Route path='/consultancies' element={<ConsultanciesPage />} />
                        <Route path='/consultancies/contact-an-advisor' element={<ContactAnAdvisorPage />} />
                    </Route>
                    {/* Sección Error 404 */}
                    <Route path="*" element={<Error404 />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;