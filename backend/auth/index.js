const express = require('express')
const router = express.Router()
const passport = require('../passport')

router.get('/google', passport.authenticate('google', { scope: [
		'profile', 
		'email', 
		'https://www.googleapis.com/auth/contacts.readonly',
		'https://www.google.com/m8/feeds'
	] }, {session: true}));

router.get(
	'/google/callback',
	passport.authenticate('google', {
		successRedirect: 'http://localhost:4000',
		failureRedirect: '/google'
	})
)

router.get('/', (req, res) => {
	res.send("ok");
})

// this route is just used to get the user basic info
router.get('/user', (req, res, next) => {
	console.log('===== user!!======')
	console.log(req.user)
	if (req.user) {
		return res.json({ user: req.user })
	} else {
		return res.json({ user: null })
	}
})

router.get('/logout', (req, res) => {
	if (req.user) {
		// req.session.destroy()
		req.session = null;
		res.clearCookie('connect.sid') // clean up!
		return res.json({ msg: 'logging you out' })
	} else {
		return res.json({ msg: 'no user to log out!' })
	}
})

module.exports = router