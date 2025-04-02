const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./src/app'); // import app.js

dotenv.config();


// Database Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error("❌ DB Connection Error:", err.message);
    process.exit(1); // Exit process if DB fails to connect
  });


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
}).on("error", (err) => {
  console.error("❌ Server Error:", err.message);
  process.exit(1);
});