
import { useEffect, useState } from "react";
import axios from "axios";

function Cart() {

    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {

        const user = JSON.parse(localStorage.getItem("user"));

        try {

            const response = await axios.get(
                `http://localhost:5281/api/Medicines/CartList/${user.id}`
            );

            if (response.data.statusCode === 200) {

                setCartItems(response.data.listCart);

                let totalPrice = 0;

                response.data.listCart.forEach((item) => {
                    totalPrice += item.totalPrice;
                });

                setTotal(totalPrice);
            }

        } catch (error) {
            console.log(error);
        }
    };

    const placeOrder = async () => {

        const user = JSON.parse(localStorage.getItem("user"));

        try {

            const response = await axios.post(
                "http://localhost:5281/api/Medicines/PlaceOrder",
                {
                    ID: user.id
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

        <div className="min-h-screen bg-gray-100 p-6">

            <h1 className="text-4xl font-bold text-cyan-700 mb-8">
                My Cart
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                <div className="lg:col-span-2 space-y-4">

                    {
                        cartItems.map((item) => (

                            <div
                                key={item.id}
                                className="bg-white p-4 rounded-2xl shadow flex gap-4 items-center"
                            >

                                <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    className="h-24 w-24 rounded-xl object-cover"
                                />

                                <div className="flex-1">

                                    <h2 className="text-xl font-bold">
                                        {item.name}
                                    </h2>

                                    <p className="text-gray-500">
                                        Quantity: {item.quantity}
                                    </p>

                                </div>

                                <div>

                                    <p className="text-xl font-bold text-cyan-700">
                                        ₹ {item.totalPrice}
                                    </p>

                                </div>

                            </div>
                        ))
                    }

                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 h-fit">

                    <h2 className="text-2xl font-bold mb-6">
                        Order Summary
                    </h2>

                    <div className="flex justify-between mb-4">

                        <span>Total</span>

                        <span className="font-bold">
                            ₹ {total}
                        </span>

                    </div>

                    <button
                        onClick={placeOrder}
                        className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-xl font-bold"
                    >
                        Place Order
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Cart;