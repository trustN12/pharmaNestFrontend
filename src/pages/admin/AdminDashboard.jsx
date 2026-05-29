import { useEffect, useState } from "react";
import axios from "axios";

import AdminSidebar from "../../components/AdminSidebar";

import {
  Users,
  ShoppingBag,
  Pill,
  TrendingUp,
  Sparkles,
  Bell,
  User,
  Mail,
  ShieldCheck,
  Package,
  Activity,
  LogOut,
} from "lucide-react";

import { motion } from "framer-motion";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

function AdminDashboard() {

  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [medicines, setMedicines] = useState([]);

  const [admin, setAdmin] = useState(null);


  const API = import.meta.env.VITE_API_BASE_URL;



  // ============================================
  // FETCH DATA
  // ============================================

  useEffect(() => {

    fetchUsers();
    fetchOrders();
    fetchMedicines();
    fetchAdminDetails();

  }, []);

  // ============================================
  // FETCH ADMIN DETAILS
  // ============================================

 const fetchAdminDetails = async () => {

  try {

    const response = await axios.get(
      `${API}/api/Admin/GetAdminProfile`
    );

    if (response.data.statusCode === 200) {

      setAdmin({

        name:
          response.data.admin.firstName +
          " " +
          response.data.admin.lastName,

        email: response.data.admin.email,

        role: response.data.admin.type,

      });

    }

  } catch (error) {

    console.log(error);

  }
};

  // ============================================
  // FETCH USERS
  // ============================================

  const fetchUsers = async () => {

    try {

      const response = await axios.get(
        `${API}/api/Admin/GetUsers`
      );

      if (response.data.statusCode === 200) {

        setUsers(response.data.listUsers);

      }

    } catch (error) {

      console.log(error);

    }
  };

  // ============================================
  // FETCH ORDERS
  // ============================================

  const fetchOrders = async () => {

    try {

      const response = await axios.get(
        `${API}/api/Admin/GetOrders`
      );

      console.log("ORDERS API:", response.data);

      if (response.data.statusCode === 200) {

        setOrders(response.data.listOrders);

      }

    } catch (error) {

      console.log(error);

    }
  };

  // ============================================
// FETCH MEDICINES
// ============================================

const fetchMedicines = async () => {

  try {

    const response = await axios.get(
      `${API}/api/Medicines/MedicineList`
    );

    // console.log("MEDICINES API:", response.data);

    const data =
      response.data?.listMedicines ||
      response.data?.medicines ||
      response.data ||
      [];

    setMedicines(Array.isArray(data) ? data : []);

  } catch (error) {

    console.log(error);

  }
};

  // ============================================
  // ANALYTICS DATA
  // ============================================

  const analyticsData = [

    {
      name: "Users",
      total: users.length,
    },

    {
      name: "Orders",
      total: orders.length,
    },

    {
      name: "Medicines",
      total: medicines.length,
    },
  ];


  // ============================================
// LOGOUT
// ============================================

const handleLogout = () => {

  // CLEAR STORAGE
  localStorage.removeItem("token");
  localStorage.removeItem("admin");

  sessionStorage.clear();

  // REMOVE HISTORY + REDIRECT
  window.history.pushState(null, "", "/login");

  window.location.replace("/login");
};


useEffect(() => {

  const token = localStorage.getItem("token");

  if (!token) {

    window.location.replace("/login");
  }

}, []);

  return (

    <div className="flex bg-[#020617] min-h-screen text-white overflow-hidden">

      {/* SIDEBAR */}

      <AdminSidebar />

      {/* MAIN */}

      <div className="flex-1 overflow-auto relative">

        {/* BACKGROUND */}

        <div className="absolute inset-0 overflow-hidden pointer-events-none">

          <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-cyan-500/20 blur-[140px] rounded-full"></div>

          <div className="absolute bottom-[-100px] right-[-100px] w-[350px] h-[350px] bg-blue-500/20 blur-[140px] rounded-full"></div>

        </div>

        <div className="relative z-10 p-4 md:p-8">

          {/* HERO */}

          <div className="flex flex-col xl:flex-row justify-between gap-8 mb-14">

            {/* LEFT */}

            <div className="flex-1">

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-cyan-400/20 backdrop-blur-xl mb-6"
              >

                <Sparkles className="text-cyan-400" size={18} />

                <p className="text-cyan-300 tracking-[3px] uppercase text-sm font-bold">
                   Admin Control Center
                </p>

              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-black leading-tight"
              >

                Welcome Back

                <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 bg-clip-text text-transparent mt-2">

                  {admin?.name || "Admin"}

                </span>

              </motion.h1>

              <p className="text-slate-400 text-lg mt-6 max-w-2xl leading-8">

                Realtime monitoring of medicines, users,
                pharmacy orders and analytics inside
                PharmaNest Admin Dashboard.

              </p>

            </div>

            {/* RIGHT ADMIN CARD */}

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full xl:w-[420px] bg-white/5 border border-white/10 rounded-[35px] p-8 backdrop-blur-3xl relative overflow-hidden"
            >

              {/* GLOW */}

              <div className="absolute top-[-80px] right-[-80px] w-[180px] h-[180px] bg-cyan-400/20 blur-[100px] rounded-full"></div>

              <div className="relative z-10">

                <div className="flex items-center justify-between mb-8">

                  <div className="flex items-center gap-4">

                    <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.5)]">

                      <User size={40} />

                    </div>

                    <div>

                      <h2 className="text-2xl font-black">

                        {admin?.name || "Admin"}

                      </h2>

                      <p className="text-cyan-300 font-semibold">

                        {admin?.role || "Super Admin"}

                      </p>

                    </div>

                  </div>

                  <div className="flex items-center gap-3">

  <Bell className="text-cyan-300" />

  <button
    onClick={handleLogout}
    className="p-3 rounded-2xl bg-red-500/20 border border-red-500/30 hover:bg-red-500/30 transition"
  >
    <LogOut size={18} className="text-red-300" />
  </button>

