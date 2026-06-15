const connection = require("../config/db");

/* ================= CREATE DONATION ================= */
const createDonation = async (req, res) => {
  try {
    const { foodName, quantity, expiry, location } = req.body;
    const donorId = req.user.id;

    // ✅ FIXED: foodName changed to food_name
    const sql =
      "INSERT INTO donations (food_name, quantity, expiry, location, status, donor_id) VALUES (?, ?, ?, ?, ?, ?)";

    const [result] = await connection.query(sql, [
      foodName, // Frontend field camelCase variables mapping as values array
      quantity,
      expiry,
      location,
      "Available",
      donorId,
    ]);

    res.json({
      id: result.insertId,
      foodName,
      quantity,
      expiry,
      location,
      status: "Available",
      donor_id: donorId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

/* ================= GET ALL DONATIONS ================= */
const getDonations = async (req, res) => {
  try {
    const { role, id: userId } = req.user;

    let sql = "";
    let params = [];

    if (role === "admin") {
      sql = "SELECT * FROM donations ORDER BY id DESC";
    } else if (role === "donor") {
      sql = "SELECT * FROM donations WHERE donor_id = ? ORDER BY id DESC";
      params = [userId];
    } else if (role === "ngo") {
      sql = "SELECT * FROM donations ORDER BY id DESC";
    } else {
      sql = "SELECT * FROM donations ORDER BY id DESC";
    }

    const [rows] = await connection.query(sql, params);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

/* ================= GET BY ID ================= */
const getDonationById = async (req, res) => {
  try {
    const { role, id: userId } = req.user;
    const { id } = req.params;

    const sql =
      role === "admin"
        ? "SELECT * FROM donations WHERE id = ?"
        : "SELECT * FROM donations WHERE id = ? AND donor_id = ?";

    const params = role === "admin" ? [id] : [id, userId];

    const [rows] = await connection.query(sql, params);

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Donation not found or access denied",
      });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

/* ================= UPDATE DONATION ================= */
const updateDonation = async (req, res) => {
  try {
    const { role, id: userId } = req.user;
    const { id } = req.params;
    const { foodName, quantity, expiry, location } = req.body;

    // ✅ FIXED: SET foodName=? to food_name=?
    const sql =
      role === "admin"
        ? "UPDATE donations SET food_name=?, quantity=?, expiry=?, location=? WHERE id=?"
        : "UPDATE donations SET food_name=?, quantity=?, expiry=?, location=? WHERE id=? AND donor_id=?";

    const params =
      role === "admin"
        ? [foodName, quantity, expiry, location, id]
        : [foodName, quantity, expiry, location, id, userId];

    const [result] = await connection.query(sql, params);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Donation not found or access denied",
      });
    }

    res.json({ message: "Updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

/* ================= DELETE DONATION ================= */
const deleteDonation = async (req, res) => {
  try {
    const { role, id: userId } = req.user;
    const { id } = req.params;

    const sql =
      role === "admin"
        ? "DELETE FROM donations WHERE id = ?"
        : "DELETE FROM donations WHERE id = ? AND donor_id = ?";

    const params = role === "admin" ? [id] : [id, userId];

    const [result] = await connection.query(sql, params);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Donation not found or access denied",
      });
    }

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

/* ================= UPDATE STATUS ================= */
const updatedDonationStatus = async (req, res) => {
  try {
    const { role } = req.user;
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    if (!["admin", "ngo"].includes(role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    const sql = "UPDATE donations SET status = ? WHERE id = ?";
    const params = [status, id];

    const [result] = await connection.query(sql, params);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Donation not found",
      });
    }

    res.json({
      message: "Status updated successfully",
      id,
      status,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

/* ================= GET PUBLIC DONATIONS ================= */
const getPublicDonations = async (req, res) => {
  try {
    // ✅ FIXED: Selected food_name from database
    const sql = "SELECT id, food_name AS foodName, quantity, status FROM donations WHERE status ='Available' LIMIT 3";

    const [rows] = await connection.query(sql);
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Database Connection Error",
      error: err.message
    });
  }
};

/* ================= EXPORT ================= */
module.exports = {
  createDonation,
  getDonations,
  getDonationById,
  updateDonation,
  deleteDonation,
  updatedDonationStatus,
  getPublicDonations
};