const Chilango = require('../models/chilango')
const _ = require('lodash')

exports.postById = (req, res, next, id) => {
  Chilango.findById(id)
    .exec((err, post) => {
      if (err || !post) {
        return res.status(400).json({
          error: err
        })
      }
      req.post = post
      next()
    })
}

exports.getPosts = (req, res) => {
  const posts = Chilango.find()
    .select('_id phrase spanish english exampleS exampleSb exampleE exampleEb')
    .then(posts => {
      res.json(posts)
    })
    .catch(err => console.log(err))
}

exports.createPost = (req, res) => {
  const post = new Chilango(req.body)
  post.save().then(result => {
    res.json({
      post: result
    })
  })
}

exports.updatePost = (req, res, next) => {
    let post = req.post
    post = _.extend(post, req.body)
    post.updated = Date.now()
    post.save(err => {
        if(err) {
            return res.status(400).json({
                error: err
            })
        }
        res.json(post)
    })
}

exports.deletePost = (req, res) => {
  let post = req.post
  console.log('this is the post', req.post)
  post.remove((err, post) => {
    if (err) {
      return res.status(400).json({
        error: err
      })
    }
    res.json({
      message: '🗑🗑🗑'
    })
  })
}
