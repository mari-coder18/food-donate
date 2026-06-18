import { useState, useEffect } from "react";
import { Sidebar } from "../common/Sidebar";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

function DashboardLayout({ children }) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.log("Error parsing user data da:", err);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-50 overflow-x-hidden w-full relative">

      {/* 📱 MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 🧭 SIDEBAR WRAPPER - 🌟 FIXED POSITION LATCH FOR DESKTOP */}
      <div className={`
        fixed left-0 top-0 h-full z-30 transition-transform duration-300 w-56
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:fixed
      `}>
        <Sidebar role={user?.role} onClose={() => setSidebarOpen(false)} />
      </div>

      {/* 📄 MAIN CONTENT AREA - 🌟 ADDED 'md:pl-56' TO ACCOMMODATE FIXED SIDEBAR */}
      <div className="flex-1 flex flex-col min-w-0 md:pl-56 w-full box-border">

        {/* 🔝 HEADER */}
        <div className="bg-white px-4 md:px-8 py-4 shadow-sm flex justify-between items-center sticky top-0 z-10 w-full box-border">

          <div className="flex items-center gap-3">
            {/* Hamburger Icon - Mobile only */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden text-gray-700 text-2xl focus:outline-none"
            >
              {sidebarOpen ? <FaTimes /> : <FaBars />}
            </button>

            <div>
              <h1 className="text-lg md:text-2xl font-bold text-gray-800">
                Food Donation
              </h1>
              <p className="text-xs md:text-sm text-gray-500 hidden sm:block">
                Welcome back 👋
              </p>
            </div>
          </div>

          {/* User Profile & Logout */}
          <div className="flex items-center gap-3 md:gap-4">
            {user?.role && (
              <div className="bg-orange-100 text-orange-600 px-3 py-1 rounded-lg font-medium capitalize text-sm hidden sm:block">
                {user.role}
              </div>
            )}

            <div className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm select-none">
              {user?.name?.charAt(0)?.toUpperCase() || "U"} 
            </div>

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 md:px-4 md:py-2 rounded-lg text-sm transition font-medium"
            >
              Logout
            </button>
          </div>

        </div>

        {/* 📃 CHILDREN (Page Content) - 🌟 ADDED 'max-w-full' AND REMOVED POTENTIAL FLEX CRASHES */}
        <div className="p-4 md:p-6 overflow-y-auto flex-1 w-full max-w-full box-border">
          {children}
        </div>

      </div>
    </div>
  );
}

export default DashboardLayout;