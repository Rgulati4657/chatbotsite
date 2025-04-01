const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, mobileNo, address, companyName, companyAddress, websiteDomain, goal } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash password
    console.log(`FirstName: ${firstName} and Password: ${password} `)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      mobileNo,
      address,
      companyName,
      companyAddress,
      websiteDomain,
      goal
    });

    // Save user
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', userId: newUser._id, userName : newUser.userName });

  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};





exports.loginUser = async (req, res) => {
    try {
      const { emailOrUsername, password } = req.body;
  
      // Find user by email OR username
      const user = await User.findOne({
        $or: [{ email: emailOrUsername }, { userName: emailOrUsername }],
      });
  
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
  
      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      res.status(200).json({ message: "Login successful", user });
    } catch (error) {
      console.error("Login Error:", error);
      res.status(500).json({ message: "Server error" });
    }
  };