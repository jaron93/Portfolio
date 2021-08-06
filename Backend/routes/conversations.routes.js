const controller = require("../controllers/conversation.controller");

module.exports = function (app) {

   app.post("/api/conversation", controller.newConversation);

   app.get("/api/conversation/:userId", controller.findConversation);

   app.get("/api/conversation/find/:firstUserId/:secondUserId", controller.findCommonConversation);

};