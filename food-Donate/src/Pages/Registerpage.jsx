import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "", 
    password: "",
    confirmPassword: "",
    role: "donor"
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const numbersOnly = value.replace(/\D/g, "");
      const truncatedValue = numbersOnly.slice(0, 10);

      setForm({
        ...form,
        [name]: truncatedValue
      });
      return;
    }

    setForm({
      ...form,
      [name]: value
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    } else if (form.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters long";
    }

    const emailRegx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegx.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    const phoneRegx = /^[6-9]\d{9}$/;
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegx.test(form.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      const res = await api.post(
        "/auth/register",
        {
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone,
          password: form.password,
          role: form.role // lowercase clean strings pass
        }
      );

      alert(res.data?.message || "Registration Successful ");
      navigate("/login");

    } catch (err) {
    
      const errorMsg = typeof err.response?.data?.message === "string" 
        ? err.response.data.message 
        : "Registration Failed. Try again da!";
      
      setErrors({ apiError: errorMsg });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 p-4 box-border">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 md:p-8 space-y-4 rounded-xl shadow-md w-full max-w-[400px] box-border"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Register</h2>

        {/* NAME */}
        <div>
          <input
            name="name"
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:outline-blue-500 box-border"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>
          )}
        </div>

        {/* EMAIL */}
        <div>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:outline-blue-500 box-border"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>
          )}
        </div>

        {/* PHONE */}
        <div>
          <input
            name="phone"
            type="text"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:outline-blue-500 box-border"
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1 font-medium">{errors.phone}</p>
          )}
        </div>

        {/* PASSWORD */}
        <div>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:outline-blue-500 box-border"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1 font-medium">{errors.password}</p>
          )}
        </div>

        {/* CONFIRM PASSWORD */}
        <div>
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:outline-blue-500 box-border"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1 font-medium">{errors.confirmPassword}</p>
          )}
        </div>

        {/* ROLE */}
        <div>
          
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:outline-blue-500 box-border bg-white"
          >
            <option value="donor">Donor</option>
            <option value="ngo">NGO</option>
            <option value="volunteer">Volunteer</option>
          </select>
        </div>

        {/* API ERROR */}
        {errors.apiError && (
          <p className="text-red-600 text-sm text-center font-semibold bg-red-50 p-2 rounded border border-red-100">
            {errors.apiError}
          </p>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white w-full p-2.5 rounded font-semibold hover:bg-blue-600 transition"
        >
          Register
        </button>

        <p className="text-sm text-center text-gray-600 mt-2">
          Already user?{" "}
          <Link to="/login" className="text-blue-500 hover:underline font-medium">
            Login
          </Link>
        </p>
      </form>

    </div>
  );
}

export default RegisterPage;