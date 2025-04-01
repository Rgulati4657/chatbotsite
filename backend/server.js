const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./src/app'); // import app.js

dotenv.config();


// Database Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("DB Connection Error:", err));

// Sample Route
// app.get("/", (req, res) => {
//   res.send("Chatbot Backend Running...");
// }); 

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));