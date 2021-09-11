const controller = require("../controllers/conversation.controller");
const { authJwt } = require("../middlewares");

module.exports = function (app) {
   app.use(function (req, res, next) {
      res.header(
         "Access-Control-Allow-Headers",
         "x-access-token, Origin, Content-Type, Accept"
      );
      next();
   });

   app.post("/api/conversation", authJwt.verifyToken, controller.newConversation);

   app.get("/api/conversation/:userId", authJwt.verifyToken, controller.findConversation);

   app.get("/api/conversation/find/:firstUserId/:secondUserId", authJwt.verifyToken, controller.findCommonConversation);

};