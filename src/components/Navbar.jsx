import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Pill, HeartPulse, Menu } from "lucide-react"

function Navbar() {
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 w-full z-50"
    >
      <div className="mx-6 mt-5 rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.15)] px-8 py-5 flex items-center justify-between">

        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3"
        >
          <div className="bg-gradient-to-br from-cyan-400 to-blue-600 p-3 rounded-2xl shadow-lg">
            <Pill className="text-white" size={24} />
          </div>

          <div>
            <h1 className="text-3xl font-black tracking-wide text-white">
              PharmaNest
            </h1>

            <p className="text-xs text-blue-100 tracking-[3px] uppercase">
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

          <button className="bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3 rounded-full font-semibold shadow-xl hover:scale-105 hover:shadow-cyan-500/40 transition-all duration-300 flex items-center gap-2">
            <HeartPulse size={18} />
            Get Started
          </button>
        </div>

        {/* Mobile Icon */}
        <button className="md:hidden text-white">
          <Menu size={28} />
        </button>
      </div>
    </motion.nav>
  )
}

export default Navbar