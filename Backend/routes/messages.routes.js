const controller = require("../controllers/message.controller");
const { authJwt } = require("../middlewares");


module.exports = function (app) {
   app.use(function (req, res, next) {
      res.header(
         "Access-Control-Allow-Headers",
         "x-access-token, Origin, Content-Type, Accept"
      );
      next();
   });

   app.post("/api/messages", authJwt.verifyToken, controller.newMessage);

   app.get("/api/messages/:conversationId", authJwt.verifyToken, controller.findMessages);
};