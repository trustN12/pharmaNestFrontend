// Home.jsx

import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { ShieldCheck, HeartPulse, Truck, Star } from "lucide-react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function Home() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      heroRef.current,
      {
        opacity: 0,
        scale: 1.1,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power3.out",
      },
    );

    gsap.fromTo(
      titleRef.current,
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power4.out",
      },
    );

    gsap.fromTo(
      subtitleRef.current,
      {
        y: 40,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
      },
    );

    gsap.fromTo(
      buttonRef.current,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        delay: 0.9,
        duration: 1,
        ease: "power3.out",
      },
    );
  }, []);


  const handleExploreClick = (e) => {
    // Prevent navigation since the user needs to log in first
    // e.preventDefault(); 
    
    // Trigger the toast with custom styling to match your dark/neon theme
    toast('Please log in to explore medicines', {
      icon: '🔒',
      style: {
        borderRadius: '16px',
        background: '#0f172a', // slate-900
        color: '#fff',
        border: '1px solid #22d3ee', // cyan-400
      },
    });
  };


  return (
    <div className="min-h-screen bg-[#020617] overflow-hidden text-white relative">
      {/* ADD THIS BELOW YOUR BACKGROUND GLOW DIVS */}

      {/* Neon Heart Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Heart 1 */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[18%] left-[12%]"
        >
          <div className="relative w-40 h-40 rotate-[-45deg]">
            <div className="absolute w-40 h-40 bg-red-500/20 rounded-[40px] shadow-[0_0_80px_#ff4fd8]" />

            <div className="absolute -top-20 left-0 w-40 h-40 bg-red-500/20 rounded-full shadow-[0_0_80px_#ff4fd8]" />

            <div className="absolute left-20 top-0 w-40 h-40 bg-red-500/20 rounded-full shadow-[0_0_80px_#ff4fd8]" />
          </div>
        </motion.div>

        {/* Heart 2 */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[15%] right-[10%]"
        >
          <div className="relative w-56 h-56 rotate-[-45deg]">
            <div className="absolute w-56 h-56 bg-cyan-400/10 rounded-[50px] shadow-[0_0_120px_#22d3ee]" />

            <div className="absolute -top-28 left-0 w-56 h-56 bg-cyan-400/10 rounded-full shadow-[0_0_120px_#22d3ee]" />

            <div className="absolute left-28 top-0 w-56 h-56 bg-cyan-400/10 rounded-full shadow-[0_0_120px_#22d3ee]" />
          </div>
        </motion.div>

        {/* Center Dreamy Heart */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.08, 0.18, 0.08],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="relative w-[350px] h-[350px] rotate-[-45deg]">
            <div className="absolute w-[350px] h-[350px] bg-pink-500/10 rounded-[80px] shadow-[0_0_200px_#ec4899]" />

            <div className="absolute -top-[175px] left-0 w-[350px] h-[350px] bg-pink-500/10 rounded-full shadow-[0_0_200px_#ec4899]" />

            <div className="absolute left-[175px] top-0 w-[350px] h-[350px] bg-pink-500/10 rounded-full shadow-[0_0_200px_#ec4899]" />
          </div>
        </motion.div>
      </div>

      <Navbar />

      {/* Background Glow */}
      <div className="absolute top-[-150px] left-[-100px] w-[500px] h-[500px] bg-cyan-500/20 blur-[150px] rounded-full" />

      <div className="absolute bottom-[-150px] right-[-100px] w-[500px] h-[500px] bg-blue-600/20 blur-[150px] rounded-full" />

      {/* HERO SECTION */}
      <section
        ref={heroRef}
        className="relative flex flex-col items-center justify-center text-center px-6 pt-28 pb-32"
      >
        {/* Floating Badge */}
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
          }}
          className="mb-8"
        >
          <div className="px-5 py-2 rounded-full border border-cyan-400/40 bg-white/5 backdrop-blur-xl text-cyan-300 text-sm shadow-lg shadow-cyan-500/20">
            ✨ India’s Future Of Smart Healthcare
          </div>
        </motion.div>

        {/* Main Heading */}
        <h1
          ref={titleRef}
          className="text-6xl md:text-8xl font-black leading-tight max-w-6xl"
        >
          Next Generation
          <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 text-transparent bg-clip-text">
            Medicine Delivery
          </span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="mt-8 text-slate-300 text-lg md:text-2xl max-w-3xl leading-relaxed"
        >
          Experience lightning-fast medicine delivery, trusted pharmacies, and futuristic wellness — all in one
          beautiful platform.
        </p>

        {/* Buttons */}
        <div ref={buttonRef} className="flex flex-col sm:flex-row gap-6 mt-12">
          <Link to={"/user-dashboard"}>
              <button onClick={handleExploreClick} className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-lg font-semibold hover:scale-105 transition duration-300 shadow-2xl shadow-cyan-500/40">
            Explore Medicines
          </button>
          </Link>

          <button className="px-8 py-4 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-lg hover:bg-white/10 transition duration-300">
            Learn More
          </button>
        </div>

        {/* Floating Cards */}
        <motion.div
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 5,
          }}
          className="absolute top-40 left-10 hidden xl:block"
        >
          <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-5 shadow-2xl">
            <HeartPulse className="text-pink-400 mb-3" size={35} />
            <h2 className="font-bold text-xl">24/7 Care</h2>
            <p className="text-slate-400 text-sm mt-2">
              Emergency healthcare support anytime.
            </p>
          </div>
        </motion.div>

        <motion.div
          animate={{
            y: [0, 20, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 6,
          }}
          className="absolute right-10 bottom-20 hidden xl:block"
        >
          <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-5 shadow-2xl">
            <Truck className="text-cyan-400 mb-3" size={35} />
            <h2 className="font-bold text-xl">30 Mins Delivery</h2>
            <p className="text-slate-400 text-sm mt-2">
              Fast medicine delivery at your doorstep.
            </p>
          </div>
        </motion.div>
      </section>

      {/* FEATURES SECTION */}
      <section className="px-6 md:px-16 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-black mb-6">
            Why Choose <span className="text-cyan-400">PharmaNest?</span>
          </h2>

          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Built with trust, technology, and futuristic healthcare innovation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10">
          {/* Card 1 */}
          <motion.div
            whileHover={{
              scale: 1.05,
              rotate: 1,
            }}
            className="bg-white/5 border border-white/10 rounded-[32px] p-10 backdrop-blur-2xl hover:border-cyan-400/40 transition duration-500 shadow-2xl"
          >
            <ShieldCheck className="text-cyan-400 mb-6" size={50} />

            <h3 className="text-2xl font-bold mb-4">Trusted Medicines</h3>

            <p className="text-slate-400 leading-relaxed">
              100% genuine medicines sourced from verified pharmacies and
              healthcare partners.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            whileHover={{
              scale: 1.05,
              rotate: -1,
            }}
            className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-400/30 rounded-[32px] p-10 backdrop-blur-2xl shadow-2xl shadow-cyan-500/20"
          >
            <HeartPulse className="text-pink-400 mb-6" size={50} />

            <h3 className="text-2xl font-bold mb-4">AI Health Assistant</h3>

            <p className="text-slate-300 leading-relaxed">
              Smart healthcare suggestions, reminders, and instant medical
              support powered by AI.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            whileHover={{
              scale: 1.05,
              rotate: 1,
            }}
            className="bg-white/5 border border-white/10 rounded-[32px] p-10 backdrop-blur-2xl hover:border-blue-400/40 transition duration-500 shadow-2xl"
          >
            <Star className="text-yellow-400 mb-6" size={50} />

            <h3 className="text-2xl font-bold mb-4">Premium Experience</h3>

            <p className="text-slate-400 leading-relaxed">
              Ultra-modern design, smooth interactions, and award-winning user
              experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FOOTER SECTION */}

      <footer className="relative border-t border-white/10 bg-black/30 backdrop-blur-2xl">
        {/* Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-sm" />

        <div className="max-w-7xl mx-auto px-6 md:px-16 py-16">
          <div className="grid md:grid-cols-4 gap-12">
            {/* Logo & About */}
            <div>
              <h1 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
                PharmaNest
              </h1>

              <p className="text-slate-400 mt-5 leading-relaxed">
                Revolutionizing healthcare with futuristic medicine delivery,
                AI-powered wellness, and lightning-fast service.
              </p>

              <div className="flex gap-4 mt-6">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-cyan-500/20 transition duration-300 cursor-pointer">
                  ✨
                </div>

                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-cyan-500/20 transition duration-300 cursor-pointer">
                  🚀
                </div>

                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-cyan-500/20 transition duration-300 cursor-pointer">
                  💙
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h2 className="text-xl font-bold mb-6 text-white">Quick Links</h2>

              <ul className="space-y-4 text-slate-400">
                <li className="hover:text-cyan-400 transition duration-300 cursor-pointer">
                  Home
                </li>

                <li className="hover:text-cyan-400 transition duration-300 cursor-pointer">
                  Medicines
                </li>

                <li className="hover:text-cyan-400 transition duration-300 cursor-pointer">
                  Features
                </li>

                <li className="hover:text-cyan-400 transition duration-300 cursor-pointer">
                  Contact
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h2 className="text-xl font-bold mb-6 text-white">Services</h2>

              <ul className="space-y-4 text-slate-400">
                <li className="hover:text-cyan-400 transition duration-300 cursor-pointer">
                  AI Health Assistant
                </li>

                <li className="hover:text-cyan-400 transition duration-300 cursor-pointer">
                  Fast Delivery
                </li>

                <li className="hover:text-cyan-400 transition duration-300 cursor-pointer">
                  Online Prescription
                </li>

                <li className="hover:text-cyan-400 transition duration-300 cursor-pointer">
                  Emergency Support
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h2 className="text-xl font-bold mb-6 text-white">
                Stay Updated
              </h2>

              <p className="text-slate-400 mb-5">
                Subscribe for health tips, offers, and updates.
              </p>

              <div className="flex flex-col gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none text-white placeholder:text-slate-500 focus:border-cyan-400 transition duration-300"
                />

                <button className="bg-gradient-to-r from-cyan-500 to-blue-600 py-4 rounded-2xl font-semibold hover:scale-105 transition duration-300 shadow-xl shadow-cyan-500/20">
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-white/10 mt-14 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © 2026 PharmaNest. All rights reserved.
            </p>

            <div className="flex gap-6 text-slate-500 text-sm">
              <span className="hover:text-cyan-400 cursor-pointer transition duration-300">
                Privacy Policy
              </span>

              <span className="hover:text-cyan-400 cursor-pointer transition duration-300">
                Terms & Conditions
              </span>

              <span className="hover:text-cyan-400 cursor-pointer transition duration-300">
                Support
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
