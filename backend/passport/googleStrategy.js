const GoogleStrategy = require('passport-google-oauth20')
const passport = require('passport')
const User = require("../models/user-model");
const mongoose = require('mongoose');
const strategy = new GoogleStrategy(
	{
		clientID: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		callbackURL: '/auth/google/callback',
		passReqToCallback: true
	},
	
	async function(req, token, tokenSecret, profile, done) {

		req.session.accessToken = token; 

		User.findOne({
            googleID: profile.id
        }).then((dbUserRecord, err) => {
            if (dbUserRecord) {
                // done(null, dbUserRecord);
                done(dbUserRecord, null);
            } else {
                const newUser = new User({
                    googleID: profile._id,
                    name: profile.displayName,
                    profileImageUrl: profile._json.picture,
					email: profile._json.email
                });

                newUser.save().then((newUser) => {
                    done(null, newUser);
                });
            }
        }).catch(err => {
            console.log(err);
        });
	}
)

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


module.exports = strategy