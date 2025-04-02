const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.signup = async (req, res,next) => {
  try {
    const { firstName, lastName, email, password, mobileNo, companyName, companyAddress, websiteDomain, goal } = req.body;   // address, yeh comment kra hai kyunki company address .....

    // NormalizeEmail (Lowercase)
    const normalizedEmail = email.toLowerCase();

    // Check if user already exists
    const existingUser = await User.findOne({ email : normalizedEmail });
    if (existingUser) {
      console.log( 'Email already exists' );
      // return res.status(400).json({ message: 'Email already exists' });
      const error = new Error("Email already exists");
      error.statusCode = 400;
      return next(error);
    }

    // Hash password
    console.log(`FirstName: ${firstName} and Password: ${password} `)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      email : normalizedEmail,
      password: hashedPassword,
      mobileNo,
      // address,
      companyName,
      companyAddress,
      websiteDomain,
      goal
    });

    // Save user
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', userId: newUser._id, userName : newUser.userName });

  } catch (error) {
    console.error("Signup Error:", error);
    // res.status(500).json({ message: 'Server Error', error: error.message });
    next(error); // Global error middleware ko pass karega
  }
};





exports.loginUser = async (req, res, next) => {
    try {
      const { emailOrUsername, password } = req.body;
  
      // Find user by email OR username
      const user = await User.findOne({
        $or: [{ email: emailOrUsername.toLowerCase() }, { userName: emailOrUsername }],
      });
  
      if (!user) {
        // return res.status(400).json({ message: "User not found" });
        const error = new Error("User not found");
      error.statusCode = 400;
      return next(error);
      }
  
      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        // return res.status(400).json({ message: "Invalid credentials" });
        const error = new Error("Invalid credentials");
        error.statusCode = 400;
        return next(error);
      }
  
      res.status(200).json({ message: "Login successful", user });
    } catch (error) {
      console.error("Login Error:", error);
      // res.status(500).json({ message: "Server error" });
      next(error);
    }
  };