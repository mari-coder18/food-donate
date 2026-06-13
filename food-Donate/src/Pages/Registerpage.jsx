import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";


function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "donor"
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";

    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    // stop if errors exist
    if (Object.keys(validationErrors).length > 0) return;

    try {
      const res = await api.post(
        "/auth/register",
        {
          name: form.name,
          email: form.email,
          password: form.password,
          role: form.role
        }
      );

      alert(res.data.message);
      navigate("/login");

    } catch (err) {
      setErrors({
        apiError: err.response?.data?.message || "Registration Failed"
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 space-y-3 rounded-xl shadow-md w-11/12 max-w-[400px] mx-4"
      >
        <h2 className="text-2xl text-center mb-4">Register</h2>

        {/* NAME */}
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name}</p>
        )}

        {/* EMAIL */}
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email}</p>
        )}

        {/* PASSWORD */}
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}

        {/* CONFIRM PASSWORD */}
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
        )}

        {/* ROLE */}
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="donor">donor</option>
          <option value="ngo">NGO</option>
          <option value="volunteer">Volunteer</option>
        </select>

        {/* API ERROR */}
        {errors.apiError && (
          <p className="text-red-600 text-sm">{errors.apiError}</p>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white w-full p-2 rounded hover:bg-blue-600"
        >
          Register
        </button>

        <p className="text-sm text-center mt-2">
          Already user?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </form>

    </div>
  );
}

export default RegisterPage;