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


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/medicine-list" element={<MedicineList />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/admin/users" element={<Users />} />

        <Route path="/admin/orders" element={<Orders />} />

        <Route path="/admin/add-medicine" element={<AddMedicine />} />

        <Route path="/admin/medicines" element={<Medicines />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
