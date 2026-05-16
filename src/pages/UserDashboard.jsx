

import { motion } from "framer-motion";
import {
  User,
  Wallet,
  ShieldCheck,
  Activity,
  Pill,
  ShoppingCart,
  ClipboardList,
  HeartPulse,
  LogOut,
  Sparkles,
  Bell,
  ArrowUpRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function UserDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logoutUser = () => {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#030712] overflow-hidden relative text-white">
      {/* ================= DREAMY BACKGROUND ================= */}

      {/* Main Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-250px] left-[-150px] w-[700px] h-[700px] bg-cyan-500/20 blur-[180px] rounded-full animate-pulse" />

        <div className="absolute bottom-[-250px] right-[-150px] w-[700px] h-[700px] bg-blue-600/20 blur-[180px] rounded-full animate-pulse" />

        <div className="absolute top-[35%] left-[35%] w-[300px] h-[300px] bg-pink-500/10 blur-[120px] rounded-full" />
      </div>

      {/* Neon Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:70px_70px]" />

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            y: 1000,
            opacity: 0,
          }}
          animate={{
            y: -100,
            opacity: [0, 1, 0],
            x: [0, 40, -40, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 10 + i,
            delay: i * 0.4,
          }}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
          }}
        >
          <div className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_20px_#22d3ee]" />
        </motion.div>
      ))}

      {/* Giant Dreamy Heart */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.03, 0.08, 0.03],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
        }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="text-[450px] text-pink-500 blur-sm">❤</div>
      </motion.div>

      {/* ================= CONTENT ================= */}

      <div className="relative z-10 p-6 md:p-10">
        {/* ================= TOP BAR ================= */}

        <motion.div
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-10"
        >
          <div>
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-cyan-400/20 bg-white/5 backdrop-blur-xl mb-5">
              <Sparkles className="text-cyan-300" size={18} />

              <span className="text-cyan-200 text-sm tracking-wider">
                FUTURISTIC HEALTHCARE DASHBOARD
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-tight">
              Welcome Back
              <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 text-transparent bg-clip-text">
                {user?.firstName}
              </span>
            </h1>

            <p className="text-slate-400 text-lg mt-4 max-w-2xl">
              Manage your medicines, healthcare activity, AI wellness tracking,
              and futuristic pharmacy experience in one beautiful dashboard.
            </p>
          </div>

          {/* Right Buttons */}
          <div className="flex items-center gap-4">
            <button className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-cyan-500/20 transition duration-300 backdrop-blur-xl">
              <Bell />
            </button>

            <button
              onClick={logoutUser}
              className="bg-red-500/20 border border-red-500/30 hover:bg-red-500/30 transition px-6 py-4 rounded-2xl flex items-center gap-3 backdrop-blur-xl"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </motion.div>

        {/* ================= HERO PROFILE ================= */}

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative overflow-hidden bg-white/5 border border-white/10 rounded-[45px] backdrop-blur-3xl shadow-[0_20px_80px_rgba(0,0,0,0.6)] p-10"
        >
          {/* Floating Glow */}
          <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-cyan-500/10 blur-[120px] rounded-full" />

          <div className="grid lg:grid-cols-3 gap-10 items-center">
            {/* LEFT PROFILE */}
            <div className="flex flex-col items-center text-center">
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                }}
                className="relative"
              >
                <div className="absolute inset-0 bg-cyan-500 blur-[40px] opacity-40 rounded-full" />

                <div className="relative bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 p-8 rounded-full shadow-[0_0_60px_rgba(34,211,238,0.5)]">
                  <User size={70} />
                </div>
              </motion.div>

              <h2 className="text-4xl font-black mt-8">
                {user?.firstName} {user?.lastName}
              </h2>

              <p className="text-slate-400 mt-3 text-lg">
                {user?.email}
              </p>

              <div className="mt-6 px-6 py-3 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-bold tracking-wide">
                {user?.type || "Premium Member"}
              </div>
            </div>

            {/* RIGHT STATS */}
            <div className="lg:col-span-2 grid md:grid-cols-2 gap-7">
              {/* CARD */}
              {[
                {
                  title: "Available Fund",
                  value: `₹ ${user?.fund || 0}`,
                  icon: Wallet,
                  color: "green",
                },
                {
                  title: "Account Status",
                  value: "Active",
                  icon: ShieldCheck,
                  color: "cyan",
                },
                {
                  title: "Health Score",
                  value: "98%",
                  icon: HeartPulse,
                  color: "pink",
                },
                {
                  title: "Activity",
                  value: "Excellent",
                  icon: Activity,
                  color: "blue",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{
                    scale: 1.04,
                    y: -5,
                  }}
                  className="group relative overflow-hidden bg-white/5 border border-white/10 rounded-[30px] p-7 backdrop-blur-2xl transition duration-500"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-cyan-500/10 to-blue-600/10" />

                  <div
                    className={`w-fit p-4 rounded-2xl mb-5 bg-${item.color}-500/10`}
                  >
                    <item.icon
                      className={`text-${item.color}-400`}
                      size={34}
                    />
                  </div>

                  <h3 className="text-xl font-bold mb-3">
                    {item.title}
                  </h3>

                  <p
                    className={`text-4xl font-black text-${item.color}-400`}
                  >
                    {item.value}
                  </p>

                  <ArrowUpRight className="absolute top-6 right-6 text-slate-500 group-hover:text-cyan-300 transition duration-300" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ================= QUICK ACTIONS ================= */}

        <div className="mt-16">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-4xl font-black">
              Quick Actions
            </h2>

            <div className="text-cyan-300 text-sm tracking-widest">
              SMART FEATURES
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Medicines",
                desc: "Browse futuristic healthcare products and premium medicines.",
                icon: Pill,
                color: "cyan",
              },
              {
                title: "My Cart",
                desc: "View added medicines and complete secure checkout instantly.",
                icon: ShoppingCart,
                color: "green",
              },
              {
                title: "Orders",
                desc: "Track healthcare orders and smart prescription delivery.",
                icon: ClipboardList,
                color: "purple",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{
                  y: -12,
                  scale: 1.02,
                }}
                className="group relative overflow-hidden bg-white/5 border border-white/10 rounded-[35px] p-8 backdrop-blur-2xl cursor-pointer transition duration-500"
              >
                {/* Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-cyan-500/10 to-blue-500/10" />

                <div
                  className={`w-fit p-5 rounded-3xl bg-${item.color}-500/10 mb-6`}
                >
                  <item.icon
                    className={`text-${item.color}-400`}
                    size={40}
                  />
                </div>

                <h3 className="text-3xl font-black mb-4">
                  {item.title}
                </h3>

                <p className="text-slate-400 leading-8 text-lg">
                  {item.desc}
                </p>

                <div className="mt-8 flex items-center gap-2 text-cyan-300 font-semibold">
                  Explore
                  <ArrowUpRight size={18} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ================= FOOTER ================= */}

        <footer className="mt-24 border-t border-white/10 pt-10 pb-6 text-center">
          <motion.div
            animate={{
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
            }}
            className="text-slate-400"
          >
            <h2 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text mb-3">
              PharmaNest
            </h2>

            <p className="text-slate-500">
              Crafted with futuristic healthcare vision ✨
            </p>

            <p className="mt-6 text-sm text-slate-600">
              © 2026 PharmaNest. All Rights Reserved.
              <span className="text-cyan-400">
                {" "}
                Developed By Nabarun B
              </span>
            </p>
          </motion.div>
        </footer>
      </div>
    </div>
  );
}

export default UserDashboard;