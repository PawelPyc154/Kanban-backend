const express = require('express');
const passport = require('passport');

const {
  register,
  login,
  getMe,
  loginRegisterGoogle,
  logout,
} = require('../controllers/auth');
require('colors');

const router = express.Router();
const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', protect, getMe);
router.post(
  '/google/token',
  passport.authenticate('google-token'),
  loginRegisterGoogle,
);

module.exports = router;
