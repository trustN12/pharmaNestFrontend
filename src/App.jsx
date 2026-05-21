import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";

import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";

import MedicineList from "./pages/MedicineList";
import Cart from "./pages/Cart";

import Users from "./pages/admin/Users";
import Orders from "./pages/admin/Orders";
import AddMedicine from "./pages/admin/AddMedicine";
import Medicines from "./pages/admin/Medicines";

import ProtectedRoute from "./layouts/ProtectedRoute";
import DeliveryAddress from "./pages/DeliveryAddress";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}

        <Route path="/" element={<Home />} />

        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />

        {/* ================= USER PROTECTED ROUTES ================= */}

        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute role="Users">
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/medicine-list"
          element={
            <ProtectedRoute role="Users">
              <MedicineList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute role="Users">
              <Cart />
            </ProtectedRoute>
          }
        />

        {/* ================= ADMIN PROTECTED ROUTES ================= */}

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute role="Admin">
              <Users />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute role="Admin">
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/add-medicine"
          element={
            <ProtectedRoute role="Admin">
              <AddMedicine />
            </ProtectedRoute>
          }
        />

        <Route path="/delivery-address" element={<ProtectedRoute>
          <DeliveryAddress />
        </ProtectedRoute>} />

        <Route
          path="/admin/medicines"
          element={
            <ProtectedRoute role="Admin">
              <Medicines />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
