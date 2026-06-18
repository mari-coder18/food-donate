import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios"; 
import { getPickups } from "../api/donationApi"; 

function VolunteerDashboard() {
  const [stats, setStats] = useState({ totalAvailable: 0, acceptedByMe: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true);
        const res = await getPickups();
        console.log("Dashboard Stats Fetch Response:", res.data);
        
        const data = Array.isArray(res.data) ? res.data : res.data?.data || [];

        setStats({
          totalAvailable: data.length,
          acceptedByMe: 0
        });

      } catch (err) {
        console.log("Stats Fetch Error:", err.message);
      } 
      finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []); 

  return (
    // 💡 FIXED ROOT CONTAINER: Thookiyachu redundant background & duplicate height limits!
    <div className="w-full box-border max-w-full">
      
      {/* WELCOME BANNER */}
      <div className="bg-white p-5 md:p-6 rounded-xl shadow-sm border border-gray-100 mb-6 w-full box-border">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Volunteer Dashboard 👋</h1>
        <p className="text-sm md:text-base text-gray-600">
          Track and manage food pickup requests efficiently to support local communities.
        </p>
      </div>

      {/* STATS COUNT  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8 w-full box-border">
        
        {/* Card 1: Open/Available Pickups */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 md:p-6 rounded-xl border border-green-200 shadow-sm w-full box-border">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs md:text-sm font-semibold text-green-700 uppercase tracking-wider">
                Available Pickups
              </p>
              <h3 className="text-3xl md:text-4xl font-black text-green-900 mt-1">
                {loading ? "..." : stats.totalAvailable}
              </h3>
            </div>
            <span className="text-2xl md:text-3xl">🍱</span>
          </div>
          <p className="text-xs text-green-600 mt-4 font-medium">Donations ready to be collected right now.</p>
        </div>

        {/* Card 2: Accepted Pickups */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 md:p-6 rounded-xl border border-blue-200 shadow-sm w-full box-border">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs md:text-sm font-semibold text-blue-700 uppercase tracking-wider">
                My Active Tasks
              </p>
              <h3 className="text-3xl md:text-4xl font-black text-blue-900 mt-1">
                {loading ? "..." : stats.acceptedByMe}
              </h3>
            </div>
            <span className="text-2xl md:text-3xl">🚗</span>
          </div>
          <p className="text-xs text-blue-600 mt-4 font-medium">Pickups currently assigned to your route.</p>
        </div>

      </div>

      {/* QUICK ACTIONS */}
      <div className="bg-white p-5 md:p-6 rounded-xl shadow-sm border border-gray-100 w-full box-border">
        <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4">Quick Navigation</h2>
        <div className="flex flex-wrap gap-4 w-full">
          <Link
            to="/volunteer/pickups"
            className="w-full sm:w-auto text-center bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-3 rounded-lg transition shadow-sm text-sm md:text-base"
          >
            Go to Pickups List 🔍
          </Link>
        </div>
      </div>

    </div>
  );
}

export default VolunteerDashboard;