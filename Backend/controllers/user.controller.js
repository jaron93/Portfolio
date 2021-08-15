const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

exports.allAccess = (req, res) => {
   res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
   res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
   res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
   res.status(200).send("Moderator Content.");
};


//get a user
exports.getUser = async (req, res) => {
   const userId = req.query.userId;
   const username = req.query.username;
   try {
      const user = userId
         ? await User.findById(userId)
         : await User.findOne({ username: username });
      const { password, roles, ...other } = user._doc;
      res.status(200).json(other);
   } catch (err) {
      res.status(500).json(err);
   }
};


//update user
exports.updateUser = async (req, res) => {
   if (req.body.userId === req.params.id) {
      if (req.body.password) {
         try {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
         } catch (err) {
            return res.status(500).json(err);
         }
      }
      try {
         const user = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body,
         });
         res.status(200).json("Account has been updated");
      } catch (err) {
         return res.status(500).json(err);
      }
   } else {
      return res.status(403).json("You can update only your account!");
   }
};

//delete user
exports.deleteUser = async (req, res) => {
   if (req.body.userId === req.params.id || req.body.isAdmin) {
      try {
         await User.findByIdAndDelete(req.params.id);
         res.status(200).json("Account has been deleted");
      } catch (err) {
         return res.status(500).json(err);
      }
   } else {
      return res.status(403).json("You can delete only your account!");
   }
};




