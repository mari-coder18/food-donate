import { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "../Components/common/Card";

function AdminDashboard() {
  const [donations, setDonations] = useState([]);
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    fetchDonations();
    fetchVolunteers();
  }, []);

  const fetchDonations = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/donations`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDonations(res.data);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  const fetchVolunteers = async () => {
try{
    const token = localStorage.getItem("token");

    const res = await axios.get (
         `${import.meta.env.VITE_API_URL}/api/volunteers`,
         {
            headers:{
                Authorization: `Bearer ${token}`
            }
         }
    );

    setVolunteers(res.data);
    

}catch (err)
    
{
console.log(err.response?.data || err.message);
}


  }

  const totalDonations = donations.length;
  const totalVolunteers = volunteers.length;
  const availableDonations = donations.filter(d => d.status === "Available").length;
  const acceptedDonations = donations.filter(d => d.status === "Accepted").length;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <Card title= "Total Volunteers" value={totalVolunteers}/>
        <Card title="Total Donations" value={totalDonations} />
        <Card title="Available Donations" value={availableDonations} />
        <Card title="Accepted Donations" value={acceptedDonations} />
      </div>
    </div>
  );
}

export default AdminDashboard;