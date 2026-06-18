
import { useEffect, useState } from "react";
import api from "../api/axios"; 
import { getPickups } from "../api/donationApi"; 

function AvailablePickupList() {
  const [pickups, setPickups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPickups();
  }, []);

  // ================= FETCH PICKUPS  =================
  const fetchPickups = async () => {
    try {
      setLoading(true);
      const res = await getPickups();
      console.log("Pickups Fetch Response:", res.data);
      console.log("Pickups Fetch Response Type:", typeof res.data);
      
    
      const data = Array.isArray(res.data) ? res.data : res.data?.data || [];
      setPickups(data);
    } catch (err) {
      console.log("Pickup Fetch Error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  // ================= ACCEPT PICKUP  =================
  const handleAccept = async (id) => {
    try {
      // Backend PUT request to accept specific pickup ID
      await api.put(`/volunteers/accept/${id}`, {});
      alert("Pickup Accepted successfully! 🚗");
      
      // Auto-refresh the list after successful acceptance
      fetchPickups(); 
    } catch (err) {
      console.log("Accept Error:", err.response?.data || err.message);
      alert("Accept Failed da!");
    }
  };

  return (
    <div className="p-5 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">🚗 Available Pickups for You</h1>

      {loading ? (
        <p className="text-center mt-10 text-gray-600 font-medium animate-pulse">
          Loading Pickups...
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pickups.length === 0 ? (
            <p className="text-gray-500 col-span-full text-center text-lg mt-10">
              No pickups available right now ...  
            </p>
          ) : (
            pickups.map((item) => (
              <div 
                key={item.id || item._id} 
                className="bg-white p-5 rounded-lg shadow-md border border-gray-100 flex flex-col justify-between hover:shadow-lg transition-shadow duration-200"
              >
                <div>
                  <h2 className="font-bold text-xl text-gray-800 mb-2">
                    🍱 {item.foodName || item.food || "Unknown Food"}
                  </h2>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>📍 <span className="font-medium text-gray-700">Location:</span> {item.location}</p>
                    <p>⏰ <span className="font-medium text-gray-700">Expiry:</span> {item.expiry || "N/A"}</p>
                    <p>📦 <span className="font-medium text-gray-700">Quantity:</span> {item.quantity || "N/A"}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleAccept(item.id || item._id)}
                  className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 mt-5 rounded w-full shadow-sm hover:shadow active:scale-[0.98] transition-all duration-150"
                >
                  Accept Pickup
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default AvailablePickupList;