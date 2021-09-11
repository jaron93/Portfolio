const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.refreshToken = require("./refreshToken.model");
db.message = require("./message.model");
db.conversation = require("./conversation.model");
db.notification = require("./notification.model");

module.exports = db;