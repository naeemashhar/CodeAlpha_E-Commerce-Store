import { RiUser3Line } from "@remixicon/react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ROLE from "../common/role";

const Admin = () => {
  const user = useSelector((state) => state?.user?.user);

  const navigate = useNavigate();

  useEffect(() => {}, [user]);
  if (user?.role !== ROLE.ADMIN) {
    navigate("/");
  }
  return (
    <div
      className="min-h-[calc(100vh-120px)] hidden md:flex"
      data-theme="night"
    >
      {/* Sidebar */}
      <aside className="bg-base-200 text-base-content min-h-full w-full max-w-64 px-4 py-6 shadow-md rounded-tr-2xl rounded-br-2xl">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-8 gap-2">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-accent shadow-md flex items-center justify-center bg-base-100">
            {user?.profileImage ? (
              <img
                src={user.profileImage}
                alt={user?.name}
                className="object-cover w-full h-full"
              />
            ) : (
              <RiUser3Line className="w-8 h-8 text-accent" />
            )}
          </div>
          <div className="text-center">
            <p className="capitalize text-lg font-semibold">
              {user?.name || "Admin"}
            </p>
            <p className="text-xs text-base-content/60">
              {user?.role || "admin"}
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-2 text-sm">
          <Link
            to="all-users"
            className="block py-2 px-3 rounded-lg hover:bg-base-300 hover:text-accent transition"
          >
            👤 All Users
          </Link>
          <Link
            to="all-products"
            className="block py-2 px-3 rounded-lg hover:bg-base-300 hover:text-accent transition"
          >
            📦 All Products
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 bg-base-100 rounded-xl shadow-inner overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Admin;
