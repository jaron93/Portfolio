const User = require("../models/user.model");


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




/* exports.findFriend = async (req, res) => {
   try {
      const user = await User.findById(req.params.userId);
      const friends = await Promise.all(
         user.followings.map((friendId) => {
            return User.findById(friendId);
         })
      );
      let friendList = [];
      friends.map((friend) => {
         const { _id, username } = friend;
         friendList.push({ _id, username });
      });
      res.status(200).json(friendList)
   } catch (err) {
      res.status(500).json(err);
   }
};
 */


