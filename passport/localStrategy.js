const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
},
  (username, password, done) => {
    User.findOne({ username })
      .then(foundUser => {
        if (!foundUser) {
          done(null, false, { message: 'Incorrect username' });
          return;
        }

        if (!bcrypt.compareSync(password, foundUser.password)) {
          done(null, false, { message: 'Incorrect password' });
          return;
        }

        done(null, foundUser);
      })
      .catch(err => done(err));
  }
));

//GITHUB
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://127.0.0.1:3000/auth/github/callback"
},
  // function (accessToken, refreshToken, profile, cb) {
  //   User.findOrCreate({ githubId: profile.id }, function (err, user) {
  //     return cb(err, user);
  //   });
  // }
  (accessToken, refreshToken, profile, done) => {
    // find a user with profile.id as githubId or create one
    User.findOne({ githubId: profile.id })
      .then(found => {
        if (found !== null) {
          // user with that githubId already exists
          done(null, found);
        } else {
          // no user with that githubId
          console.log(profile);
          return User.create({ githubId: profile.id, username: profile.username }).then(dbUser => {
            done(null, dbUser);
          });
        }
      })
      .catch(err => {
        done(err);
      });
  }
));

//FACEBOOK
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:3000/auth/facebook/callback"
},
  (accessToken, refreshToken, profile, done) => {
    // find a user with profile.id as facebookId or create one
    User.findOne({ facebookId: profile.id })
      .then(found => {
        if (found !== null) {
          // user with that facebookId already exists
          done(null, found);
        } else {
          // no user with that facebookId
          // console.log(profile);
          return User.create({ facebookId: profile.id, username: profile.displayName }).then(dbUser => {
            done(null, dbUser);
          });
        }
      })
      .catch(err => {
        done(err);
      });
  }
));
