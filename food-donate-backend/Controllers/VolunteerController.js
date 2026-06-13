const connection = require("../config/db");

/* ================= CREATE VOLUNTEER ================= */
const createVolunteer = (req, res) => {
  const { name, phone, location, status } = req.body;

  if (!name || !phone || !location) {
    return res.status(400).json({
      message: "name, phone, location are required",
    });
  }

  const volunteerStatus = status || "Available";

  const sql =
    "INSERT INTO volunteers (name, phone, location, status) VALUES (?, ?, ?, ?)";

  connection.query(
    sql,
    [name, phone, location, volunteerStatus],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        id: result.insertId,
        name,
        phone,
        location,
        status: volunteerStatus,
      });
    }
  );
};

/* ================= GET ALL VOLUNTEERS ================= */
const getVolunteers = (req, res) => {
  connection.query(
    "SELECT id, name, email FROM users WHERE role = 'volunteer' ORDER BY id DESC",
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};

/* ================= GET VOLUNTEER BY ID ================= */
const getVolunteerById = (req, res) => {
  connection.query(
    "SELECT * FROM volunteers WHERE id=?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length === 0) {
        return res.status(404).json({ message: "Volunteer not found" });
      }

      res.json(result[0]);
    }
  );
};

/* ================= UPDATE VOLUNTEER ================= */
const updateVolunteer = (req, res) => {
  const { name, phone, location, status } = req.body;

  const sql =
    "UPDATE volunteers SET name=?, phone=?, location=?, status=? WHERE id=?";

  connection.query(
    sql,
    [name, phone, location, status, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Volunteer not found" });
      }

      res.json({ message: "Updated successfully" });
    }
  );
};

/* ================= DELETE VOLUNTEER ================= */
const deleteVolunteer = (req, res) => {
  connection.query(
    "DELETE FROM users WHERE id=? AND role='volunteer'",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Volunteer not found" });
      }

      res.json({ message: "Deleted successfully" });
    }
  );
};

/* ================= PICKUPS ================= */
const getPickups = (req, res) => {
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

  connection.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

const acceptPickup = (req,res)=>{

  const id = req.params.id;

  const sql =`
  UPDATE donations
  SET status = 'Accepted'
  WHERE id = ?
  `
   connection.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({
      message: "Pickup Accepted Successfully"
    });
  });
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