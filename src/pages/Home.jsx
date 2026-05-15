import Navbar from "../components/Navbar"
import { motion } from "framer-motion"
import { ShieldCheck, Truck, Stethoscope } from "lucide-react"

function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#030712] relative text-white">

      {/* Animated Background */}
      <div className="absolute inset-0">

        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/30 blur-[140px] rounded-full"></div>

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-700/30 blur-[140px] rounded-full"></div>

        <div className="absolute top-1/3 left-1/2 w-[300px] h-[300px] bg-sky-400/20 blur-[120px] rounded-full"></div>
      </div>

      <Navbar />

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-6">

        <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="inline-flex items-center gap-3 bg-white/10 border border-white/20 backdrop-blur-xl px-5 py-2 rounded-full mb-8 shadow-lg">
              <span className="h-3 w-3 bg-green-400 rounded-full animate-pulse"></span>
              <p className="text-sm tracking-wide">
                Trusted Digital Healthcare Platform
              </p>
            </div>

            <h1 className="text-6xl md:text-7xl font-black leading-tight mb-8">
              Revolutionizing

              <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-sky-500 bg-clip-text text-transparent">
                Modern Pharmacy
              </span>
            </h1>

            <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mb-10">
              Experience the next generation of healthcare commerce with AI-powered medicine delivery, trusted prescriptions, lightning-fast shipping, and a premium digital experience crafted for the future.
            </p>

            <div className="flex flex-wrap gap-5">
              <button className="bg-gradient-to-r from-cyan-400 to-blue-500 px-8 py-4 rounded-2xl text-lg font-bold shadow-2xl hover:scale-105 hover:shadow-cyan-500/40 transition-all duration-300">
                Explore Medicines
              </button>

              <button className="border border-white/20 bg-white/10 backdrop-blur-xl px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-white/20 transition-all duration-300">
                Learn More
              </button>
            </div>
          </motion.div>

          {/* Right Glass Card */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="bg-white/10 border border-white/20 backdrop-blur-2xl rounded-[40px] p-10 shadow-[0_8px_50px_rgba(0,0,0,0.4)]">

              <div className="space-y-8">

                <div className="flex items-center gap-5 bg-white/10 rounded-3xl p-5 border border-white/10">
                  <div className="bg-cyan-400/20 p-4 rounded-2xl">
                    <ShieldCheck size={34} className="text-cyan-300" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold">
                      100% Genuine Medicines
                    </h3>

                    <p className="text-slate-300 mt-1">
                      Verified and certified pharmaceutical products.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-5 bg-white/10 rounded-3xl p-5 border border-white/10">
                  <div className="bg-blue-400/20 p-4 rounded-2xl">
                    <Truck size={34} className="text-blue-300" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold">
                      Instant Delivery
                    </h3>

                    <p className="text-slate-300 mt-1">
                      Smart logistics for ultra-fast medicine delivery.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-5 bg-white/10 rounded-3xl p-5 border border-white/10">
                  <div className="bg-sky-400/20 p-4 rounded-2xl">
                    <Stethoscope size={34} className="text-sky-300" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold">
                      Doctor Consultation
                    </h3>

                    <p className="text-slate-300 mt-1">
                      Connect with professional doctors anytime.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home