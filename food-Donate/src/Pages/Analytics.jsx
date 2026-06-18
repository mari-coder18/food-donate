import { useState, useEffect } from "react";

import { getDonations } from "../api/donationApi"; 

function Analytics() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      const res = await getDonations(); 
      
      
      const data = Array.isArray(res.data) ? res.data : res.data?.data || [];
      setDonations(data);
    } catch (err) {
      console.log("Analytics Fetch Error da:", err.response?.data || err.message);
    }
  };

  const total = donations.length;
  const available = donations.filter((d) => d.status === "Available").length;
  const accepted = donations.filter((d) => d.status === "Accepted").length;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 font-[Poppins]">Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 ">
        
        <div className="bg-white p-5 rounded-xl  border border-gray-100 shadow  hover:shadow-lg ">
          <h2 className="text-gray-500 font-medium">Total Donations</h2>
          <p className="text-3xl font-bold text-gray-800 mt-2">{total}</p>
        </div>

        <div className="bg-blue-100 p-5 rounded-xl shadow hover:shadow-lg   ">
          <h2 className="text-blue-700 font-medium">Available</h2>
          <p className="text-3xl font-bold text-blue-800 mt-2">{available}</p>
        </div>

        <div className="bg-green-100 p-5 rounded-xl shadow hover:shadow-lg ">
          <h2 className="text-green-700 font-medium">Accepted</h2>
          <p className="text-3xl font-bold text-green-800 mt-2">{accepted}</p>
        </div>

      </div>
    </div>
  );
}

export default Analytics;