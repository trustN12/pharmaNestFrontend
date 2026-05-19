
import { useEffect, useState } from "react";
import axios from "axios";

function MedicineList() {

    const [medicines, setMedicines] = useState([]);

    useEffect(() => {
        fetchMedicines();
    }, []);

    const fetchMedicines = async () => {

        try {

            const response = await axios.get(
                "http://localhost:5281/api/Medicines/MedicineList"
            );

            if (response.data.statusCode === 200) {
                setMedicines(response.data.listMedicines);
            }

        } catch (error) {
            console.log(error);
        }
    };

    const addToCart = async (item) => {

        const user = JSON.parse(localStorage.getItem("user"));

        try {

            const response = await axios.post(
                "http://localhost:5281/api/Medicines/AddToCart",
                {
                    UserId: user.id,
                    MedicineID: item.id,
                    UnitPrice: item.unitPrice,
                    Discount: item.discount,
                    Quantity: 1,
                    TotalPrice: item.unitPrice - item.discount
                }
            );

            if (response.data.statusCode === 200) {
                alert("Medicine Added To Cart");
            }

        } catch (error) {
            console.log(error);
        }
    };

    return (

        <div className="min-h-screen bg-gray-100 p-6">

            <div className="flex justify-between items-center mb-8">

                <h1 className="text-4xl font-bold text-cyan-700">
                    PharmaNest Medicines
                </h1>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">

                {
                    medicines.map((item) => (

                        <div
                            key={item.id}
                            className="bg-white rounded-2xl shadow-lg p-4 hover:scale-105 transition duration-300"
                        >

                            <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="h-48 w-full object-cover rounded-xl"
                            />

                            <h2 className="text-xl font-bold mt-4">
                                {item.name}
                            </h2>

                            <p className="text-gray-500">
                                {item.manufacturer}
                            </p>

                            <div className="flex justify-between items-center mt-3">

                                <div>

                                    <p className="text-lg font-bold text-cyan-700">
                                        ₹ {item.unitPrice}
                                    </p>

                                    <p className="text-sm text-red-500">
                                        Discount ₹ {item.discount}
                                    </p>

                                </div>

                            </div>

                            <button
                                onClick={() => addToCart(item)}
                                className="w-full mt-4 bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-xl font-semibold"
                            >
                                Add To Cart
                            </button>

                        </div>
                    ))
                }

            </div>

        </div>
    );
}

export default MedicineList;