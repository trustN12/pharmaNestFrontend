import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  Pill,
  PlusCircle,
} from "lucide-react";

import { NavLink } from "react-router-dom";

function AdminSidebar() {

  const menus = [

    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin-dashboard",
    },

    {
      title: "Users",
      icon: Users,
      path: "/admin/users",
    },

    {
      title: "Orders",
      icon: ShoppingBag,
      path: "/admin/orders",
    },

    {
      title: "Add Medicine",
      icon: PlusCircle,
      path: "/admin/add-medicine",
    },

    {
      title: "Medicines",
      icon: Pill,
      path: "/admin/medicines",
    },
  ];

  return (

    <div className="w-[280px] min-h-screen bg-[#07111f] border-r border-white/10 p-6 hidden md:block">

      <h1 className="text-3xl font-black text-cyan-400 mb-10">
        PharmaNest
      </h1>

      <div className="space-y-4">

        {
          menus.map((menu, index) => (

            <NavLink
              key={index}
              to={menu.path}
              className={({ isActive }) =>
                `flex items-center gap-4 p-4 rounded-2xl transition
                ${
                  isActive
                    ? "bg-cyan-500 text-white"
                    : "bg-white/5 text-slate-300 hover:bg-white/10"
                }`
              }
            >

              <menu.icon size={22} />

              <span className="font-semibold">
                {menu.title}
              </span>

            </NavLink>
          ))
        }

      </div>

    </div>
  );
}

export default AdminSidebar;