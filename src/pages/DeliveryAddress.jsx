import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function DeliveryAddress() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const userId = state?.userId;
  const totalAmount = state?.totalAmount;
  const cartItems = state?.cartItems;


   const API = import.meta.env.VITE_API_BASE_URL;

  // ADDRESS STATE
  const [form, setForm] = useState({
    receiverName: "",
    phone: "",
    addressLine: "",
    district: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= RAZORPAY =================
  const handlePayment = async () => {
    try {
      const amountInPaise = Math.round(Number(totalAmount) * 100);

      // const res = await axios.post(
      //   "http://localhost:5281/api/Payment/CreateOrder",
      //   {
      //     userId: userId,
      //     amount: amountInPaise,
      //   },
      // );

      const res = await axios.post(
        `${API}/api/Payment/CreateOrder`,
        {
          userId: userId,
          amount: totalAmount,
        },
      );

      const order = res.data;

    

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,

        amount: order.amount,
        currency: "INR",

        name: "PharmaNest",
        description: "Medicine Order",

        order_id: order.id,

        handler: async function (response) {
          // console.log("RAZORPAY RESPONSE:");
          // console.log(response);

          try {
            const verifyPayload = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            };

            // console.log("VERIFY PAYLOAD:");
            // console.log(verifyPayload);

            // VERIFY PAYMENT
            await axios.post(
              `${API}/api/Payment/VerifyPayment`,
              verifyPayload,
            );

            // PLACE ORDER
            await axios.post(`${API}/api/Medicines/PlaceOrder`, {
              userId: userId,
              receiverName: form.receiverName,
              phone: form.phone,
              addressLine: form.addressLine,
              district: form.district,
              state: form.state,
              pincode: form.pincode,

              razorpayPaymentId: response.razorpay_payment_id,

              razorpayOrderId: response.razorpay_order_id,
            });

            // CLEAR CART AFTER SUCCESSFUL ORDER
            await axios.post(`${API}/api/Payment/ClearCart`, {
              id: userId,
            });

            toast.success("Order Successful 🎉");

            navigate("/your-order");
          } catch (err) {
            console.log("VERIFY ERROR:");
            console.log(err.response?.data || err);

            toast.error("Payment verification failed");
          }
        },

        prefill: {
          name: form.receiverName,
          contact: form.phone,
        },

        theme: {
          color: "#06b6d4",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.log(err);
      toast.error("Payment failed");
    }
  };

  const fetchPincodeDetails = async (pin) => {
    if (pin.length !== 6) return;

    try {
      const res = await axios.get(
        `${API}/api/Payment/GetPincodeDetails/${pin}`,
      );

      const data = JSON.parse(res.data);

      if (data?.[0]?.Status === "Success") {
        const office = data[0].PostOffice[0];

        setForm((prev) => ({
          ...prev,
          district: office.District,
          state: office.State,
        }));
      }
    } catch (err) {
      console.log("Pincode fetch failed", err);
    }
  };

  let timeout;

  const handlePincodeChange = (e) => {
    const pin = e.target.value;

    setForm((prev) => ({
      ...prev,
      pincode: pin,
    }));

    clearTimeout(timeout);

    timeout = setTimeout(() => {
      fetchPincodeDetails(pin);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#070b14] via-[#0b1220] to-[#050814] text-white flex items-center justify-center p-6">
      <div className="w-full max-w-3xl backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold">Delivery Details</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <input
            name="receiverName"
            placeholder="Receiver Name"
            onChange={handleChange}
            className="p-3 rounded-xl bg-white/10 border border-white/10"
          />

          <input
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            className="p-3 rounded-xl bg-white/10 border border-white/10"
          />
          <input
            name="pincode"
            placeholder="Pincode"
            value={form.pincode}
            onChange={(e) => {
              const pin = e.target.value;

              setForm({ ...form, pincode: pin });

              fetchPincodeDetails(pin);
            }}
            className="p-3 rounded-xl bg-white/10 border border-white/10"
          />

          <input
            name="addressLine"
            placeholder="Address Line"
            onChange={handleChange}
            className="p-3 rounded-xl bg-white/10 border border-white/10 col-span-2"
          />

          <input
            name="district"
            placeholder="District"
            onChange={handleChange}
            className="p-3 rounded-xl bg-white/10 border border-white/10"
          />

          <input
            name="state"
            placeholder="State"
            onChange={handleChange}
            className="p-3 rounded-xl bg-white/10 border border-white/10"
          />
        </div>

        <div className="mt-6 text-white/70">
          Total: ₹{Number(totalAmount).toFixed(2)}
        </div>

        <button
          onClick={handlePayment}
          disabled={!form.receiverName || !form.addressLine}
          className="mt-6 w-full bg-cyan-500 py-3 rounded-xl font-bold"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
}

export default DeliveryAddress;
