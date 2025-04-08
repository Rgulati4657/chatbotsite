const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes'); // Import Routes
const generalRoutes = require('./routes/generalRoutes'); // Import Routes
const chatRoutes = require('./routes/chatRoutes'); // Import Routes
const errorHandler = require('./middleware/errorMiddleware');
const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());




// Routes
app.use('/api/auth', authRoutes); //cred routes
app.use('/',generalRoutes) // general Routes
app.use('/api/chat', chatRoutes); // chat routes


// Handle unknown routes
app.use((req, res, next) => {
    res.status(404).json({ success: false, message: 'Route not found' });
  });

 // Global Error Handling Middleware
app.use(errorHandler);


module.exports = app;

