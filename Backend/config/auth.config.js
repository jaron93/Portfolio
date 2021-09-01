const { config } = require('dotenv');

config();
const key = process.env.Secret_Key;

module.exports = {
   secret: key,
   jwtExpiration: 3600,           // 1 hour
   jwtRefreshExpiration: 2592000,   // 30 days
};