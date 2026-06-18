import { useEffect, useState } from "react";
import { getDonations } from "../api/donationApi";

function NgoAccepted() {
  const [acceptedDonations, setAcceptedDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAcceptedDonations();
  }, []);

  const fetchAcceptedDonations = async () => {
    try {
      setLoading(true);
      const res = await getDonations();

      
      const rawData = Array.isArray(res.data) ? res.data : res.data?.data || [];
      
      const accepted = rawData.filter((item) => item.status === "Accepted");
      setAcceptedDonations(accepted);
    } catch (error) {
      console.log("NGO Accepted Fetch Error da:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-3xl font-bold text-green-600 mb-6">
        Accepted Donations
      </h1>

      {loading ? (
        <p className="text-center mt-10 text-xl text-gray-600">Loading Accepted Donations...</p>
      ) : acceptedDonations.length === 0 ? (
        <div className="text-center mt-20">
          <h2 className="text-2xl text-gray-500">No Accepted Donations Found da 😢</h2>
        </div>
      ) : (
      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {acceptedDonations.map((item) => (
            <div
              key={item.id || item._id} 
              className="bg-white shadow-md rounded-lg p-5 flex flex-col justify-between border border-gray-100"
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {item.foodName}
                </h2>
                <p className="text-gray-600">📦 Quantity: {item.quantity}</p>
                <p className="text-gray-600">⏰ Expiry: {item.expiry || "N/A"}</p>
                <p className="text-gray-600">📍 Location: {item.location}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                <span className="font-semibold text-gray-500">Status:</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium text-sm">
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NgoAccepted;