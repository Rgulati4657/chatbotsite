const express = require('express');
const router = express.Router()
const { sendOtp,verifyOtp ,resetPassword} = require("../controllers/otpController");

router.post("/verify-otp", verifyOtp);
router.post("/forgot-password", sendOtp);
router.post("/reset-password", resetPassword);


module.exports = router;