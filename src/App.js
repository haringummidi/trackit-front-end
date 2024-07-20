import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import RequireAuth from "./components/RequireAuth";
import { Routes, Route, useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Unauthorized from "./pages/UnAuthorizedPage";
import Home from "./pages/HomePage";
import Dashboard from "./pages/DashboardPage";
import Order from "./pages/OrderPage";
import Reporting from "./pages/ReportingPage";
import Layout from "./pages/Layout";
import Missing from "./pages/MissingPage";
import { useEffect } from "react";
import useAuth from "./hooks/useAuth";
import { InventoryLayout } from "./pages/InventoryLayout";
import CreateInventory from "./components/inventory/CreateInventory";
import ListInventory from "./components/inventory/ListInventory";
import ListOrders from "./components/orders/ListOrders";
import CreateOrder from "./components/orders/CreateOrder";
import UserManagement from "./pages/UserManagement";

const ROLES = {
  SUPER_ADMIN: "1001",
  User: "2001",
  Editor: "1984",
  Admin: "5150",
};

function App() {
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = window.localStorage.getItem("userInfo");
    if (userInfo !== null) {
      console.log("fetched previous session " + userInfo);
      login(JSON.parse(userInfo));
      navigate("/home", { replace: true });
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<LoginPage />} />
        {/* <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} /> */}
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.SUPER_ADMIN]} />}>
          <Route index path="home" element={<Home />} />
          <Route path="inventory" element={<InventoryLayout />}>
            <Route index element={<ListInventory />} />
            <Route path="create" element={<CreateInventory />} />
          </Route>
          <Route path="order" element={<Order />}>
            <Route index element={<ListOrders />} />
            <Route path="create" element={<CreateOrder />} />
          </Route>
          <Route path="report" element={<Reporting />} />
          <Route path="user-settings" element={<UserManagement />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.SUPER_ADMIN]} />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>

        {/* <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="inventory" element={<Inventory />} />
        </Route> */}

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
