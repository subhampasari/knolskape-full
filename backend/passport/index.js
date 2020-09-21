const passport = require('passport')
const GoogleStratgey = require('./googleStrategy')

passport.use(GoogleStratgey)

module.exports = passport;