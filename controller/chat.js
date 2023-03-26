const Message = require('../models/chat');
  
exports.chat = async (req,res,next)=>{
    try {
      const { message } = req.body;
      console.log(message)
      if (message == undefined || message.length === 0) {
        return res.status(400).json({ err: "Parameters Missing" });
      } else {
        const result = await Message.create({ message, userId: req.user.id, username: req.user.name });
        res.status(201).json({ message: "Message Sent", success: true });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ err: "Something went wrong" });
    }
  }
  
exports.getchat = async (req, res, next) => {
  try {
      const message = await Message.findAll()
      if (message.length > 0) {
        res.status(201).json({ message: message })
    } else {
        res.status(401).json({ err: "empty chats" })
    }
} catch (err) {
    res.status(401).json({ err: err })
}

}

