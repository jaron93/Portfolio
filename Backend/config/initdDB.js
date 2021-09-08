const { connect } = require('mongoose');
const { config } = require('dotenv');

const db = require("../models");

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
