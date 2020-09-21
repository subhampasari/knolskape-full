const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser"); // parse cookie header
const session = require("express-session");


const PORT = 4000;


const passport = require('./passport')
const mongo_url = "mongodb://user:user123@ds023445.mlab.com:23445/google_users";
mongoose.connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log("connected to mongo db");
});

app.use(cookieParser());

app.use(cors());
app.use(bodyParser.json());


app.use(session({ secret: 'anything'
}));


app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', require('./auth'))
app.use('/googleData', require('./googleData'));

app.get('/', (req, res) => {
	console.log(req.user)
	if(req.user)
	{
		res.send(req.session.accessToken);
	}
	else
	{
		res.redirect('/auth/google');
	}
})

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});