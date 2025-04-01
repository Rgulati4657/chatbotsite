const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },  
  lastName: { type: String },   
  userName: { type: String, unique: true }, // Auto-generated: firstName + 5 random digits
  email: { type: String, required: true, unique: true }, 
  password: { type: String, required: true }, // Hashed password
  mobileNo: { type: String, required: true, unique: true }, 
  companyName: { type: String}, 
  address: { type: String}, 
  websiteDomain: { 
    type: String, 
    required: true, 
    match: [/^(https?:\/\/)?(www\.)?[\w-]+\.[a-z]{2,}$/, "Invalid website domain"] 
  },
  date: { type: Date, default: Date.now }, // Auto-generated current date
  time: { 
    type: String, 
    default: () => new Date().toLocaleTimeString() // Auto-generated current time
  },
  goal: {
    type: String,
    enum: [
        "Centralize my emails",
        "Build a chatbot",
        "Integrate messaging channels",
        "Chat with my website visitors",
        "I'm just curious"
    ],
    required: true
}
}, { timestamps: true });

// Pre-save hook to generate username
userSchema.pre("save", function (next) {
  if (!this.userName) {
    const randomDigits = Math.floor(10000 + Math.random() * 90000); // 5 random digits
    this.userName = this.firstName.toLowerCase() + randomDigits;
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
