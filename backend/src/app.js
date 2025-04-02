const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes'); // Import Routes
const generalRoutes = require('./routes/generalRoutes'); // Import Routes
const errorHandler = require('./middleware/errorMiddleware');
const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());




// Routes
app.use('/api/auth', authRoutes);
app.use('/',generalRoutes) // general Routes

// Handle unknown routes
app.use((req, res, next) => {
    res.status(404).json({ success: false, message: 'Route not found' });
  });

 // Global Error Handling Middleware
app.use(errorHandler);


module.exports = app;

