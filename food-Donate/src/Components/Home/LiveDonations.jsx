import { useEffect, useState } from "react";
import { getPublicLiveDonations } from "../../api/donationApi";
import { getFoodImage } from "../../utils/getFoodImage";

function LiveDonations() {
  const [liveData, setLiveData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPublicData();
  }, []);

  const fetchPublicData = async () => {
    try {
      setLoading(true);
      const res = await getPublicLiveDonations();

      //  SAFE CHECK: 
      const rawData = Array.isArray(res.data) ? res.data : res.data?.data || [];

      console.log("Live donations item from backend :",rawData);
      
      const available = rawData.filter(d => d.status === "Available").slice(0, 3);
      setLiveData(available);
    } catch (err) {
      console.log("Public Donations Fetch Error da:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800">
            Live Donations
          </h2>
          <p className="text-gray-500 mt-4 text-lg">
            Recently shared food donations near communities
          </p>
        </div>

        {/* Donation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          
          {loading ? (
            <p className="text-center text-gray-500 col-span-full text-xl animate-pulse">
              Loading live donations...
            </p>
          ) : liveData.length === 0 ? (
            <p className="text-center text-gray-500 col-span-full text-xl">
              No live donations right now  😢
            </p>
          ) : (
            liveData.map((item) => (
              <div 
                key={item.id || item._id} 
                className="bg-white rounded-3xl shadow-lg overflow-hidden transition duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between border border-gray-100"
              >
                <div>
                  <img 
                    src={getFoodImage(item.foodName)} 
                    alt={item.foodName || "Food Donation" }                   className="h-56 w-full object-cover select-none" 
                  />
                  
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-3 break-words">
                      {item.foodName}
                    </h3>
                    <p className="text-gray-600 mb-2 truncate">📍 {item.location || item.address || "Not provided"}</p>
                    <p className="text-orange-500 font-semibold mb-4">⏳ {item.quantity} Qty</p>
                    <p className="text-yellow-400 font-[Popins] mb-4">{item.status || "Not avialble foods"}</p>
                  </div>
                  
                    
                  
                </div>

                <div className="px-6 pb-6">
                  <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl transition duration-300 font-medium shadow-md shadow-green-100 cursor-pointer">
                    View Details
                  </button>
                </div>
                
              </div>
            ))
          )}

        </div>
      </div>
    </section>
  );
}

export default LiveDonations;