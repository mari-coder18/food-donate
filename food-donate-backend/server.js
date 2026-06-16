const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./config/db");

// Importing Application Routes
const authRoutes = require("./routes/authroute");
const donationsRoute = require("./routes/donationsroute");
const volunteerRoutes = require("./routes/volunteerRoute");
const adminRoute = require("./routes/adminRoute");
const userRoute = require("./routes/userRoute");

const app = express(); 

// ================= MIDDLEWARE =================
// Configured CORS with explicit local origin to support axios withCredentials mode
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// ================= ROUTES =================
app.use("/api/auth", authRoutes);
app.use("/api/donations", donationsRoute);
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/admin", adminRoute);
app.use("/api/users", userRoute);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Something went wrong!"
  });
});

// ================= TEST ROUTE =================
app.get("/", (req, res) => {
  res.send("backend is running");
});

// ================= SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});