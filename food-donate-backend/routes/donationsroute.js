const express = require("express");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

const {
  createDonation,
  getDonations,
  deleteDonation,
  updateDonation,
  getDonationById,
  updatedDonationStatus,
  getPublicDonations
} = require("../Controllers/DonationsController");

router.get("/public",getPublicDonations)

// ================= STATUS =================
router.put("/status/:id", verifyToken, updatedDonationStatus);

// ================= CREATE =================
router.post("/", verifyToken, createDonation);

// ================= GET ALL =================
router.get("/", verifyToken, getDonations);

// ================= GET SINGLE =================
router.get("/:id", verifyToken, getDonationById);

// ================= UPDATE =================
router.put("/:id", verifyToken, updateDonation);

// ================= DELETE =================
router.delete("/:id", verifyToken, deleteDonation);

module.exports = router;