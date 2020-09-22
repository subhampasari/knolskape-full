const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser"); // parse cookie header
const session = require("express-session");


const PORT = 4000;
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

const passport = require('./passport')
const mongo_url = "mongodb://user:user123@ds023445.mlab.com:23445/google_users";
mongoose.connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log("connected to mongo db");
});

app.use(cookieParser());

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // One day in milliseconds
    keys: ['randomstringhere']
}));

app.use(cors());
app.use(bodyParser.json());




app.use(session({ secret: 'anything'
}));

function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/auth/google');
    }
}

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', require('./auth'))
app.use('/googleData', loggedIn, require('./googleData'));

app.get('/', loggedIn, (req, res) => {
	console.log("show user : ", req.user)
	if(req.user)
	{
		res.redirect("http://localhost:3000/contacts?token=" + req.session.accessToken);
		console.log('');
	}
	else
	{
		res.send('signin');
	}
})

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});