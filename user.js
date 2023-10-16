const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },  
  username: String,
  password: String,
  email: String

  // Add other user-related fields here
});

const User = mongoose.model('User', userSchema);

module.exports = User;
