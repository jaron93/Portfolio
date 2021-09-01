const mongoose = require("mongoose");

const User = mongoose.model(
   "User",
   new mongoose.Schema({
      username: {
         type: String,
         required: [true, "Username required"],
         minLength: 6,
         maxLength: 20,
         trim: true,
         unique: true,
      },
      email: {
         type: String,
         validate: {
            validator: function (v) {
               return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
         },
         required: [true, "Email required"],
         unique: true,
      },
      password: {
         type: String,
         required: [true, "Password required"],
         minLength: 6,
         trim: true,
      },
      profileAvatar: {
         type: String,
         default: "noAvatar.png",
      },
      desc: {
         type: String,
         max: 50,
      },
      roles: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
         }
      ]
   },
      { timestamps: true })
);

module.exports = User;