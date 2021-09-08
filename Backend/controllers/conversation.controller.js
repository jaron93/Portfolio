const Conversation = require("../models/conversation.model");

//Create new conversation betwen two user.
exports.newConversation = async (req, res) => {

   const newConversation = new Conversation({
      members: [req.body.senderId, req.body.receiverId],
   });

   try {
      const savedConversation = await newConversation.save();
      res.status(200).json(savedConversation);
   } catch (err) {
      res.status(500).json(err);
   }
}

//get conv of a user

exports.findConversation = async (req, res) => {
   try {
      const conversation = await Conversation.find({
         members: { $in: [req.params.userId] },
      });
      res.status(200).json(conversation);
   } catch (err) {
      res.status(500).json(err);
   }
}

// get conv includes two userId

exports.findCommonConversation = async (req, res) => {
   try {
      const conversation = await Conversation.findOne({
         members: { $all: [req.params.firstUserId, req.params.secondUserId] },
      });
      res.status(200).json(conversation)
   } catch (err) {
      res.status(500).json(err);
   }
}

