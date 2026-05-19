import AdminSidebar from "../../components/AdminSidebar";

function Orders() {

  return (

    <div className="flex bg-[#020617] min-h-screen text-white">

      <AdminSidebar />

      <div className="flex-1 p-8">

        <h1 className="text-5xl font-black mb-10">
          Orders
        </h1>

      </div>

    </div>
  );
}

export default Orders;