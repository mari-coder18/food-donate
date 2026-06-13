import api from "../api/axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setAuth } from "../auth/auth";   // 🔥 IMPORTANT ADD

function Loginpage() {
  const navigate = useNavigate();

  const [formdata, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    if (!formdata.email.trim()) {
      newErrors.email = "Enter your email";
    }

    if (formdata.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setErrors({});

    const validationError = validate();

    if (Object.keys(validationError).length > 0) {
      setErrors(validationError);
      return;
    }

    try {
      const res = await api.post("/auth/login", formdata);

      const user = res.data.user;

      if (!user) {
        alert("Login Failed");
        return;
      }

      let role = user.role?.trim().toLowerCase();

      // typo fix
      if (role === "doner") {
        role = "donor";
      }

      // 🔥 IMPORTANT FIX (ALL AUTH HANDLED HERE)
      setAuth(res.data.token, user, role);

      // ROLE BASED NAVIGATION
      if (role === "admin") {
        navigate("/admin");
      } else if (role === "ngo") {
        navigate("/ngo");
      } else if (role === "volunteer") {
        navigate("/volunteer");
      } else if (role === "donor") {
        navigate("/dashboard");
      } else {
        alert("Invalid Role");
        localStorage.clear();
        navigate("/login");
      }

    } catch (err) {
      console.log("LOGIN ERROR:", err.response?.data || err.message);

      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-300">
      <div className="bg-white/40 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-11/12 max-w-md">

        <h1 className="text-3xl text-center font-bold mb-6">
          Welcome Back
        </h1>

        <form onSubmit={handleLogin}>

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            value={formdata.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full p-3 rounded mb-2 outline-none"
          />

          {errors.email && (
            <p className="text-red-500 text-sm mb-2">
              {errors.email}
            </p>
          )}

          {/* PASSWORD */}
          <input
            type="password"
            name="password"
            value={formdata.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full p-3 rounded mb-2 outline-none"
          />

          {errors.password && (
            <p className="text-red-500 text-sm mb-2">
              {errors.password}
            </p>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded mt-4 transition"
          >
            Login
          </button>

        </form>

        <p className="text-center mt-4">
          New User?{" "}
          <Link to="/register" className="text-blue-600 font-semibold">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Loginpage;