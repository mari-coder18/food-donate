import { useEffect, useState } from "react";
import { getVolunteers, deleteVolunteerById } from "../api/donationApi"; 
import VolunteerCard from "../Components/VolunteerCard";
import { toast } from "react-toastify";

function ListVolunteer() {
  const [search, setSearch] = useState("");
  const [volunteers, setVolunteers] = useState([]);

  // ================= FETCH VOLUNTEERS =================
  const fetchVolunteers = async () => {
    try {
      const res = await getVolunteers();
      
      const data = Array.isArray(res.data) ? res.data : res.data?.data || [];
      setVolunteers(data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load volunteers");
      setVolunteers([]);
    }
  };

  useEffect(() => {
    fetchVolunteers();
  }, []);

  // ================= DELETE VOLUNTEER =================
  const deleteVolunteer = async (id) => {
    try {
      await deleteVolunteerById(id); // 
      toast.success("Deleted successfully ");
      fetchVolunteers(); 
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  // ================= SEARCH FILTER (SAFE) =================
  const filtered = volunteers.filter((v) =>
    `${v.name || ""} ${v.location || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="bg-green-100 min-h-screen p-5">
      <h1 className="text-center text-3xl font-bold mb-6 text-gray-800">
        List Volunteers
      </h1>

      {/* SEARCH BOX */}
      <input
        type="text"
        placeholder="Search volunteers by name or location..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-6 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      {/* LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.length > 0 ? (
          filtered.map((v) => (
            <VolunteerCard
              key={v.id || v._id} 
              volunteer={v}
              deleteVolunteer={deleteVolunteer}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-xl text-gray-600 mt-10">
            No volunteers found 😢
          </div>
        )}
      </div>
    </div>
  );
}

export default ListVolunteer;