import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { motion } from "framer-motion";

import {
  ShieldCheck,
  HeartPulse,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  Sparkles,
  Activity,
  ChevronRight,
} from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5281/api/Users/login",
        {
          Email: user.email,
          Password: user.password,
        }
      );

      console.log(response.data);

      if (response.data.statusCode === 200) {

        toast.success("Login Successful ✅");

        // Save Login Data
        localStorage.setItem("isLogin", true);

        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );

        // Redirect Based On User Type
        setTimeout(() => {

          if (response.data.user.type === "Admin") {

            navigate("/admin-dashboard");

          } else {

            navigate("/user-dashboard");

          }

        }, 2000);

      } else {

        toast.error(response.data.statusMessage);

      }

    } catch (error) {

      console.log(error);

      toast.error("Login Failed ❌");

    }
  };

  return (
    <div className="min-h-screen bg-[#020617] overflow-hidden relative">
      <Navbar />

      {/* Toast */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
      />

      {/* Animated Background */}
      <div className="absolute inset-0">

        <div className="absolute top-[-150px] left-[-100px] w-[450px] h-[450px] bg-cyan-500/20 blur-[140px] rounded-full animate-pulse"></div>

        <div className="absolute bottom-[-120px] right-[-120px] w-[500px] h-[500px] bg-blue-700/20 blur-[140px] rounded-full animate-pulse"></div>

        <div className="absolute top-[40%] left-[45%] w-[300px] h-[300px] bg-purple-600/10 blur-[120px] rounded-full"></div>

      </div>

      {/* Floating Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:70px_70px]"></div>

      {/* Main */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-24">

        <div className="grid lg:grid-cols-2 gap-20 items-center max-w-7xl w-full">

          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >

            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-3 rounded-full backdrop-blur-xl mb-8">
              <Sparkles className="text-cyan-400" size={18} />

              <p className="text-cyan-300 text-sm font-semibold tracking-wider">
                NEXT GENERATION HEALTHCARE PLATFORM
              </p>
            </div>

            <h1 className="text-7xl font-black leading-[85px] text-white">
              The Future
              <br />

              of Smart
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {" "}
                Healthcare
              </span>
            </h1>

            <p className="text-slate-300 text-xl leading-10 mt-8 max-w-2xl">
              Experience an award-winning healthcare ecosystem designed
              with futuristic technology, intelligent medicine tracking,
              and ultra-secure patient management.
            </p>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-2 gap-5 mt-12">

              <div className="bg-white/5 border border-white/10 backdrop-blur-2xl p-6 rounded-3xl hover:scale-105 transition duration-500">
                <div className="bg-cyan-500/10 w-fit p-4 rounded-2xl mb-4">
                  <ShieldCheck className="text-cyan-400" />
                </div>

                <h3 className="text-white text-xl font-bold mb-2">
                  End-to-End Security
                </h3>

                <p className="text-slate-400 leading-7">
                  Your healthcare data protected with enterprise-grade security.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 backdrop-blur-2xl p-6 rounded-3xl hover:scale-105 transition duration-500">
                <div className="bg-cyan-500/10 w-fit p-4 rounded-2xl mb-4">
                  <Activity className="text-cyan-400" />
                </div>

                <h3 className="text-white text-xl font-bold mb-2">
                  AI Health Insights
                </h3>

                <p className="text-slate-400 leading-7">
                  Advanced intelligent healthcare monitoring and medicine analytics.
                </p>
              </div>

            </div>

          </motion.div>

          {/* LOGIN CARD */}
          <motion.form
            onSubmit={loginUser}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative overflow-hidden backdrop-blur-3xl bg-white/10 border border-white/10 rounded-[40px] p-10 shadow-[0_20px_80px_rgba(0,0,0,0.5)]"
          >

            {/* Glow */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/20 blur-[80px] rounded-full"></div>

            <div className="relative z-10">

              {/* Logo */}
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-5 rounded-3xl shadow-2xl shadow-cyan-500/30">
                  <HeartPulse className="text-white" size={40} />
                </div>
              </div>

              {/* Heading */}
              <div className="text-center mb-10">
                <h2 className="text-5xl font-black text-white mb-3">
                  Welcome Back
                </h2>

                <p className="text-slate-300 text-lg">
                  Login to continue your healthcare journey.
                </p>
              </div>

              {/* Email */}
              <div className="relative mb-6">

                <Mail
                  className="absolute left-5 top-5 text-cyan-400"
                  size={20}
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={user.email}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 text-white placeholder:text-slate-400 rounded-2xl py-5 pl-14 pr-5 outline-none focus:border-cyan-400 focus:bg-white/10 transition duration-300"
                />

              </div>

              {/* Password */}
              <div className="relative mb-8">

                <LockKeyhole
                  className="absolute left-5 top-5 text-cyan-400"
                  size={20}
                />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={user.password}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 text-white placeholder:text-slate-400 rounded-2xl py-5 pl-14 pr-14 outline-none focus:border-cyan-400 focus:bg-white/10 transition duration-300"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-5 text-slate-400 hover:text-cyan-400 transition"
                >
                  {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                </button>

              </div>

              {/* Button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="group w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 py-5 rounded-2xl text-white font-bold text-lg shadow-2xl hover:shadow-cyan-500/30 transition duration-500 flex items-center justify-center gap-3"
              >
                Login Securely

                <ChevronRight className="group-hover:translate-x-1 transition" />
              </motion.button>

              {/* Bottom */}
              <div className="text-center mt-8">
                <p className="text-slate-400">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-cyan-400 hover:text-cyan-300 font-semibold"
                  >
                    Create Account
                  </Link>
                </p>
              </div>

            </div>

          </motion.form>

        </div>

      </div>
    </div>
  );
}

export default Login;