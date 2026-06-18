import { useState, useEffect } from "react";
import { getDonations, getVolunteers } from "../api/donationApi"; 
import { Card } from "../Components/common/Card";

function AdminDashboard() {
  const [donations, setDonations] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  
  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const donationsRes = await getDonations();
      
      const donationsData = Array.isArray(donationsRes.data) ? donationsRes.data : donationsRes.data?.data || [];
      setDonations(donationsData);

      const volunteersRes = await getVolunteers();
      const volunteersData = Array.isArray(volunteersRes.data) ? volunteersRes.data : volunteersRes.data?.data || [];
      setVolunteers(volunteersData);

    } catch (err) {
      console.log("Admin Dashboard Fetch Error da:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const totalDonations = donations.length;
  const totalVolunteers = volunteers.length;
  const availableDonations = donations.filter(d => d.status?.toLowerCase() === "available").length;
  const acceptedDonations = donations.filter(d => d.status?.toLowerCase() === "accepted").length;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>

      {loading ? (
        <p className="text-center text-xl text-gray-600 mt-10">Loading Dashboard Data...</p>
      ) : (
        /* CARDS GRID */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <Card title="Total Volunteers" value={totalVolunteers}/>
          <Card title="Total Donations" value={totalDonations} />
          <Card title="Available Donations" value={availableDonations} />
          <Card title="Accepted Donations" value={acceptedDonations} />
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;