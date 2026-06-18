import { useEffect, useState } from "react";
import { getAllNgos } from "../api/donationApi";

function Ngos() {
  const [ngos, setNgos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNgos();
  }, []);

  const fetchNgos = async () => {
    try {
      setLoading(true);
      const res = await getAllNgos(); 
      
      // SAFE CHECK:
      const data = Array.isArray(res.data) ? res.data : res.data?.data || [];
      setNgos(data);
    } catch (err) {
      console.log("NGO Fetch Error da:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-yellow-50 min-h-screen py-10 px-5"> 
      <div className="max-w-6xl mx-auto">
        
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
          NGO Partners
        </h1>

        {loading ? (
          <p className="text-center text-xl text-gray-600">Loading NGOs...</p>
        ) : ngos.length === 0 ? (
          <p className="text-center text-xl text-gray-500">No NGOs registered yet  😢</p>
        ) : (
          /* NGO GRID */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ngos.map((ngo) => (
              <div
                key={ngo.id }
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl hover:scale-105 transition duration-300 border border-gray-100"
              >
                <h2 className="text-2xl font-bold text-gray-800 break-words">
                  {ngo.name}
                </h2>
                <p className="text-gray-500 mt-3 text-lg break-all">
                  {ngo.email}
                </p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default Ngos;