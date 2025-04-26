import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./Dashboard/Dashboard";
import SaleDashBoard from "./SalesPages/SaleDashBoard";
import SalesLeadManegment from "./SalesPages/SalesLeadManegment";
import Admin from "./Admin/Admin";
import QuotationSales from "./SalesPages/QuotationSales";
import TeamTodoSales from "./SalesPages/TeamTodoSales";
import TeamSales from "./SalesPages/TeamSales";
import AddLead from "./SalesPages/AddLead";
import MemberLead from "./SalesPages/MemberLead";
import TeamTodoDetail from "./SalesPages/TeamTodoDetail";
import AddMaster from "./SalesPages/AddMaster";
import PerchesExecutive from "./Perches/PerchesExecutive";
import ToDo from "../src/SalesPages/ToDO";
import ProtectedRoute from "./components/ProtectedRoute";
import MasterPage from "./Perches/MasterPage";
import SendResponseMater from "./Perches/SendResponseMater";
import QuotationSlip from "./Slip/QuotationSlip";
import Pricingexecutive from "./Pricing/Pricingexecutive";
import PricingDetail from "./Pricing/PricingDetail";
import ReceivePriceFromPricing from "./SalesPages/ReceivePriceFromPricing";
import LeadFullDataShow from "./SalesPages/LeadFullDataShow";
import OtherTask from "./SalesPages/OtherTask";
import Planning from "./Planning/Planning";
import PlanningDetails from "./Planning/PlanningDetails";
import NewMasterAdd from "./Planning/NewMasterAdd";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />}>
              <Route index element={<Admin />} />
              <Route path="sale_dashBoard" element={<SaleDashBoard />} />
              <Route
                path="sales_lead_management"
                element={<SalesLeadManegment masterData={<AddMaster />} />}
              />
              <Route path="quotation_sales" element={<QuotationSales />} />
              <Route path="team_todo_sales" element={<TeamTodoSales />} />
              <Route path="team_sales" element={<TeamSales />} />
              <Route path="add_lead" element={<AddLead />} />
              <Route path="/addmaster" element={<AddMaster />} />

              <Route path="/memberlead/:id" element={<MemberLead />} />
              <Route path="/teamtododetail/:id" element={<TeamTodoDetail />} />
              <Route path="/perches_executive" element={<PerchesExecutive />} />
              <Route path="/todo/:id" element={<ToDo />} />
              <Route
                path="/masterpage/:id/:quatationId"
                element={<MasterPage />}
              />
              <Route
                path="/masterpage/:id/:quatationId"
                element={<MasterPage />}
              />
              <Route
                path="/sendresponsemater/:QuatationId/:id"
                element={<SendResponseMater />}
              />
              <Route path="/quatation_slip" element={<QuotationSlip />} />
              <Route path="/pricing" element={<Pricingexecutive />} />
              <Route path="/pricingDetail/:id" element={<PricingDetail />} />
              <Route
                path="/receive_price_from_pricing"
                element={<ReceivePriceFromPricing />}
              />
              <Route
                path="/leadfulldatashow/:id"
                element={<LeadFullDataShow />}
              />
              <Route path="/other_task/:id" element={<OtherTask />} />
              <Route path="/planning" element={<Planning />} />
              <Route
                path="/planningdetails/:quatationId/:leadId"
                element={<PlanningDetails />}
              />
              <Route
                element={<NewMasterAdd />}
                path="/newMasterAdd/:quatationId/:leadId"
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
