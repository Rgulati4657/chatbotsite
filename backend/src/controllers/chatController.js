const Chat = require('../models/Chat');

exports.addMessage = async(req,res)=>{
    const {userId,text,sender} = req.body;


    try{
        let chat = await Chat.findOne({userId});

        if(!chat){
            chat = new Chat({userId,messages:[]});
        }

        chat.messages.push({text,sender});
        await chat.save();

        res.status(200).json({success:true, chat})
    }catch(err) {
            res.status(500).json({ success: false, message: err.message });   
    }
};


// Get chat history for a user
exports.getChat = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const chat = await Chat.findOne({ userId });
  
      if (!chat) {
        return res.status(404).json({ message: 'No chat found.' });
      }
  
      res.status(200).json(chat);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };