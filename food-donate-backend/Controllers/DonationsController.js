const connection = require("../config/db");

/* ================= CREATE DONATION ================= */
const createDonation = (req, res) => {
  const { foodName, quantity, expiry, location } = req.body;
  const donorId = req.user.id;

  const sql =
    "INSERT INTO donations (foodName, quantity, expiry, location, status, donor_id) VALUES (?, ?, ?, ?, ?, ?)";

  connection.query(
    sql,
    [foodName, quantity, expiry, location, "Available", donorId],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        id: result.insertId,
        foodName,
        quantity,
        expiry,
        location,
        status: "Available",
        donor_id: donorId,
      });
    }
  );
};

/* ================= GET ALL DONATIONS ================= */
const getDonations = (req, res) => {
  const { role, id: userId } = req.user;

  let sql = "";
  let params = [];

  if (role === "admin") {
    sql = "SELECT * FROM donations ORDER BY id DESC";
  } 
  else if (role === "donor") {
    sql = "SELECT * FROM donations WHERE donor_id = ? ORDER BY id DESC";
    params = [userId];
  } 
  else if (role === "ngo") {
    // NGO sees ALL donations (frontend will filter if needed)
    sql = "SELECT * FROM donations ORDER BY id DESC";
  } 
  else {
    sql = "SELECT * FROM donations ORDER BY id DESC";
  }

  connection.query(sql, params, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

/* ================= GET BY ID ================= */
const getDonationById = (req, res) => {
  const { role, id: userId } = req.user;
  const { id } = req.params;

  const sql =
    role === "admin"
      ? "SELECT * FROM donations WHERE id = ?"
      : "SELECT * FROM donations WHERE id = ? AND donor_id = ?";

  const params = role === "admin" ? [id] : [id, userId];

  connection.query(sql, params, (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length === 0) {
      return res.status(404).json({
        message: "Donation not found or access denied",
      });
    }

    res.json(result[0]);
  });
};

/* ================= UPDATE DONATION ================= */
const updateDonation = (req, res) => {
  const { role, id: userId } = req.user;
  const { id } = req.params;
  const { foodName, quantity, expiry, location } = req.body;

  const sql =
    role === "admin"
      ? "UPDATE donations SET foodName=?, quantity=?, expiry=?, location=? WHERE id=?"
      : "UPDATE donations SET foodName=?, quantity=?, expiry=?, location=? WHERE id=? AND donor_id=?";

  const params =
    role === "admin"
      ? [foodName, quantity, expiry, location, id]
      : [foodName, quantity, expiry, location, id, userId];

  connection.query(sql, params, (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Donation not found or access denied",
      });
    }

    res.json({ message: "Updated successfully" });
  });
};

/* ================= DELETE DONATION ================= */
const deleteDonation = (req, res) => {
  const { role, id: userId } = req.user;
  const { id } = req.params;

  const sql =
    role === "admin"
      ? "DELETE FROM donations WHERE id = ?"
      : "DELETE FROM donations WHERE id = ? AND donor_id = ?";

  const params = role === "admin" ? [id] : [id, userId];

  connection.query(sql, params, (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Donation not found or access denied",
      });
    }

    res.json({ message: "Deleted successfully" });
  });
};

/* ================= UPDATE STATUS ================= */
const updatedDonationStatus = (req, res) => {
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

  connection.query(sql, params, (err, result) => {
    if (err) return res.status(500).json(err);

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
  });
};

const getPublicDonations = (req,res)=> {
  
const sql = "SELECT id, foodName, quantity , status FROM donations WHERE status ='Available' LIMIT 3";

connection.query(sql,(err,result)=>{
  if(err)
  return res.status(500).json({
    message:"Database Connection Error"
  })

  res.status(200).json(result);
})
}



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