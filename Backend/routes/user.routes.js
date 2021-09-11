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

   app.get("/api/all", authJwt.verifyToken, controller.allAccess);


   //Get user by Id or Username
   app.get("/api/user", authJwt.verifyToken, controller.getUser);

   //update user account
   app.put("/api/user/:id", authJwt.verifyToken, controller.updateUser);

   //delete user account
   app.delete("/api/user/:id", authJwt.verifyToken, controller.deleteUser);

};