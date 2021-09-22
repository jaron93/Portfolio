const Notification = require("../models/notification.model");

//Create new Notification
exports.newNotification = async (req, res) => {
   const newNotification = new Notification(req.body);

   try {
      const savedNotification = await newNotification.save();
      res.status(200).json(savedNotification);
   } catch (err) {
      res.status(500).json(err);
   }
}

//Get array with all notification related to user id with token validation.
exports.findNotification = async (req, res) => {
   try {
      const notification = await Notification.find({
         receiver: req.params.receiver,
      });
      if (req.userId == req.params.receiver) {
         res.status(200).json(notification);
      } else {
         res.status(403).json("You can only find your notifications!");
      }
   } catch (err) {
      res.status(500).json(err);
   }
}

//Delete specified notification with token validation. 
exports.deleteNotification = async (req, res) => {
   const notification = await Notification.findById(req.params.id);
   try {
      if (req.userId == notification.receiver) {
         await notification.deleteOne();
         res.status(200).json("The notification has been deleted.");
      } else {
         res.status(403).json("You can delete only your notification!");
      }
   } catch (err) {
      res.status(500).json(err);
   }
};
