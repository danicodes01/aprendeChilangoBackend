const express = require('express')
const {getPosts, createPost, postById, updatePost, deletePost} = require('../controllers/chilango')
const { requireSignin } = require('../controllers/auth')
const { userById } = require('../controllers/user')
const { chilangoPostValidator } = require('../validator')


const router = express.Router()

router.get('/chilango', getPosts)
router.post('/chilango', requireSignin, chilangoPostValidator, createPost)
router.put('/chilango/:postId', updatePost)
router.delete('/chilango/:postId', deletePost)


 // will execute if route contains :userId
  // will add profile object
 router.param('userId', userById)

 router.param('postId', postById)


module.exports = router