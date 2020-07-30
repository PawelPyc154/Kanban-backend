const passport = require('passport');
const GoogleTokenStrategy = require('passport-google-token').Strategy;

passport.serializeUser(function (user, cb) {
  cb(null, user);
});
passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

passport.use(
  new GoogleTokenStrategy(
    {
      clientID: `${process.env.GOOGLE_APP_ID}`,
      clientSecret: process.env.GOOGLE_APP_ID,
    },
    function (accessToken, refreshToken, profile, next) {
      return next(null, profile);
    },
  ),
);
