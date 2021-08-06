const mongoose = require("mongoose");

const Conversation = mongoose.model(
   "Conversation",
   new mongoose.Schema({
      members: {
         type: Array,
      },
   },
      { timestamps: true }
   ))

module.exports = Conversation;