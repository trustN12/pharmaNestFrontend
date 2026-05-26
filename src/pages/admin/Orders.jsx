import { useEffect, useState } from "react";
import axios from "axios";

import AdminSidebar from "../../components/AdminSidebar";

function Orders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  // ================= FETCH ALL ORDERS =================

  const fetchOrders = async () => {

    try {

      const admin = JSON.parse(localStorage.getItem("user"));

      const payload = {
        ID: admin.id || admin.ID,
        Type: "Admin",
      };

      const response = await axios.post(
        "http://localhost:5281/api/Medicines/OrderList",
        payload
      );

      console.log(response.data);

      const code =
        response.data.statusCode || response.data.StatusCode;

      const list =
        response.data.listOrders || response.data.ListOrders;

      if (code === 200) {
        setOrders(list);
      } else {
        setOrders([]);
      }

    } catch (error) {

      console.log("Order Fetch Error:", error);

    }
  };

  return (

    <div className="flex bg-[#020617] min-h-screen text-white">

      <AdminSidebar />

      <div className="flex-1 p-8 overflow-hidden">

        {/* HEADER */}

        <div className="flex items-center justify-between mb-10">

          <div>

            <h1 className="text-5xl font-black">
              Orders
            </h1>

            <p className="text-slate-400 mt-2">
              Manage all customer medicine orders
            </p>

          </div>

          <div className="px-5 py-3 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 font-bold">
            {orders.length} Total Orders
          </div>

        </div>

        {/* EMPTY */}

        {orders.length === 0 ? (

          <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 p-16 text-center">

            <div className="text-7xl mb-5">
              📦
            </div>

            <h2 className="text-3xl font-black mb-3">
              No Orders Found
            </h2>

            <p className="text-slate-400">
              Orders will appear here after customers purchase medicines
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-7">

            {orders.map((o, index) => (

              <div
                key={index}
                className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl p-7 shadow-2xl hover:scale-[1.02] transition-all duration-500"
              >

                {/* GLOW EFFECT */}

                <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/20 blur-3xl rounded-full opacity-0 hover:opacity-100 transition-all duration-500" />

                {/* TOP */}

                <div className="relative z-10 flex justify-between items-start mb-6">

                  <div>

                    <p className="text-xs tracking-[4px] uppercase text-slate-400 mb-2">
                      Order Number
                    </p>

                    <h2 className="text-2xl font-black text-white">
                      #{o.orderNo}
                    </h2>

                  </div>

                  <div
                    className={`px-4 py-2 rounded-full text-xs font-bold border
                    ${
                      o.orderStatus === "Delivered"
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"

                        : o.orderStatus === "Pending"
                        ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"

                        : "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
                    }`}
                  >
                    {o.orderStatus}
                  </div>

                </div>

                {/* DETAILS */}

                <div className="relative z-10 space-y-4">

                  <div className="flex justify-between gap-5">

                    <span className="text-slate-400">
                      Customer ID
                    </span>

                    <span className="font-semibold text-white">
                      #{o.userID}
                    </span>

                  </div>

                  <div className="flex justify-between gap-5">

                    <span className="text-slate-400">
                      Receiver
                    </span>

                    <span className="font-semibold text-white text-right">
                      {o.receiverName}
                    </span>

                  </div>

                  <div className="flex justify-between gap-5">

                    <span className="text-slate-400">
                      Phone
                    </span>

                    <span className="font-semibold text-white">
                      {o.phone}
                    </span>

                  </div>

                  <div className="flex justify-between gap-5">

                    <span className="text-slate-400">
                      Address
                    </span>

                    <span className="font-semibold text-white text-right max-w-[70%]">
                      {o.addressLine}, {o.district}, {o.state} - {o.pincode}
                    </span>

                  </div>

                  <div className="flex justify-between gap-5">

                    <span className="text-slate-400">
                      Razorpay Payment ID
                    </span>

                    <span className="font-semibold text-cyan-300 text-right max-w-[60%] break-all">
                      {o.razorpayPaymentId}
                    </span>

                  </div>

                  <div className="flex justify-between gap-5">

                    <span className="text-slate-400">
                      Razorpay Order ID
                    </span>

                    <span className="font-semibold text-cyan-300 text-right max-w-[60%] break-all">
                      {o.razorpayOrderId}
                    </span>

                  </div>

                  {/* TOTAL */}

                  <div className="border-t border-white/10 pt-5 mt-5 flex items-center justify-between">

                    <span className="text-slate-400">
                      Total Paid
                    </span>

                    <span className="text-4xl font-black text-emerald-400">
                      ₹{Number(o.orderTotal).toFixed(2)}
                    </span>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Orders;