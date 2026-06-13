const express = require("express");

const router = express.Router();

const {
    registerUser,
    loginUser,
    getNgos
} = require("../Controllers/AuthController");



router.post("/register", registerUser);
router.post("/login",loginUser);
router.get("/ngos",getNgos);

module.exports = router;