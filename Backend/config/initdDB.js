const { connect } = require('mongoose');
const { config } = require('dotenv');

const db = require("../models");
const Role = db.role;

module.exports = () => {
   config();
   const uri = process.env.DB_URI;

   db.mongoose
      .connect(uri, {
         useNewUrlParser: true,
         useCreateIndex: true,
         useUnifiedTopology: true,
      })
      .then(() => {
         console.log('Successfully connect to MongoDB.');
      })
      .catch(error => console.error(error.message));
}


Role.estimatedDocumentCount((err, count) => {
   if (!err && count === 0) {
      new Role({
         name: "user"
      }).save(err => {
         if (err) {
            console.log("error", err);
         }

         console.log("added 'user' to roles collection");
      });

      new Role({
         name: "moderator"
      }).save(err => {
         if (err) {
            console.log("error", err);
         }

         console.log("added 'moderator' to roles collection");
      });

      new Role({
         name: "admin"
      }).save(err => {
         if (err) {
            console.log("error", err);
         }

         console.log("added 'admin' to roles collection");
      });
   }
});
