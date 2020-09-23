require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser"); // parse cookie header
const session = require("express-session");


const PORT = process.env.PORT;
const passport = require('./passport')

const mongo_url = process.env.MONGO_URL;

mongoose.connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  // console.log("connected to mongo db");
});

app.use(cookieParser('anything'));

app.use(cors({credentials: true, origin: [process.env.CLIENT_HOST, 'www.google.com']}));
app.use(bodyParser.json());

app.use(session({ 
    secret: 'anything',
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

app.get('/', loggedIn, (req, res) => {
	if(req.user)
	{
		res.redirect(process.env.CLIENT_HOST + "/contacts?token=" + req.session.accessToken);
	}
	else
	{
        res.redirect('/auth/google');
	}
})

app.listen(PORT, function() {
    // console.log("Server is running on Port: " + PORT);
});