
function DashboardCards() {

    return (

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-white p-6 rounded-2xl shadow-lg">

                <h2 className="text-gray-500">
                    Total Medicines
                </h2>

                <p className="text-4xl font-bold text-cyan-700 mt-3">
                    120
                </p>

            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">

                <h2 className="text-gray-500">
                    Total Orders
                </h2>

                <p className="text-4xl font-bold text-cyan-700 mt-3">
                    85
                </p>

            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">

                <h2 className="text-gray-500">
                    Total Users
                </h2>

                <p className="text-4xl font-bold text-cyan-700 mt-3">
                    240
                </p>

            </div>

        </div>
    );
}

export default DashboardCards;