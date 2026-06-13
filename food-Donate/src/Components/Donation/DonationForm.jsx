import { useState, useEffect } from "react";
import {
  createDonation,
  getDonationById,
  updateDonation,
} from "../../api/donationApi";

import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function DonationForm() {

  const { id } = useParams();
  const navigate = useNavigate();

  /* ================= FORM STATE ================= */

  const [form, setForm] = useState({
    foodName: "",
    quantity: "",
    expiry: "",
    location: "",
  });

  const [loading, setLoading] = useState(false);

  /* ================= FETCH DONATION FOR EDIT ================= */

  useEffect(() => {

    if (id) {
      fetchDonation();
    }

  }, [id]);

  const fetchDonation = async () => {

    try {

      const res = await getDonationById(id);

      setForm({
        foodName: res.data.foodName || "",
        quantity: res.data.quantity || "",
        expiry: res.data.expiry
          ? res.data.expiry.split("T")[0]
          : "",
        location: res.data.location || "",
      });

    } catch (err) {

      console.log(err);

      toast.error("Failed to load donation");

    }

  };

  /* ================= HANDLE INPUT CHANGE ================= */

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  /* ================= HANDLE SUBMIT ================= */

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    // VALIDATION
    if (
      !form.foodName ||
      !form.quantity ||
      !form.expiry ||
      !form.location
    ) {

      toast.warning("Please fill all fields");

      setLoading(false);

      return;

    }

    try {

      /* ================= UPDATE ================= */

      if (id) {

        await updateDonation(id, form);

        toast.success("Donation Updated Successfully");

      }

      /* ================= CREATE ================= */

      else {

        await createDonation(form);

        toast.success("Donation Added Successfully");

      }

      // RESET FORM
      setForm({
        foodName: "",
        quantity: "",
        expiry: "",
        location: "",
      });

      // REDIRECT
      navigate("/dashboard/my-donations");

    } catch (err) {

      console.log(err);

      toast.error("Something went wrong");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-100 to-yellow-100 p-4">

      <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-8 border border-orange-200">

        <h1 className="text-2xl font-bold text-center text-orange-600 mb-6">

          {id ? "Update Donation" : "Donate Food"}

        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* FOOD NAME */}

          <input
            name="foodName"
            value={form.foodName}
            onChange={handleChange}
            placeholder="Food Name"
            className="w-full p-3 border rounded-lg"
          />

          {/* QUANTITY */}

          <input
            name="quantity"
            type="number"
            value={form.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            className="w-full p-3 border rounded-lg"
          />

          {/* EXPIRY */}

          <input
            name="expiry"
            type="date"
            value={form.expiry}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          {/* LOCATION */}

          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full p-3 border rounded-lg"
          />

          {/* SUBMIT BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-orange-500
              hover:bg-orange-600
              text-white
              py-3
              rounded-lg
              font-semibold
              disabled:opacity-50
            "
          >

            {loading
              ? "Processing..."
              : id
              ? "Update Donation"
              : "Donate"}

          </button>

        </form>

      </div>

    </div>

  );

}

export default DonationForm;