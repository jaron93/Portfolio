const Message = require("../models/message.model");

//add

exports.newMessage = async (req, res) => {
   const newMessage = new Message(req.body);

   try {
      const savedMessage = await newMessage.save();
      res.status(200).json([savedMessage]);
   } catch (err) {
      res.status(500).json(err);
   }
}

//get

exports.findMessages = async (req, res) => {
   const count = +req.query.count;
   const page = +req.query.page;
   try {
      const messages = await Message.find({
         conversationId: req.params.conversationId,
      }).sort({ createdAt: -1 }).skip(count * (page - 1)).limit(count)
      res.status(200).json(messages);
   } catch (err) {
      res.status(500).json(err);
   }
}


