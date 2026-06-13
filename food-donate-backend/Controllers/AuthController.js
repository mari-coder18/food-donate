const connection = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ================= REGISTER USER =================

const registerUser = (req, res) => {

    let { name, email, password, role } = req.body;

    // ================= VALIDATION =================
    if (!name || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    // ================= CLEANING =================
    email = email.toLowerCase().trim();

    name = name
        .toLowerCase()
        .split(" ")
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");

    const allowedRoles = ["donor", "ngo", "volunteer"];
    const userRole = allowedRoles.includes(role) ? role : "donor";

    // ================= CHECK USER EXISTS =================
    const checkSql = "SELECT * FROM users WHERE email = ?";

    connection.query(checkSql, [email], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Database Error" });
        }

        if (result.length > 0) {
            return res.status(409).json({
                message: "Email already exists"
            });
        }

        // ================= HASH PASSWORD =================
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: "Password Hash Error"
                });
            }

            // ================= INSERT USER =================
            const insertSql = `
                INSERT INTO users (name, email, password, role)
                VALUES (?, ?, ?, ?)
            `;

            connection.query(
                insertSql,
                [name, email, hashedPassword, userRole],
                (err) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            message: "Registration Failed"
                        });
                    }

                    return res.status(201).json({
                        message: "User Registered Successfully"
                    });
                }
            );
        });
    });
};


// ================= LOGIN USER =================

const loginUser = (req, res) => {

    let { email, password } = req.body;

    // ================= VALIDATION =================
    if (!email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    // ================= CLEAN EMAIL =================
    const cleanEmail = email.toLowerCase().trim();

    // ================= FIND USER =================
    const sql = "SELECT * FROM users WHERE email = ?";

    connection.query(sql, [cleanEmail], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Database Error"
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const user = result[0];

        // ================= PASSWORD CHECK =================
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: "Password Compare Error"
                });
            }

            if (!isMatch) {
                return res.status(401).json({
                    message: "Invalid Credentials"
                });
            }

            // ================= JWT TOKEN =================
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
        });
    });
};


// ================= GET NGO USERS =================

const getNgos = (req, res) => {

    const sql = "SELECT id, name, email FROM users WHERE role = 'ngo'";

    connection.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Database Error"
            });
        }

        return res.status(200).json(result);
    });
};


// ================= EXPORTS =================

module.exports = {
    registerUser,
    loginUser,
    getNgos
};