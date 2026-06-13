import { useEffect, useState, useRef } from "react";
import axios from "axios";

function VolunteerDashboard() {
  const [pickups, setPickups] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetched = useRef(false);

  useEffect(() => {
    if (!fetched.current) {
      fetchPickups();
      fetched.current = true;
    }
  }, []);

  // ================= ACCEPT PICKUP =================
  const handleAccept = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/volunteers/accept/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Pickup Accepted");

      fetchPickups(); // refresh list
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  // ================= FETCH PICKUPS =================
  const fetchPickups = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/volunteers/pickups`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // remove duplicates
      const uniqueData = [
        ...new Map(res.data.map(item => [item.id, item])).values()
      ];

      setPickups(uniqueData);
      setLoading(false);

    } catch (err) {
      console.log(err.response?.data || err.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        🚗 Volunteer Dashboard
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-4">

          {pickups.length === 0 ? (
            <p className="text-gray-500">No pickups available</p>
          ) : (
            pickups.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded shadow"
              >
                <h2 className="font-bold">
                  🍱 {item.foodName || item.food}
                </h2>

                <p>📍 {item.location}</p>
                <p>⏰ {item.expiry || "N/A"}</p>
                <p>📦 Quantity: {item.quantity || "N/A"}</p>

                <button
                  onClick={() => handleAccept(item.id)}
                  className="bg-green-500 text-white px-3 py-1 mt-2 rounded"
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

export default VolunteerDashboard;