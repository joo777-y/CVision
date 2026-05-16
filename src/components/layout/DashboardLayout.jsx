import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { MenuIcon } from "../ui/Icons";

export default function DashboardLayout({ onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));

        setUser(payload);
      } catch (err) {
        console.error("Invalid token");
      }
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-[#edf2f7] font-sans">

      {/* Top bar */}
      <div className="fixed top-0 left-0 w-full h-7 bg-[#2d3748] flex items-center px-4 py-6 z-30 rounded-r-sm">
        <button
          className="md:hidden text-slate-300 hover:text-white mr-3 cursor-pointer"
          onClick={() => setSidebarOpen(true)}
        >
          <MenuIcon />
        </button>

        <span className="text-slate-400 text-xs">
          {user?.companyName || user?.firstName || "Dashboard"}
        </span>
      </div>

      <div className="flex w-full mt-12">
        <Sidebar
          onLogout={onLogout}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          user={user}
        />

        <main className="flex-1 p-4 sm:p-8 overflow-y-auto min-w-0 ">
          <Outlet />
        </main>
      </div>
    </div>
  );
}