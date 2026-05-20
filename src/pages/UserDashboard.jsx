import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import {
  User,
  Wallet,
  ShieldCheck,
  Activity,
  HeartPulse,
  LogOut,
  Mail,
  Calendar,
  Edit3,
  Save,
  Sparkles,
  Eye,
  EyeOff,
  TrendingUp,
  BadgeCheck,
  Bell,
  Search,
  X,
} from "lucide-react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserDashboard() {
  const navigate = useNavigate();

  // ================= STATES =================

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const [isEditing, setIsEditing] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [cartItems, setCartItems] = useState([]);

  const [medicines, setMedicines] = useState([]);

  const [selectedMedicine, setSelectedMedicine] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 6;

  /* FILTERED MEDICINES */
  const filteredMedicines = medicines.filter((m) =>
    m.medicineName?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  /* PAGINATED */
  const currentMedicines = filteredMedicines.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const totalPages = Math.ceil(filteredMedicines.length / ITEMS_PER_PAGE);

  const [editData, setEditData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // ================= GET USER =================

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));

    if (!localUser) {
      navigate("/login");

      return;
    }

    fetchUser(localUser.id);
  }, []);

  // ================= FETCH USER =================

  const fetchUser = async (id) => {
    try {
      const response = await axios.post(
        "http://localhost:5281/api/Users/ViewUser",
        {
          ID: id,
        },
      );

      if (response.data.statusCode === 200) {
        setUser(response.data.user);

        setEditData({
          id: response.data.user.id,
          firstName: response.data.user.firstName,
          lastName: response.data.user.lastName,
          email: response.data.user.email,
          password: response.data.user.password,
        });
      } else {
        toast.error("User not found");
      }
    } catch (error) {
      console.log(error);

      toast.error("Failed to load user");
    } finally {
      setLoading(false);
    }
  };

  // ================= FETCH CART =================
  const fetchCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      if (!user?.id) return;

      const res = await axios.post(
        "http://localhost:5281/api/Medicines/GetCart",
        { userId: user.id },
      );

      setCartItems(res.data.listCart || []);
    } catch (err) {
      console.log("Cart fetch error:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // ================= FETCH MEDICINES =================

  const fetchMedicines = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5281/api/Medicines/MedicineList",
      );

      if (res.data.statusCode === 200) {
        setMedicines(res.data.listMedicines);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // ================= UPDATE QUANTITY =================
  const updateQty = async (item, change) => {
    let newQty = item.quantity + change;

    if (newQty < 1) newQty = 1;
    if (newQty > 5) return; // max limit

    try {
      const res = await axios.post(
        "http://localhost:5281/api/Medicines/UpdateCartQuantity",
        {
          id: item.id,
          quantity: newQty,
        },
      );

      if (res.data.statusCode === 200) {
        setCartItems((prev) =>
          prev.map((c) =>
            c.id === item.id
              ? {
                  ...c,
                  quantity: newQty,
                  totalPrice: newQty * c.unitPrice,
                }
              : c,
          ),
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ================= REMOVE ITEMS =================
  const removeFromCart = async (id) => {
    try {
      const res = await axios.post(
        "http://localhost:5281/api/Medicines/DeleteCartItem",
        { id },
      );

      if (res.data.statusCode === 200) {
        setCartItems((prev) => prev.filter((c) => c.id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ================= PLACE ORDER =================
  const placeOrder = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await axios.post(
        "http://localhost:5281/api/Medicines/PlaceOrder",
        {
          userId: user.id,
        },
      );

      if (res.data.statusCode === 200) {
        toast.success("Order Placed Successfully 🎉");
        setCartItems([]);
      } else {
        toast.error(res.data.statusMessage);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ================= HANDLE CHANGE =================

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= UPDATE PROFILE =================

  const updateProfile = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5281/api/Users/UpdateProfile",
        {
          ID: editData.id,
          FirstName: editData.firstName,
          LastName: editData.lastName,
          Email: editData.email,
          Password: editData.password,
        },
      );

      if (response.data.statusCode === 200) {
        toast.success("Profile Updated Successfully ✅");

        const updatedUser = {
          ...user,
          firstName: editData.firstName,
          lastName: editData.lastName,
          email: editData.email,
          password: editData.password,
        };

        localStorage.setItem("user", JSON.stringify(updatedUser));

        setUser(updatedUser);

        setIsEditing(false);
      } else {
        toast.error(response.data.statusMessage);
      }
    } catch (error) {
      console.log(error);

      toast.error("Update failed");
    }
  };

  // ================= ADDTOCART =================
  const addToCart = async (medicine) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const payload = {
        userId: user.id,
        medicineID: medicine.id,
        quantity: 1,
        unitPrice: medicine.unitPrice,
        discountedPrice: medicine.discountedPrice,
        totalPrice: medicine.discountedPrice,
      };

      const res = await axios.post(
        "http://localhost:5281/api/Medicines/AddToCart",
        payload,
      );

      if (res.data.statusCode === 200) {
        toast.success("Added to Cart 🛒");

        // 🔥 refresh cart instantly
        fetchCart();
      } else {
        toast.error(res.data.statusMessage);
      }
    } catch (err) {
      toast.error("Error adding to cart");
    }
  };

  // ================= LOGOUT =================

  const logout = () => {

  localStorage.removeItem("user");

  localStorage.removeItem("isLogin");

  sessionStorage.clear();

  window.location.replace("/login");
};


useEffect(() => {

  const user = localStorage.getItem("user");

  if (!user) {

    window.location.replace("/login");
  }

}, []);

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center overflow-hidden relative">
        <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-cyan-500/20 blur-[120px] rounded-full"></div>

        <div className="absolute bottom-[-100px] right-[-100px] w-[350px] h-[350px] bg-blue-500/20 blur-[120px] rounded-full"></div>

        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "linear",
          }}
          className="w-24 h-24 rounded-full border-4 border-cyan-400 border-t-transparent"
        />

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            repeatType: "reverse",
          }}
          className="text-white text-4xl font-black mt-10"
        >
          Loading Dashboard...
        </motion.h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-hidden relative">
      {/* Toast */}
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />

      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-120px] left-[-100px] w-[450px] h-[450px] bg-cyan-500/20 blur-[150px] rounded-full"></div>

        <div className="absolute bottom-[-100px] right-[-100px] w-[450px] h-[450px] bg-blue-600/20 blur-[150px] rounded-full"></div>
      </div>

      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:70px_70px]"></div>

      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -40, 0],
            opacity: [0.2, 1, 0.2],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
          }}
          className="absolute"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        >
          <div className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_20px_#22d3ee]"></div>
        </motion.div>
      ))}

      {/* MAIN */}
      <div className="relative z-10 px-6 md:px-12 py-10 max-w-7xl mx-auto">
        {/* TOP BAR */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-14">
          <div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 bg-white/5 border border-cyan-400/20 px-6 py-3 rounded-full backdrop-blur-2xl mb-6 shadow-[0_0_30px_rgba(34,211,238,0.15)]"
            >
              <Sparkles className="text-cyan-400" size={18} />

              <p className="text-cyan-300 text-sm font-bold tracking-[3px] uppercase">
                Future Healthcare System
              </p>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-5xl md:text-7xl font-black leading-tight"
            >
              Welcome Back,
              <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
                {user.firstName}
              </span>
            </motion.h1>

            <p className="text-slate-400 mt-5 max-w-2xl text-lg leading-8">
              Manage medicines, smart wallet systems & futuristic pharmacy
              services.
            </p>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <motion.div
              whileHover={{
                scale: 1.08,
              }}
              className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-xl"
            >
              <Bell className="text-cyan-300" />
            </motion.div>

            {/* CART */}
            <motion.div
              onClick={() =>
                document
                  .getElementById("cartSection")
                  .scrollIntoView({ behavior: "smooth" })
              }
              whileHover={{ scale: 1.08 }}
              className="relative w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer"
            >
              <ShoppingCart
                onClick={() => navigate("/cart")}
                className="cursor-pointer"
              />

              {/* BADGE */}
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full">
                  {cartItems.reduce((a, b) => a + b.quantity, 0)}
                </span>
              )}
            </motion.div>

            {/* EDIT PROFILE BUTTON */}
            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
              onClick={() => setIsEditing(true)}
              className="bg-cyan-500/20 border border-cyan-400/20 hover:bg-cyan-500/30 px-7 py-4 rounded-3xl flex items-center gap-3 transition duration-300 shadow-[0_0_40px_rgba(34,211,238,0.15)]"
            >
              <Edit3 size={20} />
              Edit Profile
            </motion.button>

            {/* LOGOUT */}
            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
              onClick={logout}
              className="bg-red-500/20 border border-red-400/20 hover:bg-red-500/30 px-7 py-4 rounded-3xl flex items-center gap-3 transition duration-300 shadow-[0_0_40px_rgba(239,68,68,0.15)]"
            >
              <LogOut size={20} />
              Logout
            </motion.button>
          </div>
        </div>

        {/* USER CARD */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="bg-white/5 border border-white/10 backdrop-blur-3xl rounded-[40px] p-8 md:p-12 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-cyan-500/10 blur-[120px] rounded-full"></div>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* LEFT */}
            <div>
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                }}
                className="relative mb-8"
              >
                <div className="absolute inset-0 bg-cyan-400 blur-[50px] opacity-40 rounded-full"></div>

                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 flex items-center justify-center text-5xl font-black shadow-[0_0_60px_rgba(34,211,238,0.5)] relative">
                  {user.firstName?.charAt(0)}
                </div>
              </motion.div>

              <h2 className="text-4xl font-black mb-3">
                {user.firstName} {user.lastName}
              </h2>

              <p className="text-slate-400 text-lg leading-8">
                Experience futuristic healthcare management with intelligent
                medicine systems and secure account management.
              </p>

              <div className="flex flex-wrap gap-4 mt-8">
                <div className="px-5 py-3 rounded-2xl bg-cyan-500/10 border border-cyan-400/20 flex items-center gap-3">
                  <BadgeCheck className="text-cyan-400" size={18} />
                  Verified User
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="group bg-white/5 hover:bg-white/[0.08] border border-white/10 rounded-[30px] p-7 transition duration-500 backdrop-blur-2xl hover:scale-[1.03]">
                <Mail className="text-cyan-400 mb-4" size={28} />

                <p className="text-slate-400 mb-2">Email</p>

                <h3 className="font-bold text-lg break-all">{user.email}</h3>
              </div>

              <div className="group bg-white/5 hover:bg-white/[0.08] border border-white/10 rounded-[30px] p-7 transition duration-500 backdrop-blur-2xl hover:scale-[1.03]">
                <ShieldCheck className="text-cyan-400 mb-4" size={28} />

                <p className="text-slate-400 mb-2">Role</p>

                <h3 className="font-bold text-lg">{user.type}</h3>
              </div>

              <div className="group bg-white/5 hover:bg-white/[0.08] border border-white/10 rounded-[30px] p-7 transition duration-500 backdrop-blur-2xl hover:scale-[1.03]">
                <Wallet className="text-cyan-400 mb-4" size={28} />

                <p className="text-slate-400 mb-2">Wallet Balance</p>

                <h3 className="font-bold text-lg">₹ {user.fund}</h3>
              </div>

              <div className="group bg-white/5 hover:bg-white/[0.08] border border-white/10 rounded-[30px] p-7 transition duration-500 backdrop-blur-2xl hover:scale-[1.03]">
                <Calendar className="text-cyan-400 mb-4" size={28} />

                <p className="text-slate-400 mb-2">Joined On</p>

                <h3 className="font-bold text-lg">
                  {new Date(user.createdOn).toLocaleDateString()}
                </h3>
              </div>
            </div>
          </div>
        </motion.div>

        {/* EDIT PROFILE MODAL */}
        {isEditing && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="relative w-full max-w-2xl bg-[#07111f] border border-white/10 rounded-[40px] p-8 md:p-10 overflow-hidden shadow-[0_0_80px_rgba(34,211,238,0.15)]"
            >
              <div className="absolute top-[-80px] right-[-80px] w-[220px] h-[220px] bg-cyan-500/20 blur-[120px] rounded-full"></div>

              {/* HEADER */}
              <div className="flex items-start justify-between gap-5 mb-10 relative z-10">
                <div>
                  <h2 className="text-4xl font-black">Edit Profile</h2>

                  <p className="text-slate-400 mt-3">
                    Update your healthcare profile securely
                  </p>
                </div>

                <button
                  onClick={() => setIsEditing(false)}
                  className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 hover:bg-red-500/20 transition flex items-center justify-center text-2xl"
                >
                  ×
                </button>
              </div>

              {/* FORM */}
              <div className="grid md:grid-cols-2 gap-7 relative z-10">
                {/* FIRST NAME */}
                <div>
                  <label className="block mb-3 text-slate-300">
                    First Name
                  </label>

                  <input
                    type="text"
                    name="firstName"
                    value={editData.firstName}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400 transition"
                  />
                </div>

                {/* LAST NAME */}
                <div>
                  <label className="block mb-3 text-slate-300">Last Name</label>

                  <input
                    type="text"
                    name="lastName"
                    value={editData.lastName}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400 transition"
                  />
                </div>

                {/* EMAIL */}
                <div className="md:col-span-2">
                  <label className="block mb-3 text-slate-300">
                    Email Address
                  </label>

                  <div className="relative">
                    <Mail
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-400"
                      size={20}
                    />

                    <input
                      type="email"
                      value={editData.email}
                      disabled
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-5 py-4 outline-none opacity-60 cursor-not-allowed"
                    />
                  </div>

                  <p className="text-slate-500 text-sm mt-2">
                    Email cannot be changed for security reasons
                  </p>
                </div>

                {/* PASSWORD */}
                <div className="md:col-span-2">
                  <label className="block mb-3 text-slate-300">Password</label>

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={editData.password}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 pr-14 outline-none focus:border-cyan-400 transition"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 transition"
                    >
                      {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex flex-col sm:flex-row gap-4 mt-10 relative z-10">
                <motion.button
                  whileHover={{
                    scale: 1.03,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  onClick={updateProfile}
                  className="flex-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 px-8 py-5 rounded-3xl font-black flex items-center justify-center gap-4 shadow-[0_0_50px_rgba(34,211,238,0.35)] text-lg"
                >
                  <Save size={22} />
                  Save Changes
                </motion.button>

                <button
                  onClick={() => setIsEditing(false)}
                  className="px-8 py-5 rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition font-semibold"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* ================= MEDICINES SECTION ================= */}
        <div className="mt-24 relative">
          {/* TOP HEADING */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-12">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-cyan-500/10 border border-cyan-400/20 backdrop-blur-xl mb-5"
              >
                <HeartPulse className="text-cyan-300" size={18} />

                <span className="text-cyan-300 text-sm font-bold tracking-[3px] uppercase">
                  Smart Pharmacy
                </span>
              </motion.div>

              <h2 className="text-5xl md:text-6xl font-black leading-tight">
                Explore
                <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
                  Medicines
                </span>
              </h2>

              <p className="text-slate-400 mt-5 text-lg max-w-2xl leading-8">
                AI-powered futuristic medicine marketplace with premium
                healthcare experience.
              </p>
            </div>

            {/* SEARCH BAR */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="relative w-full lg:w-[500px]"
            >
              {/* GLOW */}
              <div className="absolute inset-0 bg-cyan-500/10 blur-3xl rounded-full"></div>

              <div className="relative group">
                {/* SEARCH ICON */}
                <Search
                  className="absolute left-6 top-1/2 -translate-y-1/2 text-cyan-300 z-10"
                  size={22}
                />

                {/* INPUT */}
                <input
                  type="text"
                  placeholder="Search futuristic medicines..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="
      w-full
      h-[74px]
      rounded-[30px]
      bg-white/5
      border
      border-white/10
      backdrop-blur-3xl
      pl-16
      pr-16
      text-white
      text-lg
      outline-none
      transition-all
      duration-500
      placeholder:text-slate-500
      focus:border-cyan-400/40
      focus:bg-cyan-500/5
      focus:shadow-[0_0_60px_rgba(34,211,238,0.15)]
      group-hover:border-cyan-400/20
      "
                />

                {/* CLEAR BUTTON */}
                {searchTerm && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSearchTerm("")}
                    className="
        absolute
        right-5
        top-1/2
        -translate-y-1/2
        w-10
        h-10
        rounded-full
        bg-red-500/10
        border
        border-red-400/20
        flex
        items-center
        justify-center
        hover:bg-red-500/20
        transition
        "
                  >
                    <X size={18} className="text-red-300" />
                  </motion.button>
                )}

                {/* SEARCH RESULT TEXT */}
                {searchTerm && (
                  <div className="absolute -bottom-8 left-4 text-sm text-cyan-300 font-medium">
                    {filteredMedicines.length} medicines found
                  </div>
                )}
              </div>
            </motion.div>

            {/* TOTAL MEDICINES */}
            <div className="bg-white/5 border border-white/10 px-8 py-5 rounded-[30px] backdrop-blur-2xl">
              <p className="text-slate-400 text-sm mb-1">Available Products</p>

              <h3 className="text-4xl font-black text-cyan-300">
                {filteredMedicines.length}
              </h3>
            </div>
          </div>

          {/* MEDICINE GRID */}
          {currentMedicines.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="
    col-span-full
    mt-20
    rounded-[40px]
    border
    border-white/10
    bg-white/5
    backdrop-blur-3xl
    p-14
    text-center
    "
            >
              <div className="w-28 h-28 mx-auto rounded-full bg-cyan-500/10 flex items-center justify-center mb-8 border border-cyan-400/20">
                <Search size={42} className="text-cyan-300" />
              </div>

              <h2 className="text-4xl font-black mb-4">No Medicines Found</h2>

              <p className="text-slate-400 text-lg max-w-xl mx-auto leading-8">
                We couldn't find any futuristic healthcare products matching
                your search.
              </p>
            </motion.div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
              {currentMedicines?.map((m, index) => {
                const discountPercent = Math.round(
                  ((m.unitPrice - m.discountedPrice) / m.unitPrice) * 100,
                );

                return (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    whileHover={{
                      y: -10,
                      scale: 1.02,
                    }}
                    className="group relative overflow-hidden rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-3xl p-3 min-h-[590px] transition-all duration-500 hover:border-cyan-400/30 hover:shadow-[0_0_60px_rgba(34,211,238,0.12)]"
                  >
                    {/* GLOW */}
                    <div className="absolute top-[-80px] right-[-80px] w-[180px] h-[180px] bg-cyan-500/10 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition duration-700"></div>

                    {/* DISCOUNT BADGE */}
                    {discountPercent > 0 && (
                      <div className="absolute top-5 right-5 bg-emerald-500/20 border border-emerald-400/20 text-emerald-300 px-4 py-2 rounded-full text-xs font-bold backdrop-blur-xl">
                        {discountPercent}% OFF
                      </div>
                    )}

                    {/* TOP ICON */}
                    <motion.div
                      whileHover={{ rotate: 8 }}
                      className="w-20 h-20 rounded-[28px] bg-gradient-to-br from-cyan-400/20 to-blue-500/20 border border-cyan-400/20 flex items-center justify-center mb-7 shadow-[0_0_40px_rgba(34,211,238,0.15)]"
                    >
                      <Activity className="text-cyan-300" size={34} />
                    </motion.div>

                    {/* MEDICINE NAME */}
                    <h3 className="text-2xl font-black leading-tight group-hover:text-cyan-300 transition">
                      {m.medicineName}
                    </h3>

                    {/* CATEGORY */}
                    <div className="flex flex-wrap gap-3 mt-4">
                      <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-slate-300">
                        {m.category}
                      </div>

                      <div className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-sm text-cyan-300">
                        {m.manufacturer}
                      </div>
                    </div>

                    {/* PRODUCT IMAGE */}
                    <div className="relative mt-2 mb-6 overflow-hidden rounded-[28px] bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-white/10 h-[220px] group/image">
                      <img
                        src={m.imageUrl}
                        alt={m.medicineName}
                        className="w-full h-full object-cover transition duration-700 group-hover/image:scale-110"
                      />

                      {/* IMAGE OVERLAY */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/90 via-transparent to-transparent"></div>

                      {/* FLOATING BADGE */}
                      <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-xs text-cyan-300 font-bold">
                        PharmaNest Premium
                      </div>
                    </div>

                    {/* DESCRIPTION BUTTON */}
                    <button
                      onClick={() => setSelectedMedicine(m)}
                      className="mt-4 w-full bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-400/30 rounded-2xl px-5 py-4 transition duration-300 text-left group"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-cyan-300 font-bold text-sm tracking-wide uppercase">
                            Medicine Details
                          </p>

                          <p className="text-slate-400 text-sm mt-1 line-clamp-1">
                            Click to explore full description
                          </p>
                        </div>

                        <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center group-hover:scale-110 transition">
                          <Activity className="text-cyan-300" size={20} />
                        </div>
                      </div>
                    </button>

                    {/* PRICE */}
                    <div className="flex items-end justify-between mt-8">
                      <div>
                        <div className="flex items-center gap-3">
                          <h2 className="text-4xl font-black text-emerald-400">
                            ₹{m.discountedPrice}
                          </h2>

                          {m.discountedPrice < m.unitPrice && (
                            <p className="text-slate-500 line-through text-lg">
                              ₹{m.unitPrice}
                            </p>
                          )}
                        </div>

                        <p className="text-slate-500 text-sm mt-2">
                          Premium Healthcare Pricing
                        </p>
                      </div>

                      <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-400/20 flex items-center justify-center">
                        <TrendingUp className="text-emerald-300" size={24} />
                      </div>
                    </div>

                    {/* BUTTON */}
                    <motion.button
                      whileHover={{
                        scale: 1.02,
                      }}
                      whileTap={{
                        scale: 0.96,
                      }}
                      onClick={() => addToCart(m)}
                      className="relative overflow-hidden mt-8 w-full py-4 rounded-[24px] bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 font-black text-lg shadow-[0_0_40px_rgba(34,211,238,0.25)] group/button"
                    >
                      {/* BUTTON SHINE */}
                      <div className="absolute inset-0 translate-x-[-100%] group-hover/button:translate-x-[100%] transition duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

                      <span className="relative z-10 flex items-center justify-center gap-3">
                        <ShoppingCart size={22} />
                        Add To Cart
                      </span>
                    </motion.button>

                    {/* BOTTOM BAR */}
                    <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-cyan-300">
                        <ShieldCheck size={16} />
                        Verified Medicine
                      </div>

                      <div className="text-slate-500">Pharma Grade</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* PAGINATION */}
          <div className="mt-20 flex flex-col items-center">
            {/* PAGE INFO */}
            <div className="mb-8 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-2xl">
              <p className="text-slate-400 text-sm tracking-wide">
                Showing
                <span className="text-cyan-300 font-bold mx-2">
                  {startIndex + 1}
                </span>
                to
                <span className="text-cyan-300 font-bold mx-2">
                  {Math.min(
                    startIndex + ITEMS_PER_PAGE,
                    filteredMedicines.length,
                  )}
                </span>
                of
                <span className="text-emerald-300 font-bold mx-2">
                  {filteredMedicines.length}
                </span>
                medicines
              </p>
            </div>

            {/* PAGINATION BUTTONS */}
            <div className="flex flex-wrap justify-center gap-4">
              {/* PREVIOUS */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.92 }}
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className={`px-6 py-4 rounded-2xl font-bold border transition duration-300
      ${
        currentPage === 1
          ? "bg-white/5 border-white/5 text-slate-600 cursor-not-allowed"
          : "bg-white/5 border-white/10 hover:border-cyan-400/30 hover:bg-cyan-500/10 text-white"
      }`}
              >
                ← Previous
              </motion.button>

              {/* PAGE NUMBERS */}
              <div className="flex flex-wrap justify-center gap-3">
                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1;

                  return (
                    <motion.button
                      key={page}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      onClick={() => {
                        setCurrentPage(page);

                        window.scrollTo({
                          top: 700,
                          behavior: "smooth",
                        });
                      }}
                      className={`relative overflow-hidden w-14 h-14 rounded-2xl font-black text-lg transition-all duration-300
            ${
              currentPage === page
                ? "bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 text-white shadow-[0_0_40px_rgba(34,211,238,0.35)]"
                : "bg-white/5 border border-white/10 text-slate-300 hover:border-cyan-400/30 hover:bg-cyan-500/10"
            }`}
                    >
                      {/* ACTIVE GLOW */}
                      {currentPage === page && (
                        <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
                      )}

                      <span className="relative z-10">{page}</span>
                    </motion.button>
                  );
                })}
              </div>

              {/* NEXT */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.92 }}
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className={`px-6 py-4 rounded-2xl font-bold border transition duration-300
      ${
        currentPage === totalPages
          ? "bg-white/5 border-white/5 text-slate-600 cursor-not-allowed"
          : "bg-white/5 border-white/10 hover:border-cyan-400/30 hover:bg-cyan-500/10 text-white"
      }`}
              >
                Next →
              </motion.button>
            </div>

            {/* PREMIUM FLOATING BAR */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mt-10 px-8 py-5 rounded-[28px] bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 border border-cyan-400/20 backdrop-blur-3xl shadow-[0_0_50px_rgba(34,211,238,0.08)]"
            >
              <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center">
                  <ShieldCheck className="text-cyan-300" size={28} />
                </div>

                <div>
                  <h3 className="text-xl font-black text-white">
                    Premium Pharma Experience
                  </h3>

                  <p className="text-slate-400 mt-1">
                    AI-curated healthcare marketplace with futuristic medicine
                    browsing.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ================= MEDICINE DESCRIPTION MODAL ================= */}
        {/* ================= PREMIUM MEDICINE MODAL ================= */}
        <AnimatePresence>
          {selectedMedicine && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-5"
            >
              <motion.div
                initial={{ opacity: 0, y: 80, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 80, scale: 0.9 }}
                transition={{ duration: 0.35 }}
                className="
          relative 
          w-full 
          max-w-2xl 
          max-h-[90vh]
          overflow-hidden
          rounded-[35px]
          border border-white/10
          bg-[#07111f]/95
          shadow-[0_0_120px_rgba(34,211,238,0.12)]
          backdrop-blur-3xl
        "
              >
                {/* DREAMY GLOW */}
                <div className="absolute -top-32 -right-20 w-[260px] h-[260px] bg-cyan-500/20 blur-[120px] rounded-full"></div>

                <div className="absolute -bottom-32 -left-20 w-[240px] h-[240px] bg-blue-500/20 blur-[120px] rounded-full"></div>

                {/* IMAGE */}
                <div className="relative h-[220px] sm:h-[280px] overflow-hidden">
                  <img
                    src={selectedMedicine.imageUrl}
                    alt={selectedMedicine.medicineName}
                    className="w-full h-full object-cover"
                  />

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07111f] via-[#07111f]/50 to-transparent"></div>

                  {/* CLOSE BUTTON */}
                  <button
                    onClick={() => setSelectedMedicine(null)}
                    className="
              absolute top-4 right-4
              w-12 h-12
              rounded-2xl
              bg-black/40
              border border-white/10
              backdrop-blur-xl
              text-white text-2xl
              hover:bg-red-500/20
              transition
            "
                  >
                    ×
                  </button>

                  {/* TITLE */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/20 backdrop-blur-xl mb-4">
                      <Sparkles className="text-cyan-300" size={16} />

                      <span className="text-cyan-300 text-xs sm:text-sm font-bold tracking-wide">
                        PharmaNest Premium Medicine
                      </span>
                    </div>

                    <h2 className="text-3xl sm:text-5xl font-black leading-tight text-white break-words">
                      {selectedMedicine.medicineName}
                    </h2>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="relative p-6 sm:p-8">
                  {/* DESCRIPTION CARD */}
                  <div
                    className="
              relative
              overflow-hidden
              rounded-[30px]
              border border-white/10
              bg-white/[0.04]
              backdrop-blur-2xl
              p-6 sm:p-8
            "
                  >
                    {/* INNER GLOW */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5"></div>

                    {/* TOP */}
                    <div className="relative flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center">
                        <HeartPulse className="text-cyan-300" size={22} />
                      </div>

                      <div>
                        <h3 className="text-2xl font-black text-white">
                          Medicine Overview
                        </h3>

                        <p className="text-slate-400 text-sm mt-1">
                          Intelligent pharmaceutical insights
                        </p>
                      </div>
                    </div>

                    {/* SCROLLABLE DESCRIPTION */}
                    <div className="relative max-h-[260px] overflow-y-auto pr-2">
                      <p className="text-slate-300 text-base sm:text-lg leading-8 whitespace-pre-line">
                        {selectedMedicine.description}
                      </p>
                    </div>
                  </div>

                  {/* BUTTON */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setSelectedMedicine(null)}
                    className="
              mt-6
              w-full
              py-4
              rounded-3xl
              bg-gradient-to-r
              from-cyan-400
              via-blue-500
              to-indigo-600
              font-black
              text-lg
              shadow-[0_0_50px_rgba(34,211,238,0.3)]
            "
                  >
                    Close Overview
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FOOTER */}
        <footer className="mt-24 border-t border-white/10 pt-10 pb-6 text-center">
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
            }}
          >
            <h2 className="text-4xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 text-transparent bg-clip-text mb-4">
              PharmaNest
            </h2>

            <p className="text-slate-400 text-lg">
              Next Generation Healthcare Platform ✨
            </p>

            <div className="flex items-center justify-center gap-5 mt-8 flex-wrap">
              <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10">
                Smart Pharmacy
              </div>

              <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10">
                Secure Wallet
              </div>

              <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10">
                Real-time Tracking
              </div>
            </div>

            <p className="mt-8 text-slate-500">
              © 2026 PharmaNest. All Rights Reserved.
            </p>
          </motion.div>
        </footer>
      </div>
    </div>
  );
}

export default UserDashboard;
