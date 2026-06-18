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

router.get("/public", getPublicDonations);

router.get("/stats", async (req, res) => {
  try {
    res.json({
      success: true,
      totalMeals: 1000,
      totalNgos: 10,
      totalCities:5,
      totalVolunteers:50
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put("/status/:id", verifyToken, updatedDonationStatus);
router.post("/", verifyToken, createDonation);
router.get("/", verifyToken, getDonations);
router.get("/:id", verifyToken, getDonationById);
router.put("/:id", verifyToken, updateDonation);
router.delete("/:id", verifyToken, deleteDonation);

module.exports = router;