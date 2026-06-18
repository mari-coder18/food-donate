import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getDonations, updateDonationStatus } from "../api/donationApi";

function NgoDashboard() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const isAvailableOnly = location.pathname === "/ngo/available";

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      setLoading(true);
      const res = await getDonations();
    
      const data = Array.isArray(res.data) ? res.data : res.data?.data || [];
      setDonations(data);
    } catch (err) {
      console.log("NGO Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = isAvailableOnly
    ? donations.filter((d) => d.status === "Available")
    : donations;

  const handleAccept = async (id) => {
    try {
      await updateDonationStatus(id, "Accepted");
      alert("Donation accepted successfully! ");
      fetchDonations();
    } catch (err) {
      console.log(err);
      alert("Accept Failed da!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">NGO Dashboard</h1>

      {loading ? (
        <p className="text-center mt-10">Loading...</p>
      ) : filtered.length === 0 ? (
        <div className="text-center mt-20">
          <h2 className="text-2xl text-gray-500">No Donations Found</h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item) => (
            <div key={item.id} className="bg-white shadow-md rounded-lg p-5 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">{item.foodName}</h2>
                <p className="text-gray-600">📦 Quantity: {item.quantity}</p>
                <p className="text-gray-600">⏰ Expiry: {item.expiry || "N/A"}</p>
                <p className="text-gray-600">📍 Location: {item.location}</p>
                <p className="mt-2 font-semibold">Status: <span className="text-blue-600">{item.status}</span></p>
              </div>

              <button
                onClick={() => handleAccept(item.id)}
                disabled={item.status !== "Available"}
                className={`mt-4 px-4 py-2 rounded text-white font-medium w-full transition ${
                  item.status === "Available"
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                {item.status === "Available" ? "Accept Donation" : item.status}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NgoDashboard;