import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Pill, HeartPulse, Menu, X } from "lucide-react";
import { useState } from "react";

function Navbar() {

  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 w-full z-50"
    >

      <div className="mx-4 md:mx-6 mt-4 rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.15)] px-5 md:px-8 py-4 md:py-5 flex items-center justify-between">

        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="flex items-center gap-3"
        >

          <div className="bg-gradient-to-br from-cyan-400 to-blue-600 p-3 rounded-2xl shadow-lg">
            <Pill className="text-white" size={22} />
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-black tracking-wide text-white">
              PharmaNest
            </h1>

            <p className="text-[10px] md:text-xs text-blue-100 tracking-[3px] uppercase">
              Future Healthcare
            </p>
          </div>

        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-white font-medium">

          <Link
            to="/"
            className="relative group transition-all duration-300"
          >
            Home

            <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-cyan-300 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link
            to="/register"
            className="relative group transition-all duration-300"
          >
            Register

            <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-cyan-300 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link
            to="/login"
            className="relative group transition-all duration-300"
          >
            Login

            <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-cyan-300 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <button className="bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3 rounded-full font-semibold shadow-xl hover:scale-105 hover:shadow-cyan-500/40 transition-all duration-300 flex items-center gap-2">
            <HeartPulse size={18} />
            Get Started
          </button>

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white"
        >
          {open ? <X size={30} /> : <Menu size={30} />}
        </button>

      </div>

      {/* Mobile Menu */}
      {open && (

        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden mx-4 mt-3 rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-6 flex flex-col gap-5 text-white"
        >

          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="text-lg font-medium"
          >
            Home
          </Link>

          <Link
            to="/register"
            onClick={() => setOpen(false)}
            className="text-lg font-medium"
          >
            Register
          </Link>

          <Link
            to="/login"
            onClick={() => setOpen(false)}
            className="text-lg font-medium"
          >
            Login
          </Link>

          <button className="bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3 rounded-full font-semibold shadow-xl flex items-center justify-center gap-2">
            <HeartPulse size={18} />
            Get Started
          </button>

        </motion.div>

      )}

    </motion.nav>
  );
}

export default Navbar;