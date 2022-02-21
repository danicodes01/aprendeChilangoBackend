const express = require('express')
const { userById, allUsers, getUser, updateUser, deleteUser } = require('../controllers/user')
const {requireSignin} = require("../controllers/auth")

const router = express.Router()

router.get('/users', allUsers)
router.get('/user/:userId', requireSignin, getUser)
router.put('/user/:userId', requireSignin, updateUser)
router.delete('/user/:userId', requireSignin, deleteUser)

router.param('userId', userById)

module.exports = router

// const express = require('express')
// const { userById, allUsers, getUser, updateUser, deleteUser } = require('../controllers/user')
// const { requireSignin } = require('../controllers/auth')


// const router = express.Router()

// //gives logic to controller to handle 
// router.get('/users', allUsers)
// router.get('/user/:userId', requireSignin, getUser)
// router.put('/user/:userId', requireSignin, updateUser) // put changes entire object
// router.delete('/user/:userId', requireSignin, deleteUser) 

// // if route contains :userId will execute userById method
// router.param('userId', userById)

// module.exports = router
