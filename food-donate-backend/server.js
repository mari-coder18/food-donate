const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit"); // 1. Import for security
require("dotenv").config();

// Connect to Database
require("./config/db");

// Routes
const authRoutes = require("./routes/authroute");
const donationsRoute = require("./routes/donationsroute");
const volunteerRoutes = require("./routes/volunteerRoute");
const adminRoute = require("./routes/adminRoute");
const userRoute = require("./routes/userRoute");

const app = express();

app.set('trust proxy',1);


app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url} from origin: ${req.headers.origin}`);
  next();
});

// ================= MIDDLEWARE =================

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
  message: "Too many requests, please try again later."
});

const allowedOrigins = [
  "http://localhost:5173",
  "https://food-donate-gules.vercel.app",
   "https://www.food-donate-gules.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(limiter); 
app.use(express.json());

// ================= ROUTES =================

app.use("/api/auth", authRoutes);
app.use("/api/donations", donationsRoute);
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/admin", adminRoute);
app.use("/api/users", userRoute);

// ================= TEST ROUTE =================

app.get("/", (req, res) => {
  res.send("Backend Working Successfully");
});

// ================= PORT =================


const PORT = process.env.PORT || 8080; 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});