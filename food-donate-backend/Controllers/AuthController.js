
const connection = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ================= REGISTER USER =================

const registerUser = async (req, res) => {
  try {

    let { name, email, password, role } = req.body;

    // VALIDATION
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // CLEAN DATA
    email = email.toLowerCase().trim();

    name = name
      .toLowerCase()
      .split(" ")
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    const allowedRoles = ["donor", "ngo", "volunteer"];
    const userRole = allowedRoles.includes(role)
      ? role
      : "donor";

    // CHECK USER
    const [existingUser] = await connection.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({
        message: "Email already exists"
      });
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // INSERT USER
    await connection.query(
      `INSERT INTO users (name, email, password, role)
       VALUES (?, ?, ?, ?)`,
      [name, email, hashedPassword, userRole]
    );

    return res.status(201).json({
      message: "User Registered Successfully"
    });

  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Registration Failed"
    });
  }
};

// ================= LOGIN USER =================

const loginUser = async (req, res) => {
  try {

    let { email, password } = req.body;

    // VALIDATION
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    // FIND USER
    const [result] = await connection.query(
      "SELECT * FROM users WHERE email = ?",
      [cleanEmail]
    );

    if (result.length === 0) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const user = result[0];

    // PASSWORD CHECK
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Credentials"
      });
    }

    // JWT TOKEN
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login Successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Login Failed"
    });
  }
};

// ================= GET NGO USERS =================

const getNgos = async (req, res) => {
  try {

    const [result] = await connection.query(
      "SELECT id, name, email FROM users WHERE role = 'ngo'"
    );

    return res.status(200).json(result);

  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Database Error"
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getNgos
};