</div>

                </div>

                {/* PREMIUM BADGE */}

                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-blue-600 px-5 py-2 rounded-full font-bold mb-8 shadow-[0_0_25px_rgba(34,211,238,0.4)]">

                  <ShieldCheck size={18} />

                  Premium Admin

                </div>

                {/* DETAILS */}

                <div className="space-y-5">

                  <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4">

                    <Mail className="text-cyan-300" />

                    <div>

                      <p className="text-slate-400 text-sm">
                        Email
                      </p>

                      <h3 className="font-semibold">

                        {admin?.email || "No Email"}

                      </h3>

                    </div>

                  </div>

                  <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4">

                    <Activity className="text-cyan-300" />

                    <div>

                      <p className="text-slate-400 text-sm">
                        System Status
                      </p>

                      <h3 className="font-semibold text-green-400">
                        SQL Connected
                      </h3>

                    </div>

                  </div>

                  <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4">

                    <Package className="text-cyan-300" />

                    <div>

                      <p className="text-slate-400 text-sm">
                        Medicines Managed
                      </p>

                      <h3 className="font-semibold">
                        {medicines.length}
                      </h3>

                    </div>

                  </div>

                </div>

              </div>

            </motion.div>

          </div>

          {/* STATS */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">

            {[
              {
                title: "Total Users",
                value: users.length,
                icon: Users,
              },

              {
                title: "Total Orders",
                value: orders.length,
                icon: ShoppingBag,
              },

              {
                title: "Total Medicines",
                value: medicines.length,
                icon: Pill,
              },
            ].map((item, index) => (

              <motion.div
                key={index}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                }}
                className="bg-white/5 border border-white/10 rounded-[35px] p-8 backdrop-blur-3xl"
              >

                <div className="w-fit p-5 rounded-3xl bg-cyan-500/10 mb-6">

                  <item.icon className="text-cyan-400" size={40} />

                </div>

                <h2 className="text-slate-400 text-lg">
                  {item.title}
                </h2>

                <h1 className="text-5xl font-black mt-3">
                  {item.value}
                </h1>

                <div className="mt-6 flex items-center gap-2 text-cyan-300">

                  <TrendingUp size={18} />

                  Live Analytics

                </div>

              </motion.div>
            ))}

          </div>

          {/* ANALYTICS GRAPH */}

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

            {/* AREA CHART */}

            <div className="bg-white/5 border border-white/10 rounded-[35px] p-8 backdrop-blur-3xl">

              <h2 className="text-3xl font-black mb-10">
                System Analytics
              </h2>

              <div className="w-full h-[400px]">

                <ResponsiveContainer>

                  <AreaChart data={analyticsData}>

                    <defs>

                      <linearGradient id="colorData" x1="0" y1="0" x2="0" y2="1">

                        <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.8} />

                        <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />

                      </linearGradient>

                    </defs>

                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />

                    <XAxis dataKey="name" stroke="#94a3b8" />

                    <YAxis stroke="#94a3b8" />

                    <Tooltip />

                    <Area
                      type="monotone"
                      dataKey="total"
                      stroke="#22d3ee"
                      fillOpacity={1}
                      fill="url(#colorData)"
                    />

                  </AreaChart>

                </ResponsiveContainer>

              </div>

            </div>

            {/* BAR CHART */}

            <div className="bg-white/5 border border-white/10 rounded-[35px] p-8 backdrop-blur-3xl">

              <h2 className="text-3xl font-black mb-10">
                Database Growth
              </h2>

              <div className="w-full h-[400px]">

                <ResponsiveContainer>

                  <BarChart data={analyticsData}>

                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />

                    <XAxis dataKey="name" stroke="#94a3b8" />

                    <YAxis stroke="#94a3b8" />

                    <Tooltip />

                    <Bar
                      dataKey="total"
                      fill="#22d3ee"
                      radius={[12, 12, 0, 0]}
                    />

                  </BarChart>

                </ResponsiveContainer>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;