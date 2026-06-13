import { useState } from "react";
import { toast } from "react-toastify";
import api from "../api/axios"; // IMPORTANT

function AddVolunteer() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    location: "",
    status: "Available",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // VALIDATION
    if (!form.name.trim()) return toast.error("Name is required");
    if (!/^\d{10}$/.test(form.phone)) return toast.error("Phone must be 10 digits");
    if (!form.location.trim()) return toast.error("Location is required");

    try {
      const res = await api.post("/volunteers", form);

      toast.success("Volunteer added successfully");

      setForm({
        name: "",
        phone: "",
        location: "",
        status: "Available",
      });

      console.log(res.data);

    } catch (err) {
      console.log(err);
      toast.error("Failed to add volunteer");
    }
  };

  return (
    <div className="bg-orange-100 min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-[90%] sm:max-w-[400px] p-6 rounded-xl shadow space-y-4 mx-4"
      >
        <h1 className="text-2xl font-bold text-center">
          Add Volunteer
        </h1>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter Name"
          className="w-full border p-3 rounded"
        />

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Enter Phone"
          maxLength={10}
          className="w-full border p-3 rounded"
        />

        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Enter Location"
          className="w-full border p-3 rounded"
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        >
          <option value="Available">Available</option>
          <option value="Inactive">Inactive</option>
          <option value="Assigned">Assigned</option>
        </select>

        <button
          type="submit"
          className="bg-green-500 text-white w-full p-3 rounded"
        >
          Add Volunteer
        </button>
      </form>
    </div>
  );
}

export default AddVolunteer;