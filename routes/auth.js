const express = require('express')
const { signup, signin, signout } = require('../controllers/auth')
const { userById } = require('../controllers/user')
const { userSignupValidator } = require('../validator')


const router = express.Router()

router.post('/signup', userSignupValidator, signup)
router.post('/signin', signin)
router.get('/signout', signout)

 // will execute if route contains :userId
router.param('userId', userById)

module.exports = router






// const express = require('express')
// const { signup, signin, signout } = require('../controllers/auth')
// const { userById } = require('../controllers/user')
// const { userSignupValidator } = require('../validator')

// const router = express.Router()

// //gives logic to controller to handle
// router.post('/signup', userSignupValidator, signup)
// router.post('/signin', signin)
// router.get('/signout', signout)

// // if route contains :userId will execute userById method
// router.param('userId', userById)

// module.exports = router
