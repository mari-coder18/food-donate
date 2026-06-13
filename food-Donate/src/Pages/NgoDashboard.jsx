import { useEffect, useState } from "react";
import {
  getDonations,
  updateDonationStatus
} from "../api/donationApi";
import { useLocation } from "react-router-dom";

function NgoDashboard() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const location =useLocation();
  const isAvailableOnly = location.pathname === "/ngo/available";

  // ================= FETCH =================
  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      setLoading(true);

      const res = await getDonations();

      console.log("RAW RESPONSE:", res.data);

      
      setDonations(res.data);

    } catch (err) {
      console.log("ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = isAvailableOnly
  ? donations.filter((d) => d.status === "Available")
  : donations;
  


  // ================= ACCEPT =================
  const handleAccept = async (id) => {
    try {
      await updateDonationStatus(id, "Accepted");
        alert("donation accepted sucessfully")
      fetchDonations()
      
    } catch (err) {
      console.log(err);
      alert("Accept Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">

      <h1 className="text-3xl font-bold text-orange-600 mb-6">
        NGO Dashboard
      </h1>

      {loading ? (
        <p className="text-center mt-10">Loading...</p>
      ) : filtered.length === 0 ? (
        <div className="text-center mt-20">
          <h2 className="text-2xl text-gray-500">
            No Donations Found
          </h2>
        </div>
      ) : (
        filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-lg p-5 mb-5"
          >
            <h2 className="text-2xl font-bold">
              {item.foodName}
            </h2>

            <p>Quantity: {item.quantity}</p>
            <p>Expiry: {item.expiry || "N/A"}</p>
            <p>Location: {item.location}</p>

            {/* STATUS SHOW */}
            <p className="mt-2 font-semibold">
              Status: {item.status}
            </p>

            <button
              onClick={() => handleAccept(item.id)}
              disabled={item.status !== "Available"}
              className={`mt-4 px-4 py-2 rounded text-white ${
                item.status === "Available"
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {item.status === "Available"
                ? "Accept Donation"
                : item.status}
            </button>

          </div>
        ))
      )}

    </div>
  );
}

export default NgoDashboard;