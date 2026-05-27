import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
  fetchCart();
  fetchOrders();
}, []);

  // ✅ TOTAL BASED ONLY ON DISCOUNTED PRICE
  useEffect(() => {
    let sum = cartItems.reduce((acc, item) => {
      const price = Number(item.discountedPrice || 0);
      const qty = Number(item.quantity || 0);
      return acc + price * qty;
    }, 0);

    // setTotal(Number(sum.toFixed(2)));
    setTotal(parseFloat(sum.toFixed(2)));
  }, [cartItems]);



  const API = import.meta.env.VITE_API_BASE_URL;


  // ================= FETCH ORDERS =================

const fetchOrders = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));

    const payload = {
      ID: user.id || user.ID,
      Type: user.type || user.Type || "User",
    };

    // console.log("PAYLOAD:", payload);

    const response = await axios.post(
      `${API}/api/Medicines/OrderList`,
      payload
    );

    // console.log("FULL RESPONSE:", response.data);

    const code =
      response.data.statusCode || response.data.StatusCode;

    const orders =
      response.data.listOrders || response.data.ListOrders;

    // console.log("ORDERS:", orders);

    if (code === 200) {
      setOrders(orders);
    } else {
      setOrders([]);
    }
  } catch (error) {
    console.log("Error fetching orders:", error);
  }
};


  // ================= FETCH CART =================
  const fetchCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      const res = await axios.post(
        `${API}/api/Medicines/GetCart`,
        {
          userId: user.id,
        },
      );

      if (res.data.statusCode === 200) {
        const cleaned = (res.data.listCart || []).map((item) => {
          const unitPrice = Number(item.unitPrice || 0);
          const discount = Number(item.discount || 0);

          const discountedPrice =
            item.discountedPrice !== undefined && item.discountedPrice !== null
              ? Number(item.discountedPrice)
              : unitPrice - discount;

          const quantity = Number(item.quantity || 0);

          return {
            ...item,
            unitPrice,
            discount,
            quantity,
            discountedPrice: Number(discountedPrice.toFixed(2)),
            totalPrice: Number((quantity * discountedPrice).toFixed(2)),
          };
        });

        setCartItems(cleaned);
      }
    } catch (err) {
      console.log("Cart error:", err);
    }
  };

  // ================= UPDATE QTY =================
  const updateQty = async (item, change) => {
    let newQty = Number(item.quantity) + change;

    if (newQty < 1) newQty = 1;
    if (newQty > 5) return;

    try {
      const res = await axios.post(
        `${API}/api/Medicines/UpdateCartQuantity`,
        {
          id: item.id,
          quantity: newQty,
        },
      );

      if (res.data.statusCode === 200) {
        setCartItems((prev) =>
          prev.map((c) => {
            if (c.id !== item.id) return c;

            const discountedPrice =
              c.discountedPrice || (c.unitPrice - c.discount);

            return {
              ...c,
              quantity: newQty,
              totalPrice: Number((newQty * discountedPrice).toFixed(2)),
            };
          }),
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ================= REMOVE ITEM =================
  const removeFromCart = async (id) => {
    try {
      const res = await axios.post(
        `${API}/api/Medicines/DeleteCartItem`,
        { id },
      );

      if (res.data.statusCode === 200) {
        setCartItems((prev) => prev.filter((c) => c.id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ================= PLACE ORDER =================
//   const placeOrder = () => {
//   const user = JSON.parse(localStorage.getItem("user"));

//   if (!user) {
//     alert("Login required");
//     return;
//   }

//   const safeTotal = parseFloat(total);

//   if (!safeTotal || safeTotal <= 0) {
//     alert("Invalid cart total");
//     return;
//   }

//   navigate("/delivery-address", {
//     state: {
//       userId: user.id,
//       totalAmount: safeTotal,
//       cartItems: cartItems,
//     },
//   });
// };


const placeOrder = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const calculatedTotal = cartItems.reduce((acc, item) => {
    const price = Number(item.discountedPrice || 0);
    const qty = Number(item.quantity || 0);
    return acc + price * qty;
  }, 0);

  const safeTotal = Number(calculatedTotal.toFixed(2));

  navigate("/delivery-address", {
    state: {
      userId: user.id,
      totalAmount: safeTotal,
      cartItems: cartItems,
    },
  });
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0b1220] to-[#020617] text-white p-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">
        <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          🛒 My Cart
        </h1>

        {/* GO BACK BUTTON */}
        <button
          onClick={() => navigate("/user-dashboard")}
          className="px-5 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 backdrop-blur-xl transition shadow-lg"
        >
          ⬅ Go Back to Dashboard
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ================= CART ================= */}
        <div className="lg:col-span-2 space-y-5">
          {/* {cartItems?.length === 0 && (
            <div className="text-slate-400 bg-white/5 p-6 rounded-2xl border border-white/10">
              Your cart feels empty… time to add something magical ✨
            </div>
          )} */}

          {cartItems?.length === 0 && (
  <div className="flex flex-col items-center justify-center text-center bg-white/5 border border-dashed border-white/10 rounded-3xl p-14 backdrop-blur-xl">

    <div className="text-7xl mb-5">
      💊
    </div>

    <h2 className="text-3xl font-black text-white mb-3">
      Your Cart is Empty
    </h2>

    <p className="text-slate-400 max-w-md mb-8">
      Looks like you haven't added any medicines yet.
      Start exploring and add your required medicines ✨
    </p>

    <button
      onClick={() => navigate("/user-dashboard")}
      className="px-8 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold shadow-xl transition-all duration-300 hover:scale-105"
    >
      Add Medicines
    </button>

  </div>
)}

          {cartItems?.map((c) => (
            <div
              key={c.id}
              className="group flex items-center justify-between bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-xl hover:scale-[1.01] hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-cyan-500/10"
            >
              {/* LEFT */}
              <div className="flex flex-col gap-2">
                <h3 className="font-bold text-lg group-hover:text-cyan-300 transition">
                  {c.medicineName}
                </h3>

                {/* PRICE */}
                <div className="flex items-center gap-2">
                  <p className="text-emerald-400 font-bold text-lg">
                    ₹{c.discountedPrice}
                  </p>

                  {c.discount > 0 && (
                    <>
                      <p className="text-slate-500 text-xs line-through">
                        ₹{c.unitPrice}
                      </p>

                      <span className="text-xs text-yellow-400">
                        -₹{c.discount} OFF
                      </span>
                    </>
                  )}
                </div>

                {/* QUANTITY */}
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => updateQty(c, -1)}
                    className="w-8 h-8 rounded-full bg-red-500/20 hover:bg-red-500/40 text-red-300 font-bold transition"
                  >
                    -
                  </button>

                  <span className="font-bold">{c.quantity}</span>

                  <button
                    onClick={() => updateQty(c, 1)}
                    className="w-8 h-8 rounded-full bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-300 font-bold transition"
                  >
                    +
                  </button>

                  <span className="text-xs text-slate-500 ml-2">(Max 5)</span>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex flex-col items-end gap-3">
                <p className="text-emerald-400 font-bold text-lg">
                  ₹{c.totalPrice}
                </p>

                <button
                  onClick={() => removeFromCart(c.id)}
                  className="text-red-400 text-sm hover:text-red-300 hover:underline transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ================= SUMMARY ================= */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-fit backdrop-blur-xl shadow-xl hover:shadow-cyan-500/10 transition">

          <h2 className="text-2xl font-bold mb-6 text-cyan-300">
            Order Summary
          </h2>

          <div className="flex justify-between mb-4 text-slate-300">
            <span>Total</span>
            <span className="font-bold text-cyan-400">₹ {total}</span>
          </div>

         <button
  onClick={placeOrder}
  disabled={cartItems.length === 0}
  className={`w-full py-3 rounded-xl font-bold shadow-lg transition
  ${
    cartItems.length === 0
      ? "bg-slate-700 cursor-not-allowed text-slate-400"
      : "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
  }`}
>
  {cartItems.length === 0
    ? "Add Medicines First"
    : "Place Order ✨"}
</button>
        </div>
      </div>


{/* ================= RECENT ORDERS ================= */}

<div className="mt-20">

  {/* HEADING */}
  <div className="flex items-center justify-between mb-8">
    <div>
      <h2 className="text-4xl font-black text-white">
        Recent Orders
      </h2>

      <p className="text-slate-400 mt-1">
        Your latest medicine purchases
      </p>
    </div>

    <div className="px-4 py-2 rounded-2xl bg-white/10 border border-white/10 text-white font-bold">
      {orders.length} Orders
    </div>
  </div>

  {/* EMPTY */}
  {orders.length === 0 ? (
    <div className="rounded-3xl border border-dashed border-white/10 p-12 text-center bg-white/5 backdrop-blur-xl">
      <h3 className="text-2xl font-bold text-white mb-2">
        No Orders Yet
      </h3>

      <p className="text-slate-400">
        Your placed orders will appear here ✨
      </p>
    </div>
  ) : (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">

      {orders.map((o, index) => (

        <div
          key={index}
          className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl p-7 hover:scale-[1.02] transition-all duration-500 shadow-2xl"
        >

          {/* GLOW */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500" />

          {/* TOP */}
          <div className="relative z-10 flex justify-between items-start mb-6">

            <div>
              <p className="text-xs tracking-[4px] uppercase text-slate-400 mb-2">
                Order ID
              </p>

              <h3 className="text-2xl font-black text-white">
                #{o.orderNo}
              </h3>
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
                Receiver
              </span>

              <span className="text-white font-semibold text-right">
                {o.receiverName}
              </span>
            </div>

            <div className="flex justify-between gap-5">
              <span className="text-slate-400">
                Phone
              </span>

              <span className="text-white font-semibold text-right">
                {o.phone}
              </span>
            </div>

            <div className="flex justify-between gap-5">
              <span className="text-slate-400">
                Address
              </span>

              <span className="text-white font-semibold text-right max-w-[70%]">
                {o.addressLine}, {o.district}, {o.state} - {o.pincode}
              </span>
            </div>

            <div className="border-t border-white/10 pt-5 mt-5 flex items-center justify-between">

              <span className="text-slate-400">
                Total Paid
              </span>

              <span className="text-3xl font-black text-emerald-400">
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

export default Cart;