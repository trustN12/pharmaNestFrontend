import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import AdminSidebar from "../../components/AdminSidebar";

import {
  Pill,
  Search,
  Boxes,
  Trash2,
  Eye,
  X,
  Loader2,
  AlertTriangle,
  Sparkles,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

const API_BASE_URL =
  "http://localhost:5281/api/Medicines/MedicineList";

function Medicines() {
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [error, setError] = useState("");

  const modalRef = useRef(null);

  useEffect(() => {
    fetchMedicines();
  }, []);

  useEffect(() => {
    // ESC key close modal
    const handleEsc = (e) => {
      if (e.key === "Escape") setSelectedMedicine(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    if (selectedMedicine) {
      gsap.fromTo(
        modalRef.current,
        { scale: 0.8, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4 }
      );
    }
  }, [selectedMedicine]);

  const fetchMedicines = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_BASE_URL);

      const data =
        res.data?.listMedicines ||
        res.data?.medicines ||
        res.data ||
        [];

      setMedicines(Array.isArray(data) ? data : []);
    } catch {
      setError("Unable to fetch medicines.");
    } finally {
      setLoading(false);
    }
  };

  const deleteMedicine = async (id) => {
    if (!window.confirm("Delete this medicine?")) return;

    try {
      setDeleteLoading(id);

      await axios.delete(
        `${API_BASE_URL}/deleteMedicine/${id}`
      );

      setMedicines((prev) =>
        prev.filter((m) => m.id !== id)
      );
    } catch {
      alert("Delete failed");
    } finally {
      setDeleteLoading(null);
    }
  };

  const getName = (m) => m?.name || m?.medicineName || "Unknown";
  const getPrice = (m) => m?.price || m?.unitPrice || 0;
  const getStock = (m) => m?.quantity || m?.stock || 0;

  const filtered = useMemo(() => {
    return medicines.filter((m) =>
      getName(m).toLowerCase().includes(search.toLowerCase())
    );
  }, [medicines, search]);

  return (
    <div className="flex min-h-screen bg-[#020617] text-white overflow-hidden">
      <AdminSidebar />

      <div className="flex-1 relative overflow-y-auto">

        {/* DREAMY BACKGROUND */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-200px] left-[-150px] w-[500px] h-[500px] bg-cyan-500/20 blur-[160px] rounded-full" />
          <div className="absolute bottom-[-200px] right-[-150px] w-[500px] h-[500px] bg-fuchsia-500/20 blur-[160px] rounded-full" />
        </div>

        <div className="relative z-10 p-6 md:p-10">

          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col xl:flex-row justify-between gap-6 mb-10"
          >
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="text-cyan-400" />
                <p className="text-cyan-300 text-sm">
                  PharmaNest Inventory
                </p>
              </div>

              <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 bg-clip-text text-transparent">
                Medicines Vault
              </h1>

              <p className="text-slate-400 mt-2">
                Manage your medical inventory with intelligence
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-2xl">
              <div className="flex items-center gap-4">
                <Boxes className="text-cyan-400" />
                <div>
                  <p className="text-slate-400 text-sm">Total</p>
                  <h2 className="text-4xl font-black">
                    {medicines.length}
                  </h2>
                </div>
              </div>
            </div>
          </motion.div>

          {/* SEARCH */}
          <div className="relative mb-10">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search medicines..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-5 outline-none focus:border-cyan-400"
            />
          </div>

          {/* ERROR */}
          {error && (
            <div className="mb-8 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 flex gap-3">
              <AlertTriangle className="text-red-400" />
              {error}
            </div>
          )}

          {/* LIST */}
          {loading ? (
            <div className="flex justify-center py-32">
              <Loader2 className="animate-spin text-cyan-400" size={50} />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-7">
              {filtered.map((m) => (
                <motion.div
                  key={m.id}
                  whileHover={{ y: -10, rotateX: 5 }}
                  className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl transition"
                >
                  <div className="h-52 overflow-hidden">
                    <img
                      src={m.imageUrl || "https://via.placeholder.com/400"}
                      className="w-full h-full object-cover hover:scale-110 transition duration-700"
                    />
                  </div>

                  <div className="p-6">
                    <h2 className="text-xl font-black">{getName(m)}</h2>

                    <p className="text-slate-400 text-sm mt-1">
                      {m.category || "General"}
                    </p>

                    <p className="text-green-400 font-bold mt-3">
                      ₹ {getPrice(m)}
                    </p>

                    <p className="text-slate-300 text-sm">
                      Stock: {getStock(m)}
                    </p>

                    <div className="flex gap-3 mt-6">
                      <button
                        onClick={() => setSelectedMedicine(m)}
                        className="flex-1 bg-cyan-500/20 py-3 rounded-2xl flex justify-center"
                      >
                        <Eye />
                      </button>

                      <button
                        onClick={() => deleteMedicine(m.id)}
                        className="flex-1 bg-red-500/20 py-3 rounded-2xl flex justify-center"
                      >
                        {deleteLoading === m.id ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          <Trash2 />
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

         
         {/* MODAL */}
<AnimatePresence>
  {selectedMedicine && (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={() => setSelectedMedicine(null)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* BACKDROP */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-xl" />

      {/* MODAL CARD */}
      <motion.div
        initial={{ scale: 0.85, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.85, y: 20, opacity: 0 }}
        transition={{ type: "spring", stiffness: 140, damping: 18 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl max-h-[85vh] overflow-y-auto rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-3xl shadow-[0_20px_80px_rgba(0,0,0,0.6)]"
      >
        {/* GLOW DECOR */}
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-cyan-500/20 blur-[120px] rounded-full" />
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-fuchsia-500/20 blur-[120px] rounded-full" />

        {/* CLOSE BUTTON */}
        <button
          onClick={() => setSelectedMedicine(null)}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/30 hover:bg-black/50 border border-white/10 transition"
        >
          <X size={18} />
        </button>

        {/* CONTENT */}
        <div className="p-6 space-y-6">

          {/* TITLE */}
          <div>
            <h2 className="text-3xl font-black text-white tracking-tight">
              {selectedMedicine.name}
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Premium Medicine Detail View
            </p>
          </div>

          {/* STATUS */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-4 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-400/20">
              ACTIVE ITEM
            </span>

            <span className="px-4 py-1 rounded-full text-xs font-bold bg-fuchsia-500/10 text-fuchsia-300 border border-fuchsia-400/20">
              INVENTORY READY
            </span>
          </div>

          {/* INFO GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* UNIT PRICE */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:scale-[1.02] transition">
              <p className="text-xs text-slate-400">UNIT PRICE</p>
              <p className="text-2xl font-black text-green-400 mt-1">
                ₹ {selectedMedicine.unitPrice || selectedMedicine.price || 0}
              </p>
            </div>

            {/* DISCOUNTED PRICE */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:scale-[1.02] transition">
              <p className="text-xs text-slate-400">DISCOUNTED PRICE</p>
              <p className="text-2xl font-black text-yellow-400 mt-1">
                ₹ {selectedMedicine.discountedPrice || selectedMedicine.discount || 0}
              </p>
            </div>

            {/* STOCK */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:scale-[1.02] transition">
              <p className="text-xs text-slate-400">STOCK</p>
              <p className="text-2xl font-black text-cyan-300 mt-1">
                {selectedMedicine.stock || selectedMedicine.quantity || 0}
              </p>
            </div>

            {/* CATEGORY */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:scale-[1.02] transition">
              <p className="text-xs text-slate-400">CATEGORY</p>
              <p className="text-lg font-semibold text-white mt-1">
                {selectedMedicine.category || "General Medicine"}
              </p>
            </div>

            {/* MANUFACTURER */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:scale-[1.02] transition sm:col-span-2">
              <p className="text-xs text-slate-400">MANUFACTURER</p>
              <p className="text-lg font-semibold text-white mt-1">
                {selectedMedicine.manufacturer || "Not Available"}
              </p>
            </div>

          </div>

          {/* DESCRIPTION */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-xs text-slate-400 mb-2">
              DESCRIPTION
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              {selectedMedicine.description ||
                "No description available for this medicine."}
            </p>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => setSelectedMedicine(null)}
              className="flex-1 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 transition"
            >
              Close
            </button>

            <button className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-fuchsia-500 text-white font-bold shadow-lg hover:scale-[1.02] transition">
              Edit Medicine
            </button>
          </div>

        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

        </div>
      </div>
    </div>
  );
}

export default Medicines;