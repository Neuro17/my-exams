'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;

var configAuth = require('./auth');

/**
 * Passport configuration
 */
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.findOne({
    _id: id
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    done(err, user);
  });
});

// add other strategies for more authentication flexibility
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password' // this is the virtual field on the model
  },
  function(email, password, done) {
    User.findOne({
      email: email.toLowerCase()
    }, function(err, user) {
      if (err) return done(err);
      
      if (!user) {
        return done(null, false, {
          message: 'This email is not registered.'
        });
      }
      if (!user.authenticate(password)) {
        return done(null, false, {
          message: 'This password is not correct.'
        });
      }
      return done(null, user);
    });
  }
));

passport.use(new GoogleStrategy({

    clientID        : configAuth.googleAuth.clientID,
    clientSecret    : configAuth.googleAuth.clientSecret,
    callbackURL     : configAuth.googleAuth.callbackURL,
    passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

},
function(req, token, refreshToken, profile, done) {

    // asynchronous
    process.nextTick(function() {

        // check if the user is already logged in
        if (!req.user) {

            User.findOne({ 'google.id' : profile.id }, function(err, user) {
                if (err)
                    return done(err);

                if (user) {

                    // if there is a user id already but no token (user was linked at one point and then removed)
                    if (!user.google.token) {
                        user.google.token = token;
                        user.google.name  = profile.displayName;
                        user.google.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email

                        user.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, user);
                        });
                    }

                    return done(null, user);
                } else {
                    var newUser          = new User();
                    newUser.google.id    = profile.id;
                    newUser.google.token = token;
                    newUser.name  = profile.displayName;
                    newUser.email = (profile.emails[0].value || '').toLowerCase();// pull the first email
                    newUser.provider     = "google"
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });

        } else {
            // user already exists and is logged in, we have to link accounts
            var user               = req.user; // pull the user out of the session

            user.google.id    = profile.id;
            user.google.token = token;
            user.google.name  = profile.displayName;
            user.google.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email

            user.save(function(err) {
                if (err)
                    throw err;
                return done(null, user);
            });

        }

    });

}));

module.exports = passport;
