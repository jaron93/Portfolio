const controller = require("../controllers/notification.controller");
const { authJwt } = require("../middlewares");


module.exports = function (app) {
   app.use(function (req, res, next) {
      res.header(
         "Access-Control-Allow-Headers",
         "x-access-token, Origin, Content-Type, Accept"
      );
      next();
   });

   app.post("/api/notification", authJwt.verifyToken, controller.newNotification);

   app.get("/api/notification/:receiver", authJwt.verifyToken, controller.findNotification);

   app.delete("/api/notification/:id", authJwt.verifyToken, controller.deleteNotification);
};