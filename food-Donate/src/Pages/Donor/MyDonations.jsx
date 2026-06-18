import DonationList from "../../Components/Donation/DonationList";
import { useState, useEffect } from "react";
import {
  getDonations,
  deleteDonation,
  updateDonationStatus,
} from "../../api/donationApi";

import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

function MyDonations() {

  /* ================= LOCATION ================= */
  const location = useLocation();

  /* ================= STATES ================= */
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      setLoading(true);
      const res = await getDonations();
      setDonations(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch donations");
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    try {
      await deleteDonation(id);
      setDonations((prev) => prev.filter((item) => item.id !== id));
      toast.success("Donation Deleted");
    } catch (err) {
      console.log(err);
      toast.error("Delete Failed");
    }
  };

  /* ================= STATUS UPDATE ================= */
  const handleAccept = async (id, currentStatus) => {
    try {
      let newStatus = "";
      if (currentStatus === "Available") {
        newStatus = "Requested";
      } else if (currentStatus === "Requested") {
        newStatus = "Accepted";
      } else {
        return;
      }

      await updateDonationStatus(id, newStatus);
      setDonations((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: newStatus } : item
        )
      );
      toast.success(`Donation ${newStatus}`);
    } catch (err) {
      console.log(err);
      toast.error("Status Update Failed");
    }
  };

  /* ================= DYNAMIC TITLE & FILTER LOGIC ================= */
  const titleMap = {
    "/admin/available": "Available Donations 🟢",
    "/admin/accepted": "Accepted Donations ✅",
    "/ngo/available": "Available Food List 🍱",
    "/ngo/accepted": "Our Accepted Donations 🤝"
  };

  const currentTitle = titleMap[location.pathname] || "My Donations";

  let filteredDonations = donations;

  // Handles case-insensitive safe filtering to prevent backend string bugs
  if (location.pathname === "/admin/available" || location.pathname === "/ngo/available") {
    filteredDonations = donations.filter(
      (item) => item.status?.toLowerCase() === "available"
    );
  } else if (location.pathname === "/admin/accepted" || location.pathname === "/ngo/accepted") {
    filteredDonations = donations.filter(
      (item) => item.status?.toLowerCase() === "accepted"
    );
  }

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-orange-500">
          Loading Donations...
        </h1>
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div
      className="
      p-6
      w-full
      min-h-screen
      bg-gradient-to-r
      from-orange-50
      to-yellow-50
      "
    >
      {/* 🌟 FIXED: DYNAMIC HEADING */}
      <h1
        className="
        text-3xl
        font-bold
        pt-4
        pb-2
        text-center
        mb-10
        text-orange-600
        "
      >
        {currentTitle}
      </h1>

      {/* EMPTY */}
      {filteredDonations.length === 0 ? (
        <div className="text-center mt-20">
          <h2 className="text-2xl font-bold text-gray-500">
            No Donations Found
          </h2>
          <p className="text-gray-400 mt-3">
            Start donating food 🍱
          </p>
        </div>
      ) : (
        <DonationList
          donations={filteredDonations}
          handleDelete={handleDelete}
          handleAccept={handleAccept}
        />
      )}
    </div>
  );
}

export default MyDonations;