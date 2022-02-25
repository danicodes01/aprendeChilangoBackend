const express = require('express')
const { getPosts, createPost, postsByUser, postById, isPoster, deletePost, updatePost } = require('../controllers/post')
const { requireSignin } = require('../controllers/auth')
const { userById } = require('../controllers/user')
const { createPostValidator } = require('../validator')

const router = express.Router()

router.post('/post/new/:userId', requireSignin, createPost)
router.get('/posts', requireSignin, getPosts, createPostValidator)
router.get('/posts/by/:userId', requireSignin, postsByUser) // may not use in application
router.put('/post/:postId', requireSignin, isPoster, updatePost)
router.delete('/post/:postId', requireSignin, isPoster, deletePost)


 // will execute if route contains :userId
  // will add profile object
 router.param('userId', userById)
 

 router.param('postId', postById)


module.exports = router




// 6201bc41b882141c9ba8a04a



