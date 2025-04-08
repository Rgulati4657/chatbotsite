// // testClient.js

// const { io } = require("socket.io-client");

// const socket = io("http://localhost:5000"); // server ka URL

// socket.on("connect", () => {
//   console.log("✅ Connected to server with ID:", socket.id);

//   // Send a test message
//   socket.emit("sendMessage", {
//     userId: "67ea4ec068d740cb342250b2", // ✅ valid ObjectId
//     text: "kya haal hai jnaab after code so much",
//     sender: "user"
//   });
  
  
// });

// // Listen for any response (like from bot or agent)
// socket.on("receiveMessage", (data) => {
//   console.log("📥 Message received:", data);
// });

// // Handle disconnect
// socket.on("disconnect", () => {
//   console.log("agent gayo offline");
//   console.log("❌ Disconnected from server");
// });


const { io } = require("socket.io-client");

const socket = io("http://localhost:5000"); // Server URL

// Valid userId from your MongoDB
const userId = "67ea4ec068d740cb342250b2";

socket.on("connect", () => {
  console.log("✅ Connected to server with ID:", socket.id);

  // Send first message
  socket.emit("sendMessage", {
    userId,
    text: "Hello bhai, kaise ho?",
    sender: "user"
  });

  // Send another message after 2 seconds
  setTimeout(() => {
    socket.emit("sendMessage", {
      userId,
      text: "Code chal raha hai full flow mein 😎",
      sender: "user"
    });
  }, 2000);
});

// Listen for response from bot or agent
socket.on("receiveMessage", (data) => {
  console.log("📥 Message from server:");
  console.log(`👤 Sender: ${data.sender}`);
  console.log(`💬 Text  : ${data.text}`);
  console.log("--------------------------");
});

// Handle disconnect
socket.on("disconnect", () => {
  console.log("❌ Disconnected from server");
});
