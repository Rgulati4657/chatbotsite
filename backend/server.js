const dotenv = require('dotenv');
// const mongoose = require('mongoose');
const connectDB = require("./src/config/db");


const http = require('http');
const { Server } = require('socket.io');

const { addAgent, removeAgent, isAnyAgentOnline } = require('./src/utils/agentStatus');

const Chat = require('./src/models/Chat')
const app = require('./src/app'); // import app.js

dotenv.config();


// Database Connection
connectDB();

// Create HTTP server for Socket.IO
const server = http.createServer(app);

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: "*", // Tu chahe toh yahan frontend ka exact URL bhi daal sakta hai
    // origin: "http://localhost:3000", // Tu chahe toh yahan frontend ka exact URL bhi daal sakta hai
    methods: ["GET", "POST"]
  }
});

// Socket.IO logic
io.on("connection", (socket) => {
  console.log("👤 User connected:", socket.id);

    // ✅ When agent connects and declares themselves
    socket.on("agentOnline", (agentId) => {
      socket.agentId = agentId;
      addAgent(agentId);
      console.log(`🟢 Agent online: ${agentId}`);
    });

  // Handle message receive
  
socket.on("sendMessage", async (messageData) => {
  console.log("📩 Message received:", messageData);

  try {
    // messageData = { userId, text, sender: 'user' | 'bot' | 'agent' }

    const newMessage = {
      text: messageData.text,
      Sender: messageData.sender,
      timestamp: new Date()
    };

    // Check if chat exists
    let chat = await Chat.findOne({ userId: messageData.userId });

    if (chat) {
      // Add message to existing chat
      chat.messages.push(newMessage);
      await chat.save();
      console.log("📝 Message added to existing chat");
    } else {
      // Create new chat
      await Chat.create({
        userId: messageData.userId,
        messages: [newMessage]
      });
      console.log("🆕 New chat created with first message");
    }

      // 🤖 Bot replies only if no agent is online
      if (!isAnyAgentOnline()) {
        const botReply = {
          sender: "bot",
          text: `Currently no agent is available. You said: ${messageData.text}`,
        };
        socket.emit("receiveMessage", botReply);
      } else {
        console.log("👨‍💼 Agent(s) online, bot will not reply.");
        // Optionally forward message to agents
      }
    // Emit back bot reply
    socket.emit("receiveMessage", {
      sender: "bot",
      text: `You said: ${messageData.text}`,
      userId : messageData.userId
    });

  } catch (err) {
    console.error("❌ DB Error:", err.message);
  }
});
 
  socket.on("disconnect", () => {
    if(socket.agentId){
      removeAgent(socket.agentId);
      console.log(`🔴 Agent offline: ${socket.agentId}`);
    }
    console.log("👋 User disconnected:", socket.id);
  });
});




// Start Server // Start Server using HTTP server (important for Socket.IO)
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
}).on("error", (err) => {
  console.error("❌ Server Error:", err.message);
  process.exit(1);
});

