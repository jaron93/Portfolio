const config = require("../config/auth.config");
const db = require("../models");
const {
   user: User,
   refreshToken: RefreshToken
} = db;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Register
exports.signup = async (req, res) => {
   try {
      //generate new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      //create new user
      const newUser = new User({
         username: req.body.username,
         email: req.body.email,
         password: hashedPassword,
      });

      //save user and respond
      await newUser.save();
      res.status(200).send({ message: "User was registered successfully!" })
   } catch (err) {
      res.status(500).json(err)
   }
};

// Login
exports.signin = async (req, res) => {
   try {
      // Find user
      const user = await User.findOne({ username: req.body.username });
      !user && res.status(404).send({ message: "User Not found." });

      // Check password
      const validPassword = await bcrypt.compare(req.body.password, user.password)
      !validPassword && res.status(401).send({
         accessToken: null,
         message: "Invalid Password!"
      });

      //Create JSON Web Token
      let token = jwt.sign({ id: user.id }, config.secret, {
         expiresIn: 3600 // 1 hours
      });

      //Create Refresh Token
      let refreshToken = await RefreshToken.createToken(user);

      res.status(200).send({
         id: user._id,
         username: user.username,
         email: user.email,
         isAdmin: user.isAdmin,
         accessToken: token,
         refreshToken: refreshToken,
         profileAvatar: user.profileAvatar
      });

   } catch (err) {
      res.status(500).json(err)
   }
};


exports.refreshToken = async (req, res) => {
   const { refreshToken: requestToken } = req.body;

   if (requestToken == null) {
      return res.status(403).json({ message: "Refresh Token is required!" });
   }

   try {
      let refreshToken = await RefreshToken.findOne({ token: requestToken });

      if (!refreshToken) {
         res.status(403).json({ message: "Refresh token is not in database!" });
         return;
      }

      if (RefreshToken.verifyExpiration(refreshToken)) {
         RefreshToken.findByIdAndRemove(refreshToken._id, { useFindAndModify: false }).exec();

         res.status(403).json({
            message: "Refresh token was expired. Please make a new signin request",
         });
         return;
      }

      let newAccessToken = jwt.sign({ id: refreshToken.user._id }, config.secret, {
         expiresIn: config.jwtExpiration,
      });

      return res.status(200).json({
         accessToken: newAccessToken,
         refreshToken: refreshToken.token,
      });
   } catch (err) {
      return res.status(500).send({ message: err });
   }
};