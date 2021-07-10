const { config } = require('dotenv');

config();
const key = process.env.Secret_Key;

module.exports = {
   secret: key,
   jwtExpiration: 3600,           // 1 hour
   jwtRefreshExpiration: 86400,   // 24 hours
};