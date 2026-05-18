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
          <Link to="/" className="relative group transition-all duration-300">
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

          <button
            onClick={() => window.open("https://www.mediecho.in/", "_blank")}
            className="
    group relative overflow-hidden
    bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600
    px-7 py-3.5 rounded-2xl
    font-semibold text-white
    shadow-[0_10px_30px_rgba(59,130,246,0.35)]
    hover:shadow-[0_15px_40px_rgba(59,130,246,0.55)]
    flex items-center justify-center gap-3
    transition-all duration-500
    hover:scale-105
  "
          >
            {/* Shine Effect */}
            <span
              className="
      absolute -left-20 top-0 h-full w-16
      rotate-12 bg-white/20 blur-md
      group-hover:left-[120%]
      transition-all duration-1000
    "
            />

            {/* Default Content */}
            <div
              className="
      flex items-center gap-3
      transition-all duration-500
      group-hover:-translate-y-10
      group-hover:opacity-0
    "
            >
              <HeartPulse size={20} />
              <span>AI Health Assistant</span>
            </div>

            {/* Hover Content */}
            <div
              className="
      absolute inset-0
      flex items-center justify-center
      transition-all duration-500
      translate-y-10 opacity-0
      group-hover:translate-y-0
      group-hover:opacity-100
      text-sm md:text-base
      px-4
    "
            >
              <span className="text-cyan-100">
                Visit our AI Medical Agent —
                <span className="font-bold text-white ml-1">MediEcho AI</span>
              </span>
            </div>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-white">
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

          <button
            onClick={() => window.open("https://www.mediecho.in/", "_blank")}
            className="
    group relative overflow-hidden
    w-full sm:w-auto
    bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600
    px-5 sm:px-7
    py-3 sm:py-3.5
    rounded-2xl
    font-semibold text-white
    shadow-[0_10px_30px_rgba(59,130,246,0.35)]
    hover:shadow-[0_15px_40px_rgba(59,130,246,0.55)]
    flex items-center justify-center
    transition-all duration-500
    hover:scale-105 active:scale-95
  "
          >
            {/* Shine Effect */}
            <span
              className="
      absolute -left-20 top-0 h-full w-16
      rotate-12 bg-white/20 blur-md
      group-hover:left-[120%]
      transition-all duration-1000
    "
            />

            {/* Default Content */}
            <div
              className="
      flex items-center gap-2 sm:gap-3
      transition-all duration-500
      group-hover:-translate-y-10
      group-hover:opacity-0
    "
            >
              <HeartPulse size={18} className="sm:w-5 sm:h-5" />

              <span className="text-sm sm:text-base whitespace-nowrap">
                AI Health Assistant
              </span>
            </div>

            {/* Hover / Tap Content */}
            <div
              className="
      absolute inset-0
      flex items-center justify-center
      text-center
      px-3 sm:px-4
      transition-all duration-500
      translate-y-10 opacity-0
      group-hover:translate-y-0
      group-hover:opacity-100
      group-active:translate-y-0
      group-active:opacity-100
    "
            >
              <span
                className="
        text-[11px] sm:text-sm md:text-base
        leading-tight text-cyan-100
      "
              >
                Visit our AI Medical Agent —
                <span className="font-bold text-white ml-1">MediEcho AI</span>
              </span>
            </div>
          </button>
        </motion.div>
      )}
    </motion.nav>
  );
}

export default Navbar;
