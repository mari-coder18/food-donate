const connection = require("../config/db");

/* ================= CREATE VOLUNTEER ================= */
const createVolunteer = async (req, res) => {
  try {
    const { name, phone, location, status } = req.body;

    if (!name || !phone || !location) {
      return res.status(400).json({
        message: "name, phone, location are required",
      });
    }

    const volunteerStatus = status || "Available";

  
    const sql =
      "INSERT INTO volunteers (name, phone, location, status,role) VALUES (?, ?, ?, ?,'volunteetr')";

    const [result] = await connection.query(sql, [name, phone, location, volunteerStatus]);

    res.json({
      id: result.insertId,
      name,
      phone,
      location,
      status: volunteerStatus,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

/* ================= GET ALL VOLUNTEERS ================= */
const getVolunteers = async (req, res) => {
  try {
    
    const [rows] = await connection.query(
      "SELECT id, name, email, phone, status FROM users WHERE role = 'volunteer' ORDER BY id DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

/* ================= GET VOLUNTEER BY ID ================= */
const getVolunteerById = async (req, res) => {
  try {
  //  Switched table  'volunteers' to 'users' 
    const [rows] = await connection.query(
      "SELECT id, name, email, phone, status FROM users WHERE id=? AND role='volunteer'",
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Volunteer not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

/* ================= UPDATE VOLUNTEER ================= */
const updateVolunteer = async (req, res) => {
  try {
    const { name, phone, status } = req.body;

  
    const sql =
      "UPDATE users SET name=?, phone=?, status=? WHERE id=? AND role='volunteer'";

    const [result] = await connection.query(sql, [name, phone, status, req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Volunteer not found or update unauthorized" });
    }

    res.json({ message: "Updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

/* ================= DELETE VOLUNTEER ================= */
const deleteVolunteer = async (req, res) => {
  try {
    const [result] = await connection.query(
      "DELETE FROM users WHERE id=? AND role='volunteer'",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Volunteer not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

/* ================= PICKUPS ================= */
const getPickups = async (req, res) => {
  try {
  
    const sql = `
      SELECT 
        id,
        foodName,
        location,
        quantity,
        expiry
      FROM donations
      WHERE status = 'Available'
    `;

    const [rows] = await connection.query(sql);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

/* ================= ACCEPT PICKUP ================= */
const acceptPickup = async (req, res) => {
  try {
    const id = req.params.id;

    const sql = `
      UPDATE donations
      SET status = 'Accepted'
      WHERE id = ?
    `;

    const [result] = await connection.query(sql, [id]);

    res.json({
      message: "Pickup Accepted Successfully"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

/* ================= EXPORT ================= */
module.exports = {
  createVolunteer,
  getVolunteers,
  getVolunteerById,
  updateVolunteer,
  deleteVolunteer,
  getPickups,
  acceptPickup
};