const jwt = require('jsonwebtoken')
require('dotenv').config() // for jwt secret
const expressJwt = require('express-jwt')
const User = require('../models/user')

exports.signup = async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email })
  if (userExists) {
    return res.status(403).json({
      error: 'email is taken'
    })
  }
  const user = await new User(req.body)
  await user.save()
  res.status(200).json({
    message: `Oh nice! you're all signed up!❤️ Feel free to Signin whenever 😻`
  })
}

exports.signin = (req, res) => {
  // find user based on email
  const { _id, name, email, password } = req.body
  User.findOne({ email }, (err, user) => {
    // handle errors
    if (err || !user) {
      return res.status(401).json({
        error: `🤖 beeeep... i can't seem to find that email in our database. Are you sure you have an account here?`
      })
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: '🤖 beeeep...that password does not compute'
      })
    }
    // generate token with id and secret
    // create user id and create a token with the secret password
    // 🍪🍪🍪
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET) // to generate cookie
    // make sure token persists
    res.cookie('t', token, { expire: new Date() + 9999 })
    // response user, id, name and email, and token, sent to front end
    const { _id, name, email } = user
    return res.json({ token, user: { _id, email, name } })
  })
}

exports.signout = (req, res) => {
  res.clearCookie("t")
  return res.json({message: 'see ya later alligator🐊'})
}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: "auth"
  });


