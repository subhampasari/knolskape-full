const express = require('express')
const router = express.Router()
const https = require('https');
const googleapis = require('googleapis');

router.get('/contacts', (req, res) => {
	console.log('fetching contacts');
	// console.log(req);
	if(!req.user)
	{
		// console.log('No user');
		res.send('Signin first');
	}

	// console.log(req.session);
	// https.get('https://people.googleapis.com/v1/people/me?personFields=names&key=AIzaSyAc-hRHgafmrfOjnyRB2ie1BeEA42whiuI', (resp) => {
	// 	let data = '';

	// 	// A chunk of data has been recieved.
	// 	resp.on('data', (chunk) => {
	// 		data += chunk;
	// 	});

	// 	// The whole response has been received. Print out the result.
	// 	resp.on('end', () => {
	// 		console.log(JSON.parse(data));
	// 	});

	// 	}).on("error", (err) => {
	// 		console.log("Error: " + err.message);
	// 	});

	res.send('Contacts coming soon')

})

module.exports = router