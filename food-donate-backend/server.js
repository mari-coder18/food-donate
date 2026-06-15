
const express = require("express");


require("dotenv").config();
require("./config/db");

const cors = require("cors");

const authRoutes = require("./routes/authroute");
const donationsRoute = require("./routes/donationsroute");
const volunteerRoutes = require("./routes/volunteerRoute");
const adminRoute = require("./routes/adminRoute");
const userRoute = require("./routes/userRoute");

const app = express(); 



// ================= MIDDLEWARE =================
app.use(cors(
  {
    origin: "*",
    credentials:true,
  }
));
app.use(express.json());

// ================= ROUTES =================
app.use("/api/auth", authRoutes);
app.use("/api/donations", donationsRoute);
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/admin",adminRoute);
app.use("/api/users",userRoute);

app.use((err,req,res,next)=>{
  console.error(err.stack);
  res.status(err.status || 500).json({
    message:err.message || "Something went wrong !"
  })
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