import { useState, useEffect } from "react";
import axios from "axios";

function Analytics() {
  const token = localStorage.getItem("token");

  const [donations, setDonations] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/donations`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      setDonations(res.data);
    })
    .catch(err => {
      console.log(err.response?.data || err.message);
    });
  }, []);

  const total = donations.length;

  const available = donations.filter(
    (d) => d.status === "Available"
  ).length;

  const accepted = donations.filter(
    (d) => d.status === "Accepted"
  ).length;

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Analytics Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-5">

        <div className="bg-white p-5 rounded-xl shadow">
          <h2>Total Donations</h2>
          <p className="text-3xl font-bold">{total}</p>
        </div>

        <div className="bg-blue-100 p-5 rounded-xl shadow">
          <h2>Available</h2>
          <p className="text-3xl font-bold">{available}</p>
        </div>

        <div className="bg-green-100 p-5 rounded-xl shadow">
          <h2>Accepted</h2>
          <p className="text-3xl font-bold">{accepted}</p>
        </div>

      </div>

    </div>
  );
}

export default Analytics;