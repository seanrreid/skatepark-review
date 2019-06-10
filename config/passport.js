require('dotenv').config();

const GithubStrategy = require('passport-github').Strategy,
    LocalStrategy = require('passport-local').Strategy;

const userController = require('../controllers/users');

module.exports = function(passport) {
    passport.use(new GithubStrategy({
            clientID: process.env['GITHUB_CLIENT_ID'],
            clientSecret: process.env['GITHUB_CLIENT_SECRET'],
            callbackURL: '/return'
        },
        function(accessToken, refreshToken, profile, done) {
            console.log("github profile", profile);
            return done(null, profile);
        }
    ));

    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        }, function(req, username, password, done) {
            // request object is now first argument
            userController.authenticate(username, password).then(response => {
                return done(null, response);
            });
        }
    ));

    passport.serializeUser(function(user, cb) {
        cb(null, user);
    });

    passport.deserializeUser(function(obj, cb) {
        cb(null, obj);
    });
}