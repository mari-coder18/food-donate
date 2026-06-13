const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const allowRole = require("../middleware/roleMiddleware");

const {
  createVolunteer,
  getVolunteers,
  getVolunteerById,
  updateVolunteer,
  deleteVolunteer,
  getPickups,
  acceptPickup
} = require("../Controllers/VolunteerController");

// ================= PICKUPS (MOVE TOP + ADD AUTH) =================
router.get(
  "/pickups",
  verifyToken,
  allowRole("admin", "volunteer"),
  getPickups
);

// ================= CREATE =================
router.post("/", verifyToken, allowRole("admin"), createVolunteer);

// ================= GET ALL =================
router.get("/", verifyToken, allowRole("admin", "ngo"), getVolunteers);

// ================= ACCEPT PICKUP =================
router.put(
  "/accept/:id",
  verifyToken,
  allowRole("volunteer"),
  acceptPickup
);

// ================= SINGLE =================
router.get("/:id", verifyToken, allowRole("admin", "ngo", "volunteer"), getVolunteerById);

// ================= UPDATE =================
router.put("/:id", verifyToken, allowRole("admin"), updateVolunteer);

// ================= DELETE =================
router.delete("/:id", verifyToken, allowRole("admin"), deleteVolunteer);

module.exports = router;