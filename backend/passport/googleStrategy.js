const GoogleStrategy = require('passport-google-oauth20')
const passport = require('passport')
const User = require("../models/user-model");
const strategy = new GoogleStrategy(
	{
		// clientID: process.env.GOOGLE_CLIENT_ID,
		clientID: "156351207245-k1bjuiqg9o96g9efo7b9vu7nhs3uosco.apps.googleusercontent.com",
		// clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		clientSecret: "mBEwpmdsiDSvmVw0Gja08mZo",
		callbackURL: '/auth/google/callback',
		passReqToCallback: true
	},
	
	async function(req, token, tokenSecret, profile, done) {

		console.log("token", token);
		req.session.accessToken = token; 
		const { name, id, photoUrl } = profile;
		const currentUser = await User.findOne({
			googleId: profile.id
		});
		console.log("token is ", token)
		console.log("currentUser", currentUser);
		if (!currentUser) {
			const newUser = new User({
				name: profile._json.name,
				googleId: profile.id,
				profileImageUrl: profile._json.picture,
				email: profile._json.email
			}).save();
			if (newUser) {
				console.log('Added to db ', newUser);
			  	done(null, newUser);
			  	return;
			}
		}

		// console.log("User already Exists");
		done(null, currentUser);
	}
)

passport.serializeUser((user, done) => {
	// console.log(user);
	done(null, user._id)
});

passport.deserializeUser(function(id, done) {
	User.findById(id)
		.then(user => {
			console.log('Found user');
      		done(null, user);
    	})
    	.catch(e => {
     		 done(new Error("Failed to deserialize an user"));
    	});
});

module.exports = strategy