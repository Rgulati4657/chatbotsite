const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes'); // Import Routes
const generalRoutes = require('./routes/generalRoutes'); // Import Routes
const app = express();

// Middleware
app.use(cors());
app.use(express.json());




// Routes
app.use('/api/auth', authRoutes);
app.use('/',generalRoutes) // general Routes

module.exports = app;

