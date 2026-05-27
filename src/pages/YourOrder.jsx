import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function YourOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);


  const API = import.meta.env.VITE_API_BASE_URL;

  // ================= FETCH ORDERS =================
  const fetchOrders = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

const res = await axios.post(
  `${API}/api/Medicines/OrderList`,
  {
    ID: user.id,
    Type: user.type,
  }
);

// console.log(res.data);

      // console.log("ORDER RESPONSE:", res.data);

      if (res.data.statusCode === 200) {
        setOrders(res.data.listOrders || []);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // ================= STATUS COLOR =================
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";

      case "Delivered":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";

      case "Cancelled":
        return "bg-red-500/20 text-red-300 border-red-500/30";

      default:
        return "bg-cyan-500/20 text-cyan-300 border-cyan-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0b1220] to-[#020617] text-white p-6">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10">

        <div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            📦 Your Orders
          </h1>

          <p className="text-slate-400 mt-2">
            Track all your medicine purchases beautifully ✨
          </p>
        </div>

        <button
          onClick={() => navigate("/user-dashboard")}
          className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all backdrop-blur-xl shadow-lg"
        >
          ⬅ Back to Dashboard
        </button>
      </div>

      {/* ================= LOADING ================= */}
      {loading && (
        <div className="flex items-center justify-center h-[50vh]">
          <div className="w-14 h-14 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* ================= EMPTY ================= */}
      {!loading && orders.length === 0 && (
        <div className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center backdrop-blur-xl">

          <div className="text-7xl mb-5">🛍</div>

          <h2 className="text-3xl font-bold text-white">
            No Orders Yet
          </h2>

          <p className="text-slate-400 mt-3">
            Your magical medicine journey starts here ✨
          </p>

          <button
            onClick={() => navigate("/user-dashboard")}
            className="mt-7 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-105 transition-all shadow-xl"
          >
            Explore Medicines
          </button>
        </div>
      )}

      {/* ================= ORDER GRID ================= */}
      {!loading && orders.length > 0 && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-7">

          {orders.map((order) => (
            <div
              key={order.id}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-2xl hover:shadow-cyan-500/10 hover:border-cyan-400/20 transition-all duration-500"
            >
              {/* GLOW */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-purple-500/5"></div>

              {/* TOP */}
              <div className="relative flex items-start justify-between gap-4">

                <div>
                  <p className="text-slate-400 text-sm">
                    Order Number
                  </p>

                  <h2 className="text-xl font-black text-cyan-300 mt-1 break-all">
                    #{order.orderNo}
                  </h2>
                </div>

                <div
                  className={`px-4 py-2 rounded-full border text-sm font-bold ${getStatusColor(order.orderStatus)}`}
                >
                  {order.orderStatus}
                </div>
              </div>

              {/* DIVIDER */}
              <div className="my-6 border-t border-white/10"></div>

              {/* INFO */}
              <div className="relative grid grid-cols-2 gap-5">

                <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                  <p className="text-slate-400 text-sm">
                    Total Amount
                  </p>

                  <h3 className="text-2xl font-black text-emerald-400 mt-1">
                    ₹{Number(order.orderTotal).toFixed(2)}
                  </h3>
                </div>

                <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                  <p className="text-slate-400 text-sm">
                    Payment
                  </p>

                  <h3 className="text-2xl font-black text-cyan-300 mt-1">
                    Paid
                  </h3>
                </div>
              </div>

              {/* BOTTOM */}
              <div className="relative flex items-center justify-between mt-7">

                <div>
                  <p className="text-slate-500 text-sm">
                    PharmaNest Order
                  </p>

                  <p className="text-slate-300 font-medium">
                    Thank you for shopping 💙
                  </p>
                </div>

                <button
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-105 transition-all shadow-lg"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default YourOrder;