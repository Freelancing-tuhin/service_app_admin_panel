import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./components/pages/auth/loginPage/LoginPage";
import DashBoard from "./components/pages/dashboard/DashBoard";
import ProvidersList from "./components/pages/providersList/ProvidersList";
import ProtectedRoute from "./components/protectedRoute/protectedRoute";
import ServicesList from "./components/pages/servicesList/ServicesList";
import CustomerList from "./components/pages/customerList/CustomerList";

const App = () => {
  return (
    <div className="App min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/providers" element={<ProvidersList />} />
            <Route path="/services" element={<ServicesList />} />
            <Route path="/customers" element={<CustomerList />} />
          </Route>

          {/* Fallback for undefined routes */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
