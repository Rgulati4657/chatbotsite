// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   firstName: { type: String, required: true },  
//   lastName: { type: String, required: false },   
//   userName: { type: String, unique: true }, // Auto-generated: firstName + 5 random digits
//   email: { type: String, required: true, unique: true }, 
//   password: { type: String, required: true }, // Hashed password
//   mobileNo: { type: String, required: true, unique: true }, 
//   companyName: { type: String}, 
//   address: { type: String}, 
//   websiteDomain: { 
//     type: String, 
//     required: true, 
//     match: [/^(https?:\/\/)?(www\.)?[\w-]+\.[a-z]{2,}$/, "Invalid website domain"] 
//   },
//   date: { type: Date, default: Date.now }, // Auto-generated current date
//   time: { 
//     type: String, 
//     default: () => new Date().toLocaleTimeString() // Auto-generated current time
//   },
//   goal: {
//     type: String,
//     enum: [
//         "Centralize my emails",
//         "Build a chatbot",
//         "Integrate messaging channels",
//         "Chat with my website visitors",
//         "I'm just curious"
//     ],
//     required: true
// }
// }, { timestamps: true });

// // Pre-save hook to generate username
// userSchema.pre("save", function (next) {
//   if (!this.userName) {
//     const randomDigits = Math.floor(10000 + Math.random() * 90000); // 5 random digits
//     this.userName = this.firstName.toLowerCase() + randomDigits;
//   }
//   next();
// });

// module.exports = mongoose.model('User', userSchema);



const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: false, trim: true },
    userName: { type: String, unique: true, trim: true }, // Auto-generated: firstName + 5 random digits
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true }, // Hashed password
    mobileNo: {
      type: String,
      required: true,
      unique: true,
      match: [/^\d{10}$/, "Invalid mobile number (should be 10 digits)"], // Ensure valid 10-digit phone number
    },
    companyName: { type: String, required : false ,trim: true },
    website: {
      type: String,
      required: true,
      match: [/^(https?:\/\/)?(www\.)?[\w-]+\.[a-z]{2,}$/, "Invalid website domain"],
      set: (url) => (url.startsWith("http") ? url : `https://${url}`), // Auto-add https:// if missing
    },
    companyAddress: {type: String , required: false , trim: true},
    date: { type: Date, default: Date.now }, // Auto-generated current date
    time: {
      type: String,
      default: () => new Date().toLocaleTimeString(), // Auto-generated current time
    },
    goal: {
      type: String,
      enum: [
        "Centralize my emails",
        "Build a chatbot",
        "Integrate messaging channels",
        "Chat with my website visitors",
        "I'm just curious",
      ],
      required: false,
    },
  },
  { timestamps: true }
);

// Pre-save hook to generate username
userSchema.pre("save", function (next) {
  if (!this.userName) {
    if (!this.firstName) {
      return next(new Error("First Name is required to generate a username"));
    }
    const randomDigits = Math.floor(10000 + Math.random() * 90000); // 5 random digits
    this.userName = this.firstName.toLowerCase() + randomDigits;
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
