const Notification = require("../models/notification.model");

//add

exports.newNotification = async (req, res) => {
   const newNotification = new Notification(req.body);

   try {
      const savedNotification = await newNotification.save();
      res.status(200).json(savedNotification);
   } catch (err) {
      res.status(500).json(err);
   }
}

//get

exports.findNotification = async (req, res) => {
   try {
      const notification = await Notification.find({
         receiver: req.params.receiver,
      });
      res.status(200).json(notification);
   } catch (err) {
      res.status(500).json(err);
   }
}


