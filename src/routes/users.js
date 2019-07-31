const User = require('../models/User');
const bcrypt = require('bcryptjs');
const auth = require('../auth');
const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = server => {
  // Add User
  server.post('/user', (req, res, next) => {
    const { email, password } = req.body;
    const user = new User({
      email,
      password
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, async (err, hash) => {
        // hash password
        user.password = hash;
        try {
          const newUser = await user.save();
          res.send(201);
          next();
        } catch (error) {
          return next(new Error(error.message));
        }
      });
    });
  });

  // List Users
  server.get('/user', async (req, res, next) => {
    try {
      const users = await User.find();
      res.send(users);
      next();
    } catch (error) {
      return next(new Error(error.message));
    }
  });

  // Auth User
  server.post('/auth', async (req, res, next) => {
    const { email, password } = req.body;

    try {
      // Authenticate User
      const user = await auth.authenticate(email, password);

      // Create JWT
      const token = jwt.sign(user.toJSON(), config.JWT_SECRET, {
        expiresIn: '15m',
      });

      const { iat, exp } = jwt.decode(token);
      // Respond with token
      res.send({ iat, exp, token });

      next();
    } catch (error) {
      // User unauthorized
      return next(new Error(error.message));
    }
  });
};