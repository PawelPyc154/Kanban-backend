const crypto = require('crypto');
const mongoose = require('mongoose');
const bcript = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Name in required!'],
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'Email in required!'],
    unique: [true, 'This email is already taken!'],
    match: [/^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/, 'Invalid email'],
  },
  password: {
    type: String,
    trim: true,
    minlength: [6, 'Password is too short!'],
    select: false,
  },
  chat: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
      },
      message: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Encrypt password using bcript
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcript.genSalt(10);
  this.password = await bcript.hash(this.password, salt);
});

// Sign JWT and raturn
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Math user entered passwerd to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  const isMatch = await bcript.compare(enteredPassword, this.password);
  return isMatch;
};

module.exports = mongoose.model('User', UserSchema);
