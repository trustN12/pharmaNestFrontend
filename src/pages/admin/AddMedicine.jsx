import { useState } from "react";
import axios from "axios";

import AdminSidebar from "../../components/AdminSidebar";

import {
  Pill,
  ImagePlus,
  IndianRupee,
  Package2,
  FileText,
  Layers3,
  PlusCircle,
  Factory,
  BadgePercent,
  CalendarDays,
} from "lucide-react";

import { motion } from "framer-motion";
import toast from "react-hot-toast";

function AddMedicine() {
  const [medicine, setMedicine] = useState({
    id: 0,

    medicineName: "",

    manufacturer: "",

    category: "",

    unitPrice: "",

    discountedPrice: "",

    stock: "",

    expiryDate: "",

    description: "",

    imageUrl: "",
  });

  const [loading, setLoading] = useState(false);

  // ============================================
  // HANDLE CHANGE
  // ============================================

  const handleChange = (e) => {
    setMedicine({
      ...medicine,

      [e.target.name]: e.target.value,
    });
  };




   const API = import.meta.env.VITE_API_BASE_URL;




  // ============================================
  // ADD MEDICINE
  // ============================================

  const addMedicine = async (e) => {

  e.preventDefault();

  try {

    setLoading(true);

    const payload = {

      id: medicine.id,

      medicineName: medicine.medicineName,

      manufacturer: medicine.manufacturer,

      category: medicine.category,

      unitPrice: parseFloat(medicine.unitPrice),

      discountedPrice: parseFloat(medicine.discountedPrice),

      stock: parseInt(medicine.stock),

      expiryDate: medicine.expiryDate,

      description: medicine.description,

      imageUrl: medicine.imageUrl,

    };

    console.log(payload);

    const response = await axios.post(
      `${API}/api/Medicines/AddUpdateMedicine`,
      payload
    );

    console.log("ADD MEDICINE RESPONSE:", response.data);

    if (response.data.StatusCode === 200) {

      toast.success(response.data.StatusMessage);

      setMedicine({

        id: 0,

        medicineName: "",

        manufacturer: "",

        category: "",

        unitPrice: "",

        discountedPrice: "",

        stock: "",

        expiryDate: "",

        description: "",

        imageUrl: "",

      });

    } else {

      toast.error(response.data.StatusMessage);

    }

  } catch (error) {

    console.log(error);

    console.log(error.response?.data);

    toast.error("Something went wrong");

  } finally {

    setLoading(false);

  }
};



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

          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white/5 border border-cyan-400/20 backdrop-blur-xl mb-6">
              <PlusCircle className="text-cyan-300" size={18} />

              <p className="text-cyan-300 uppercase tracking-[3px] text-sm font-bold">
                PharmaNest Admin
              </p>
            </div>

            <h1 className="text-4xl md:text-6xl font-black">
              Add New Medicine
            </h1>

            <p className="text-slate-400 mt-4 text-lg">
              Upload medicine details directly into SQL database.
            </p>
          </motion.div>

          {/* FORM */}

          <motion.form
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={addMedicine}
            className="bg-white/5 border border-white/10 rounded-[40px] p-6 md:p-10 backdrop-blur-3xl max-w-6xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* MEDICINE NAME */}

              <div>
                <label className="flex items-center gap-2 mb-3 text-cyan-300 font-semibold">
                  <Pill size={18} />
                  Medicine Name
                </label>

                <input
                  type="text"
                  name="medicineName"
                  value={medicine.medicineName}
                  onChange={handleChange}
                  placeholder="Enter medicine name"
                  required
                  className="w-full bg-[#0f172a] border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
                />
              </div>

              {/* MANUFACTURER */}

              <div>
                <label className="flex items-center gap-2 mb-3 text-cyan-300 font-semibold">
                  <Factory size={18} />
                  Manufacturer
                </label>

                <input
                  type="text"
                  name="manufacturer"
                  value={medicine.manufacturer}
                  onChange={handleChange}
                  placeholder="Enter manufacturer"
                  required
                  className="w-full bg-[#0f172a] border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
                />
              </div>

              {/* CATEGORY */}

              <div>
                <label className="flex items-center gap-2 mb-3 text-cyan-300 font-semibold">
                  <Layers3 size={18} />
                  Category
                </label>

                <input
                  type="text"
                  name="category"
                  value={medicine.category}
                  onChange={handleChange}
                  placeholder="Tablet / Syrup / Injection / Gel"
                  required
                  className="w-full bg-[#0f172a] border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
                />
              </div>

              {/* UNIT PRICE */}

              <div>
                <label className="flex items-center gap-2 mb-3 text-cyan-300 font-semibold">
                  <IndianRupee size={18} />
                  Unit Price
                </label>

                <input
                  type="number"
                  name="unitPrice"
                  value={medicine.unitPrice}
                  onChange={handleChange}
                  placeholder="Enter unit price"
                  required
                  className="w-full bg-[#0f172a] border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
                />
              </div>

              {/* DISCOUNTED PRICE */}

              <div>
                <label className="flex items-center gap-2 mb-3 text-cyan-300 font-semibold">
                  <BadgePercent size={18} />
                  Discounted Price
                </label>

                <input
                  type="number"
                  name="discountedPrice"
                  value={medicine.discountedPrice}
                  onChange={handleChange}
                  placeholder="Enter discounted price"
                  required
                  className="w-full bg-[#0f172a] border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
                />
              </div>

              {/* STOCK */}

              <div>
                <label className="flex items-center gap-2 mb-3 text-cyan-300 font-semibold">
                  <Package2 size={18} />
                  Stock Quantity
                </label>

                <input
                  type="number"
                  name="stock"
                  value={medicine.stock}
                  onChange={handleChange}
                  placeholder="Available stock"
                  required
                  className="w-full bg-[#0f172a] border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
                />
              </div>

              {/* EXPIRY DATE */}

              <div>
                <label className="flex items-center gap-2 mb-3 text-cyan-300 font-semibold">
                  <CalendarDays size={18} />
                  Expiry Date
                </label>

                <input
                  type="date"
                  name="expiryDate"
                  value={medicine.expiryDate}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#0f172a] border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
                />
              </div>

              {/* IMAGE URL */}

              <div>
                <label className="flex items-center gap-2 mb-3 text-cyan-300 font-semibold">
                  <ImagePlus size={18} />
                  Medicine Image URL
                </label>

                <input
                  type="text"
                  name="imageUrl"
                  value={medicine.imageUrl}
                  onChange={handleChange}
                  placeholder="Paste medicine image URL"
                  required
                  className="w-full bg-[#0f172a] border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
                />
              </div>

              {/* DESCRIPTION */}

              <div className="md:col-span-2">
                <label className="flex items-center gap-2 mb-3 text-cyan-300 font-semibold">
                  <FileText size={18} />
                  Description
                </label>

                <textarea
                  rows="5"
                  name="description"
                  value={medicine.description}
                  onChange={handleChange}
                  placeholder="Enter medicine details..."
                  required
                  className="w-full bg-[#0f172a] border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400 resize-none"
                />
              </div>
            </div>

            {/* BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="mt-10 w-full md:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 font-bold text-lg hover:scale-[1.02] transition-all shadow-[0_0_30px_rgba(34,211,238,0.35)] disabled:opacity-50"
            >
              {loading ? "Adding Medicine..." : "Add Medicine"}
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  );
}

export default AddMedicine;
