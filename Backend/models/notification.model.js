const mongoose = require("mongoose");

const Notification = mongoose.model(
   "Notification",
   new mongoose.Schema({
      sender: {
         type: mongoose.Schema.Types.ObjectId
      },
      receiver: [{
         type: mongoose.Schema.Types.ObjectId
      }],
      message: {
         type: String
      },
      is_read: {
         type: Boolean, default: false
      },
      created_at: {
         type: Date, default: Date.now
      },
   }
   ))

module.exports = Notification;
