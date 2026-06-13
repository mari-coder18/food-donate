import { useEffect, useState } from "react";
import api from "../api/axios";
import VolunteerCard from "../Components/VolunteerCard";
import { toast } from "react-toastify";



function ListVolunteer() {
  const [search, setSearch] = useState("");
  const [volunteers, setVolunteers] = useState([]);

  // ================= FETCH VOLUNTEERS =================
  const fetchVolunteers = async () => {

    try {
      const res = await api.get("/volunteers");

      setVolunteers(res.data || []);
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
      await api.delete(`/volunteers/${id}`);

      toast.success("Deleted successfully");

      fetchVolunteers(); // refresh list
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
    <div className="bg-green-200 min-h-screen p-5">

      <h1 className="text-center text-3xl font-bold mb-5">
        List Volunteers
      </h1>

      {/* SEARCH BOX */}
      <input
        type="text"
        placeholder="Search volunteers..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 border rounded-lg mb-5"
      />

      {/* LIST */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {filtered.length > 0 ? (
          filtered.map((v) => (
            <VolunteerCard
              key={v.id}
              volunteer={v}
              deleteVolunteer={deleteVolunteer}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-xl">
            No volunteers found 😢
          </div>
        )}

      </div>
    </div>
  );
}

export default ListVolunteer;