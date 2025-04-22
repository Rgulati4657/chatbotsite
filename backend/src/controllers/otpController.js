const bcrypt = require("bcryptjs"); // for hashing password
const Otp = require("../models/Otp");
const sendEmail = require("../utils/email");
const User = require("../models/User");
require('dotenv').config();
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// ✅ Send OTP
exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = generateOtp();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await Otp.findOneAndUpdate(
      { email },
      { otp, expiresAt },
      { upsert: true, new: true }
    );

    await sendEmail(
      email,
      "Password Reset OTP",
      `Your OTP for password reset is: ${otp}`
    );

    res.status(200).json({ message: "OTP sent to email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// ✅ Verify OTP
exports.verifyOtp = async (req, res) => {
    try {
      const { email, otp } = req.body;
  
      // Check if OTP entry exists
      const otpEntry = await Otp.findOne({ email });
      if (!otpEntry) {
        return res.status(404).json({ message: "OTP not found. Please request again." });
      }
  
      // Check if OTP is expired
      if (otpEntry.expiresAt < new Date()) {
        return res.status(400).json({ message: "OTP expired. Please request a new one." });
      }
  
      // Check if OTP matches
      if (otpEntry.otp !== otp) {
        return res.status(400).json({ message: "Invalid OTP" });
      }
  
      // If all good
      res.status(200).json({ message: "OTP verified successfully" });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
  


 

// ✅ Reset Password
exports.resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password in DB
    user.password = hashedPassword;
    await user.save();

    // Optionally: Delete OTP after successful password change
    await Otp.deleteOne({ email });

    res.status(200).json({ message: "Password reset successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
