import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";


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
} from "lucide-react";

import { motion } from "framer-motion";

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
      { userId: user.id }
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
    const res = await axios.get("http://localhost:5281/api/Medicines/MedicineList");

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
      }
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
            : c
        )
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
      { id }
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
      }
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
      payload
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

    navigate("/login");
  };

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
              Manage medicines, AI healthcare activity, smart wallet systems,
              futuristic pharmacy services and secure patient analytics.
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
  onClick={() => document.getElementById("cartSection").scrollIntoView({ behavior: "smooth" })}
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

        {/* FEATURES */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {[
            {
              icon: Activity,
              title: "Smart Tracking",
              desc: "Track medicines, wallet transactions and healthcare analytics in real-time.",
            },

            {
              icon: HeartPulse,
              title: "AI Healthcare",
              desc: "Advanced AI recommendation systems for futuristic healthcare experience.",
            },

            {
              icon: User,
              title: "Secure Account",
              desc: "Your medical profile is protected using intelligent encrypted systems.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              className="group relative overflow-hidden bg-white/5 border border-white/10 rounded-[35px] p-8 backdrop-blur-3xl transition duration-500"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-cyan-500/10 to-blue-500/10"></div>

              <div className="relative z-10">
                <div className="w-fit p-5 rounded-3xl bg-cyan-500/10 mb-6">
                  <item.icon className="text-cyan-400" size={42} />
                </div>

                <h3 className="text-3xl font-black mb-4">{item.title}</h3>

                <p className="text-slate-400 leading-8 text-lg">{item.desc}</p>

                <div className="mt-6 flex items-center gap-2 text-cyan-300 font-semibold">
                  Explore More
                  <TrendingUp size={18} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ================= MEDICINES SECTION ================= */}
        <div className="mt-20">
          <h2 className="text-3xl font-black mb-8">Available Medicines</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {medicines?.map((m) => (
              <motion.div
                key={m.id}
                whileHover={{ scale: 1.03 }}
                className="bg-white/5 border border-white/10 rounded-[30px] p-6 backdrop-blur-2xl"
              >
                <h3 className="text-xl font-bold">{m.medicineName}</h3>

                <p className="text-slate-400 text-sm mt-1">
                  {m.manufacturer} • {m.category}
                </p>

                <div className="mt-3 flex gap-3 items-center">
                  <p className="text-emerald-400 font-bold text-lg">
                    ₹{m.discountedPrice}
                  </p>
                  <p className="line-through text-slate-500 text-sm">
                    ₹{m.unitPrice}
                  </p>
                </div>

                <p className="text-xs text-slate-400 mt-3 line-clamp-2">
                  {m.description}
                </p>

                <button
                  onClick={() => addToCart(m)}
                  className="mt-5 w-full py-3 rounded-2xl bg-cyan-500/20 border border-cyan-400/20 hover:bg-cyan-500/30 transition"
                >
                  Add To Cart
                </button>
              </motion.div>
            ))}
          </div>
        </div>

      

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
              Next Generation AI Powered Healthcare Platform ✨
            </p>

            <div className="flex items-center justify-center gap-5 mt-8 flex-wrap">
              <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10">
                Smart Pharmacy
              </div>

              <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10">
                AI Recommendation
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
