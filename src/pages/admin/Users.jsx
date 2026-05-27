import { useEffect, useState } from "react";
import axios from "axios";

import AdminSidebar from "../../components/AdminSidebar";

import {
  Users as UsersIcon,
  Search,
  Mail,
  ShieldCheck,
  X,
  CheckCircle2,
  Clock3,
  User,
} from "lucide-react";

import { motion } from "framer-motion";

function Users() {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [selectedUser, setSelectedUser] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const [toast, setToast] = useState(null);

  const API = import.meta.env.VITE_API_BASE_URL;

  // ============================================
  // FETCH USERS
  // ============================================

  useEffect(() => {
    fetchUsers();
  }, []);

  const showToast = (type, message) => {
    setToast({ type, message });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${API}/api/Admin/GetUsers`,
      );

      if (response.data.statusCode === 200) {
        setUsers(response.data.listUsers);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // APPROVE USER
  // ============================================

  const approveUser = async (id) => {
    try {
      const response = await axios.put(
        `${API}/api/Admin/ApproveUser/${id}`,
      );

      // if (response.data.statusCode === 200) {

      //   showToast("success", "User Approved Successfully");

      //   fetchUsers();

      //   setShowModal(false);

      // }

      if (response.data.statusCode === 200) {
        showToast("success", "User Approved Successfully ✨");

        fetchUsers();

        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ============================================
  // FILTER USERS
  // ============================================

  const filteredUsers = users.filter(
    (item) =>
      `${item.firstName} ${item.lastName}`
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      item.email?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex bg-[#020617] min-h-screen text-white overflow-hidden">
      {/* SIDEBAR */}

      <AdminSidebar />

      {/* MAIN */}

      <div className="flex-1 overflow-auto relative">
        {/* BACKGROUND */}

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-cyan-500/20 blur-[140px] rounded-full"></div>

          <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-blue-500/20 blur-[140px] rounded-full"></div>
        </div>

        <div className="relative z-10 p-4 md:p-8">
          {/* HEADER */}

          <div className="flex flex-col xl:flex-row justify-between gap-6 items-start xl:items-center mb-12">
            <div>
              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white/5 border border-cyan-400/20 backdrop-blur-xl mb-5">
                <UsersIcon className="text-cyan-300" size={18} />

                <p className="text-cyan-300 uppercase tracking-[3px] text-sm font-bold">
                  PharmaNest Users
                </p>
              </div>

              <h1 className="text-4xl md:text-6xl font-black">
                Users Management
              </h1>

              <p className="text-slate-400 mt-4 text-lg">
                Monitor, approve and manage all registered users.
              </p>
            </div>

            {/* SEARCH */}

            <div className="w-full xl:w-[380px] relative">
              <Search
                className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />

              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-5 outline-none focus:border-cyan-400 backdrop-blur-xl"
              />
            </div>
          </div>

          {/* USERS GRID */}

          {loading ? (
            <div className="flex justify-center items-center h-[400px]">
              <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8">
              {filteredUsers.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                  }}
                  onClick={() => {
                    setSelectedUser(item);

                    setShowModal(true);
                  }}
                  className="cursor-pointer bg-white/5 border border-white/10 rounded-[35px] p-7 backdrop-blur-3xl relative overflow-hidden"
                >
                  {/* GLOW */}

                  <div className="absolute top-[-60px] right-[-60px] w-[160px] h-[160px] bg-cyan-400/10 blur-[90px] rounded-full"></div>

                  {/* TOP */}

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-8">
                      <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-cyan-400 to-blue-600 flex items-center justify-center text-3xl font-black shadow-[0_0_30px_rgba(34,211,238,0.5)]">
                        {item.firstName?.charAt(0)}
                      </div>

                      {item.status?.toLowerCase() === "approved" ? (
                        <div className="flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full border border-green-500/20">
                          <CheckCircle2 size={18} />
                          Approved
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full border border-yellow-500/20">
                          <Clock3 size={18} />
                          Pending
                        </div>
                      )}
                    </div>

                    {/* USER DETAILS */}

                    <h2 className="text-2xl font-black mb-2">
                      {item.firstName} {item.lastName}
                    </h2>

                    <div className="flex items-center gap-3 text-slate-300 mb-5">
                      <Mail size={18} className="text-cyan-300" />

                      <p className="truncate">{item.email}</p>
                    </div>

                    <div className="flex items-center gap-3 text-cyan-300 font-semibold">
                      <ShieldCheck size={18} />

                      {item.role || "User"}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ============================================
          USER DETAILS MODAL
      ============================================ */}

      {showModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-2xl">
          {/* BACKDROP GLOW ORBS */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] bg-cyan-400/20 blur-[150px] rounded-full animate-pulse" />
            <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-emerald-400/20 blur-[150px] rounded-full animate-pulse" />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
            className="relative w-full max-w-3xl rounded-[45px] overflow-hidden border border-white/10 bg-gradient-to-br from-[#0b1220] via-[#0f172a] to-[#050816] shadow-[0_0_80px_rgba(34,211,238,0.15)]"
          >
            {/* TOP GLOW STRIP */}
            <div className="h-1 w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400" />

            <div className="p-10 relative">
              {/* HEADER */}
              <div className="flex items-start justify-between mb-10">
                <div className="flex items-center gap-6">
                  {/* AVATAR */}
                  <div className="relative">
                    <div className="w-24 h-24 rounded-[30px] bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-4xl font-black shadow-[0_0_50px_rgba(34,211,238,0.4)]">
                      {selectedUser.firstName?.charAt(0)}
                    </div>

                    {/* STATUS RING */}
                    <div
                      className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center
                ${
                  selectedUser.status?.toLowerCase() === "approved"
                    ? "bg-emerald-500 shadow-[0_0_20px_emerald]"
                    : "bg-yellow-500 shadow-[0_0_20px_gold]"
                }`}
                    ></div>
                  </div>

                  {/* NAME */}
                  <div>
                    <h1 className="text-3xl md:text-4xl font-black text-white">
                      {selectedUser.firstName} {selectedUser.lastName}
                    </h1>

                    <p className="text-cyan-300 font-semibold mt-1 tracking-wide">
                      {selectedUser.role || "User"}
                    </p>

                    <div className="mt-3">
                      <span
                        className={`px-4 py-1 rounded-full text-sm font-bold border
                  ${
                    selectedUser.status?.toLowerCase() === "approved"
                      ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/20"
                      : "bg-yellow-500/10 text-yellow-300 border-yellow-500/20"
                  }`}
                      >
                        {selectedUser.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* CLOSE BUTTON */}
                <button
                  onClick={() => setShowModal(false)}
                  className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition"
                >
                  <X />
                </button>
              </div>

              {/* DETAILS CARD */}
              <div className="grid gap-5">
                <div className="rounded-3xl p-5 bg-white/5 border border-white/10 hover:border-cyan-400/30 transition">
                  <p className="text-slate-400 text-sm mb-2 flex items-center gap-2">
                    <Mail size={16} className="text-cyan-300" />
                    Email
                  </p>
                  <p className="text-lg font-semibold break-all">
                    {selectedUser.email}
                  </p>
                </div>

                <div className="rounded-3xl p-5 bg-white/5 border border-white/10 hover:border-cyan-400/30 transition">
                  <p className="text-slate-400 text-sm mb-2 flex items-center gap-2">
                    <User size={16} className="text-cyan-300" />
                    User ID
                  </p>
                  <p className="text-lg font-semibold">{selectedUser.id}</p>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-5 mt-10">
                {selectedUser.status?.toLowerCase() !== "approved" && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => approveUser(selectedUser.id)}
                    className="flex-1 py-4 rounded-2xl font-bold text-lg bg-gradient-to-r from-emerald-400 to-cyan-500 text-black shadow-[0_0_40px_rgba(34,211,238,0.3)]"
                  >
                    Approve User ✨
                  </motion.button>
                )}

                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 font-semibold transition"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}



      {toast && (
  <motion.div
    initial={{ opacity: 0, y: 50, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 30 }}
    transition={{ type: "spring", stiffness: 200, damping: 15 }}
    className="fixed bottom-8 right-8 z-[9999]"
  >
    <div
      className={`
        min-w-[320px] px-6 py-4 rounded-2xl border backdrop-blur-2xl shadow-2xl
        flex items-center gap-4
        ${toast.type === "success"
          ? "bg-emerald-500/10 border-emerald-400/30 text-emerald-300"
          : "bg-red-500/10 border-red-400/30 text-red-300"
        }
      `}
    >

      {/* ICON DOT */}
      <div
        className={`
          w-3 h-3 rounded-full
          ${toast.type === "success" ? "bg-emerald-400" : "bg-red-400"}
          animate-pulse
        `}
      />

      {/* MESSAGE */}
      <p className="font-semibold text-sm tracking-wide">
        {toast.message}
      </p>

      {/* GLOW EFFECT */}
      <div
  className={`absolute inset-0 rounded-2xl blur-2xl opacity-20 pointer-events-none ${
    toast.type === "success" ? "bg-emerald-400" : "bg-red-400"
  }`}
/>
    </div>
  </motion.div>
)}
    </div>
  );
}

export default Users;
