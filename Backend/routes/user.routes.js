const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
   app.use(function (req, res, next) {
      res.header(
         "Access-Control-Allow-Headers",
         "x-access-token, Origin, Content-Type, Accept"
      );
      next();
   });

   app.get("/api/all", controller.allAccess);

   /*    app.get("/api/user", [authJwt.verifyToken], controller.userBoard); */

   app.get(
      "/api/mod",
      [authJwt.verifyToken, authJwt.isModerator],
      controller.moderatorBoard
   );

   app.get(
      "/api/admin",
      [authJwt.verifyToken, authJwt.isAdmin],
      controller.adminBoard
   );
   /* 
      app.get("/api/users/:userId", controller.findFriend); */

   //Get user by Id or Username
   app.get("/api/user", controller.getUser);

   //update user account
   app.put("/api/user/:id", controller.updateUser);

   //delete user account
   app.delete("/api/user/:id", controller.deleteUser);

};