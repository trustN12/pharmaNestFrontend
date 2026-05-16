import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Eye, EyeOff, LockKeyhole, ShieldCheck, HeartPulse, User, Mail } from "lucide-react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { motion } from "framer-motion";


function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const registerUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5281/api/Users/registration",
        {
          FirstName: user.firstName,
          LastName: user.lastName,
          Email: user.email,
          Password: user.password,
        },
      );

      toast.success("Registration Successful ✅");

      // Navigate to dashboard
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);

      console.log(response.data);

      // Clear Form
      setUser({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error);

      toast.error("Registration Failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] overflow-hidden relative">
      <Navbar />

      {/* Toast */}
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />

      {/* Background Glow */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-cyan-500/20 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-blue-700/20 blur-[120px] rounded-full"></div>

      {/* Main Section */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl w-full">
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="text-white"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-cyan-500/10 border border-cyan-400/20 p-4 rounded-2xl">
                <HeartPulse className="text-cyan-400" size={34} />
              </div>

              <h1 className="text-6xl font-black leading-tight">
                Welcome to
                <span className="text-cyan-400"> PharmaNest</span>
              </h1>
            </div>

            <p className="text-slate-300 text-lg leading-9 max-w-xl">
              The next-generation digital healthcare marketplace built with
              trust, innovation, AI-powered services, and premium healthcare
              experience.
            </p>

            {/* Features */}
            <div className="mt-10 space-y-5">
              <div className="flex items-center gap-4">
                <div className="bg-cyan-500/10 p-3 rounded-xl">
                  <ShieldCheck className="text-cyan-400" />
                </div>

                <p className="text-lg text-slate-200">
                  Enterprise Grade Security
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-cyan-500/10 p-3 rounded-xl">
                  <HeartPulse className="text-cyan-400" />
                </div>

                <p className="text-lg text-slate-200">
                  Trusted Healthcare Platform
                </p>
              </div>
            </div>
          </motion.div>

          {/* Register Card */}
          <motion.form
            onSubmit={registerUser}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="backdrop-blur-2xl bg-white/10 border border-white/10 shadow-2xl rounded-[35px] p-10"
          >
            <div className="text-center mb-8">
              <h2 className="text-4xl font-black text-white mb-3">
                Create Account
              </h2>

              <p className="text-slate-300">
                Join the future of smart healthcare.
              </p>
            </div>

            {/* First Name */}
            <div className="relative mb-5">
              <User className="absolute left-4 top-4 text-cyan-400" size={20} />

              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={user.firstName}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 text-white placeholder:text-slate-400 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-cyan-400 transition duration-300"
              />
            </div>

            {/* Last Name */}
            <div className="relative mb-5">
              <User className="absolute left-4 top-4 text-cyan-400" size={20} />

              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={user.lastName}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 text-white placeholder:text-slate-400 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-cyan-400 transition duration-300"
              />
            </div>

            {/* Email */}
            <div className="relative mb-5">
              <Mail className="absolute left-4 top-4 text-cyan-400" size={20} />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={user.email}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 text-white placeholder:text-slate-400 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-cyan-400 transition duration-300"
              />
            </div>

            {/* Password */}
            <div className="relative mb-7">
              <LockKeyhole
                className="absolute left-4 top-4 text-cyan-400"
                size={20}
              />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={user.password}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 text-white placeholder:text-slate-400 rounded-2xl py-4 pl-12 pr-12 outline-none focus:border-cyan-400 transition duration-300"
              />

              {/* Eye Button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-slate-400 hover:text-cyan-400 transition duration-300"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 py-4 rounded-2xl text-white font-bold text-lg shadow-xl hover:shadow-cyan-500/30 transition duration-300"
            >
              Create Premium Account
            </motion.button>

            <p className="text-center text-slate-400 mt-6 text-sm">
              Secure • Trusted • AI Powered Healthcare
            </p>
          </motion.form>
        </div>
      </div>
    </div>
  );
}

export default Register;
