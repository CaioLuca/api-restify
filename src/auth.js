const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.authenticate = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Get user by email
      const user = await User.findOne({ email });

      // Match password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if(err) throw err;

        if (isMatch) {
          resolve(user);
          console.log('passwords match');
        } else {
          // Password didn't match
          reject('Authentication Failed!');
        }
      });
    } catch (error) {
      // Email not found
      return new Error(error.message);
    }
  });
}