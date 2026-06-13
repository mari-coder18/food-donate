import { Card } from "../Components/common/Card";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function DonorDashboard() {

    const [donations, setDonations] = useState([]);

    useEffect(() => {
        fetchDonations();
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

    const totalDonations = donations.length;

    const availableDonations = donations.filter(
        (item) => item.status === "Available"
    ).length;

    const acceptedDonations = donations.filter(
        (item) => item.status === "Accepted"
    ).length;

    return (
        <div>

            {/* Heading */}
            <h1 className="text-3xl font-bold mb-8">
                donor Dashboard
            </h1>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                <Card title="Total Donations" value={totalDonations} />

                <Card title="Available Donations" value={availableDonations} />

                <Card title="Accepted Donations" value={acceptedDonations} />

            </div>

            {/* Quick Actions */}
            <div className="flex gap-4 mt-8">

                <Link
                    to="/dashboard/add-donation"
                    className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-3 rounded"
                >
                    Add Donation
                </Link>

                <Link
                    to="/dashboard/my-donations"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded"
                >
                    View Donations
                </Link>

            </div>

        </div>
    );
}

export default DonorDashboard;