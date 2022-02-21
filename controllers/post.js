const Post = require('../models/post')
const formidable = require('formidable')
const fs = require('fs')
const _ = require('lodash')

exports.postById = (req, res, next, id) => {
  Post.findById(id)
  .populate("postedBy", "_id name")
  .exec((err, post) => {
    if(err || !post) {
      return res.status(400).json({
        error: err
      })
    }
    req.post = post
    next()
  })
}

exports.getPosts = (req, res) => {
  //use select to filter what you wnant to get back
  const posts = Post.find()
    .populate('postedBy', '_id name') //
    .select('_id title body')
    .then(posts => {
      res.json({ posts })
      console.log({ posts })
    })
    .catch(err => console.log(err))
}

exports.createPost = (req, res, next) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Image could not be uploaded'
      })
    }
    let post = new Post(fields)

    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    post.postedBy = req.profile

    if (files.photo) {
      post.photo.data = fs.readFileSync(files.photo.path)
      post.photo.contentType = files.photo.type
    }
    post.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err
        })
      }
      res.json(result)
    })
  })
}

// might not use this, just wanted to make it optional for future use 
exports.postsByUser = (req, res) => {
  // go through each post and get the posted by info
  Post.find({ postedBy: req.profile._id })
    .populate('postedBy', '_id name')
    .sort('_created')
    .exec((err, posts) => {
      if (err) {
        return res.status(400).json({
          error: err
        })
      }
      res.json(posts)
    })
}

exports.isPoster = (req, res, next) => {
      let isPoster = req.post && req.auth && req.post.postedBy._id == req.auth._id;
      // console.log('POSTER:', isPoster)
      // console.log('POST:', req.post)
      // console.log('AUTH:', req.auth)
      if(!isPoster) {
          return res.status(403).json({
              error: 'umm excuse me... you are not authorized to do that 🙈'
          })
      }
      next()
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
    let post = req.post;
    console.log('this is the post', req.post)
    post.remove((err, post) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({
            message: '🗑🗑🗑'
        });
    });
};

//   const post = new UserPost(req.body)
//   post.save().then(result => {
//     console.log(post)
//     res.json({
//       post: result
//     })
//   })
// }

// const Post = require('../models/post')
// const formidable = require('formidable')
// const fs = require('fs')
// const _ = require('lodash')

// exports.postById = (req, res, next, id) => {
//     Post.findById(id)
//     .populate('postedBy', '_id name')
//     .exec((err, post) => {
//         if(err || !post) {
//             return res.status(400).json({
//                 error: err
//             })
//         }
//         req.post = post
//         next()
//     })
// }

// exports.getPosts = (req, res) => {
//     //use select to filter what you wnant to get back
//     const posts = Post.find()
//     .populate('postedBy', '_id name')
//     .select('_id title body')
//     .then((posts) => {
//         res.json({ posts })
//         console.log({ posts })
//     })
//     .catch(err => console.log(err))
// }

// //create posts
// exports.createPost = (req, res) => {
//     // use formidable to get incoming form fields
//     let form = new formidable.IncomingForm()
//     // keep file type extension
//     form.keepExtensions = true
//     // parse request

//     form.parse(req, (err, fields, files) => {
//         if (err) {
//             return res.status(400).json({
//                 error: 'Image could not upload'
//             });
//         }
//         console.log(fields)
//         const { phrase, spanish, english, exampleS, categories, tags } = fields;

//         if (!phrase || !phrase.length) {
//             return res.status(400).json({
//                 error: 'title is required'
//             });
//         }

//         if (!spanish || spanish.length < 2) {
//             return res.status(400).json({
//                 error: 'Content is too short'
//             });
//         }

//         if (!english || english.length < 2) {
//             return res.status(400).json({
//                 error: 'Content is too short'
//             });
//         }

//         if (!exampleS || exampleS.length < 2) {
//             return res.status(400).json({
//                 error: 'Content is too short'
//             });
//         }
//         // post will be a new post that contains the fields coming from the request
//         let post = new Post(fields)
//         req.profile.hashed_password = undefined
//         req.profile.salt = undefined
//         post.postedBy = req.profile
//         console.log('profile!!!!!!', req.profile)
//         if(files.photo) {
//             // handle files
//             post.photo.data = fs.readFileSync(files.photo.path)
//             post.photo.contentType = files.photo.type
//         }
//         post.save((err, result) => {
//             if(err) {
//                 return res.status(400).json({
//                     error: err
//                 })
//             }
//             res.json(result) // result is the post \

//         })
//     })

// }

// exports.postsByUser = (req, res) => {
//     // go through each post and get the posted by info
//     Post.find({ postedBy: req.profile._id })
//     .populate('postedBy', '_id name')
//     .sort('_created')
//     .exec((err, posts) => {
//         if(err) {
//             return res.status(400).json({
//                 error: err
//             })
//         }
//         res.json(posts)
//     })
// }

// exports.isPoster = (req, res, next) => {
//     let isPoster = req.post && req.auth && req.post.postedBy._id == req.auth._id;

//     console.log('POSTER:', isPoster)
//     console.log('POST:', req.post)
//     console.log('AUTH:', req.auth)

//     if(!isPoster) {
//         return res.status(403).json({
//             error: 'umm excuse me... you are not authorized to do that 🙈'
//         })
//     }
//     next()
// }

// exports.updatePost = (req, res, next) => {
//     let post = req.post
//     post = _.extend(post, req.body)
//     post.updated = Date.now()
//     post.save(err => {
//         if(err) {
//             return res.status(400).json({
//                 error: err
//             })
//         }
//         res.json(post)
//     })
// }

// exports.deletePost = (req, res) => {
//     let post = req.post;
//     console.log('this is the post', req.post)
//     post.remove((err, post) => {
//         if (err) {
//             return res.status(400).json({
//                 error: err
//             });
//         }
//         res.json({
//             message: '🗑🗑🗑'
//         });
//     });
// };

// exports.createPost = (req, res) => {
//     const post = new Post(req.body)
//     // console.log('creating post', req.body)
//     // post.save((err, result) => {
//     //     if(err) {
//     //         return res.status(400).json({
//     //             error: err
//     //         })
//     //     }
//     //     res.status(200).json({
//     //         post: result
//     //     })
//     // })

//     post.save().then(result => {
//         res.status(200).json({
//             post: result
//         })
//     })
// }
