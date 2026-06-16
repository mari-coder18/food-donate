const express = require("express");
const cors = require("cors");
require("dotenv").config();
// ✅ FIXED: Storing the db connection object globally to reuse it safely below
const connection = require("./config/db");

// Importing Application Routes
const authRoutes = require("./routes/authroute");
const donationsRoute = require("./routes/donationsroute");
const volunteerRoutes = require("./routes/volunteerRoute");
const adminRoute = require("./routes/adminRoute");
const userRoute = require("./routes/userRoute");

const app = express(); 

// ================= MIDDLEWARE =================
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


app.get("/api/auth/create-force-admin", async (req, res) => {
  try {
    const bcrypt = require("bcrypt");
    const adminEmail = "mari18@gmail.com";
    const rawPassword = "admin12345"; 
    
    // Generating real exact dynamic crypt layers before cloud injection
    const superSecureHash = await bcrypt.hash(rawPassword, 10);

    // Using the verified global connection object safely
    const [result] = await connection.query(
      `UPDATE users SET password = ?, role = 'admin' WHERE email = ?`,
      [superSecureHash, adminEmail]
    );

    if (result.affectedRows === 0) {
      return res.send(`<h3>Error da: Account '${adminEmail}' not found in database! Frontend-la fresh-ah indha email-vachu register பண்ணிட்டு அப்றம் இந்த URL-அ hit பண்ணு da.</h3>`);
    }

    res.send(`<h3>Success da! Account '${adminEmail}' is now officially Super Admin! New Password is: admin12345</h3>`);
  } catch (err) {
    res.status(500).send("Matrix Crash Error: " + err.message);
  }
});

// ================= SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});