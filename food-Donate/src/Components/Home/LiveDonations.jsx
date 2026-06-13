import { useEffect, useState } from "react";
import axios from "axios";
import { getFoodImage } from "../../utils/getFoodImage";

function LiveDonations() {
  const [liveData, setLiveData] = useState([]);

  useEffect(() => {
    // Fetch live data from backend
    axios.get(`${import.meta.env.VITE_API_URL}/api/donations/public`)
      .then((res) => {
        // Filter out "Available" status and take first 3
        const available = res.data.filter(d => d.status === "Available").slice(0, 3);
        setLiveData(available);
      })
      .catch((err) => console.log(err));
  }, []);

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
          
          {liveData.length === 0 ? (
            <p className="text-center text-gray-500 col-span-3">No live donations right now.</p>
          ) : (
            liveData.map((item) => (
              <div key={item.id} className="bg-white rounded-3xl shadow-lg overflow-hidden transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
                
                <img src={getFoodImage(item.foodName)} alt="Food Donation" className="h-56 w-full object-cover" />
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">{item.foodName}</h3>
                  <p className="text-gray-600 mb-2">📍 {item.location}</p>
                  <p className="text-orange-500 font-semibold mb-4">⏳ {item.quantity} Qty</p>
                  <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl transition duration-300">View Details</button>
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