const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    text:{
        type: String,
        required: true,
    },
    Sender:{
        type: String, // 'user' | 'bot' | 'agent'
        required: true, 
    },
    timestamp:{
        type:Date,
        default:Date.now,
    }
});

const chatSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        unique:true,
    },
    messages: [messageSchema]
},{timestamps: true});

const Chat = mongoose.model('Chat',chatSchema);

module.exports = Chat;