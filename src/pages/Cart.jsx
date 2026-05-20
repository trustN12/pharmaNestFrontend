import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  // ✅ TOTAL BASED ONLY ON DISCOUNTED PRICE
  useEffect(() => {
    let sum = cartItems.reduce((acc, item) => {
      const price = Number(item.discountedPrice || 0);
      const qty = Number(item.quantity || 0);
      return acc + price * qty;
    }, 0);

    setTotal(Number(sum.toFixed(2)));
  }, [cartItems]);

  // ================= FETCH CART =================
  const fetchCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      const res = await axios.post(
        "http://localhost:5281/api/Medicines/GetCart",
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
        "http://localhost:5281/api/Medicines/UpdateCartQuantity",
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
        "http://localhost:5281/api/Medicines/DeleteCartItem",
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
  const placeOrder = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    try {
      const response = await axios.post(
        "http://localhost:5281/api/Medicines/PlaceOrder",
        {
          ID: user.id,
        },
      );

      if (response.data.statusCode === 200) {
        alert("Order Placed Successfully");
        fetchCart();
      }
    } catch (error) {
      console.log(error);
    }
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
          {cartItems?.length === 0 && (
            <div className="text-slate-400 bg-white/5 p-6 rounded-2xl border border-white/10">
              Your cart feels empty… time to add something magical ✨
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
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white py-3 rounded-xl font-bold shadow-lg transition"
          >
            Place Order ✨
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;