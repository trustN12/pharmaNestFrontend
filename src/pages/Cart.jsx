import { useEffect, useState } from "react";
import axios from "axios";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

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
        }
      );

      if (res.data.statusCode === 200) {
        const cleaned = (res.data.listCart || []).map((item) => {
          const unitPrice = Number(item.unitPrice || 0);
          const discount = Number(item.discount || 0);

          // ✅ proper discounted price calculation
          const discountedPrice =
            item.discountedPrice !== undefined &&
            item.discountedPrice !== null
              ? Number(item.discountedPrice)
              : unitPrice - (unitPrice * discount) / 100;

          const quantity = Number(item.quantity || 0);

          return {
            ...item,
            unitPrice,
            discount,
            quantity,
            discountedPrice,
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
        }
      );

      if (res.data.statusCode === 200) {
        setCartItems((prev) =>
          prev.map((c) => {
            if (c.id === item.id) {
              const price = Number(c.discountedPrice || c.unitPrice);

              return {
                ...c,
                quantity: newQty,
                totalPrice: Number((newQty * price).toFixed(2)),
              };
            }
            return c;
          })
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
        { id }
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
        }
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
    <div className="min-h-screen bg-[#020617] text-white p-6">
      <h1 className="text-4xl font-black text-cyan-400 mb-10">
        🛒 My Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ================= CART ================= */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems?.length === 0 && (
            <p className="text-slate-400">Cart is empty</p>
          )}

          {cartItems?.map((c) => (
            <div
              key={c.id}
              className="flex items-center justify-between bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-white/10 transition"
            >
              {/* LEFT */}
              <div className="flex flex-col gap-2">
                <h3 className="font-bold text-lg">
                  {c.medicineName}
                </h3>

                {/* PRICE (ONLY DISCOUNTED PRICE SHOWN) */}
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
        -{c.discount}%
      </span>
    </>
  )}
</div>

                {/* QUANTITY */}
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => updateQty(c, -1)}
                    className="w-8 h-8 rounded-full bg-red-500/20 text-red-400 font-bold"
                  >
                    -
                  </button>

                  <span className="font-bold">{c.quantity}</span>

                  <button
                    onClick={() => updateQty(c, 1)}
                    className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-bold"
                  >
                    +
                  </button>

                  <span className="text-xs text-slate-500 ml-2">
                    (Max 5)
                  </span>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex flex-col items-end gap-3">
                <p className="text-emerald-400 font-bold text-lg">
                  ₹{c.totalPrice}
                </p>

                <button
                  onClick={() => removeFromCart(c.id)}
                  className="text-red-400 text-sm hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ================= SUMMARY ================= */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-fit">
          <h2 className="text-2xl font-bold mb-6">
            Order Summary
          </h2>

          <div className="flex justify-between mb-4">
            <span>Total</span>
            <span className="font-bold text-cyan-400">
              ₹ {total}
            </span>
          </div>

          <button
            onClick={placeOrder}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-xl font-bold"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;