const controller = require("../controllers/message.controller");

module.exports = function (app) {
   app.post("/api/messages", controller.newMessage);

   app.get("/api/messages/:conversationId", controller.findMessages);
};