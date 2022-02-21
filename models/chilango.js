const mongoose = require('mongoose')

const chilangoSchema = new mongoose.Schema({
  phrase: {
    type: String,
    required: true
  },
  spanish: {
    type: String,
    required: true
  },
  english: {
    type: String,
    required: true
  },
  exampleS: {
    type: String,
    required: true
  },
  exampleSb: {
    type: String,
    required: false
  },
  exampleE: {
    type: String,
    required: false
  },
  exampleEb: {
    type: String,
    required: false
  },
  photo: {
    type: Buffer,
    contentType: String
  }, 
  created: {
    type: Date, 
    default: Date.now
  }
})

module.exports = mongoose.model('Chilango', chilangoSchema)


// // const mongoose = require('mongoose')
// // const { ObjectId } = mongoose.Schema

// // const postSchema = new mongoose.Schema({
// //     title: {
// //         type: String,
// //         required: true
// //     },
// //     body: {
// //         type: String,
// //         required: true
// //     },
// //     photo: {
// //         type: Buffer,
// //         contentType: String
// //     },
// //     postedBy: {
// //         type: ObjectId,
// //         ref: 'User' //ref to the user model
// //     },
// //     created: {
// //         type: Date,
// //         default: Date.now
// //     }

// // })

// // module.exports = mongoose.model('Post', postSchema)



// const mongoose = require('mongoose')
// const { ObjectId } = mongoose.Schema

// const postSchema = new mongoose.Schema({
//   phrase: {
//     type: String,
//     required: true
//   },
//   spanish: {
//     type: String,
//     required: true
//   },
//   english: {
//     type: String,
//     required: true
//   },
//   exampleS: {
//     type: String,
//     required: true
//   },
//   exampleSb: {
//     type: String,
//     required: false
//   },
//   exampleE: {
//     type: String,
//     required: false
//   },
//   exampleEb: {
//     type: String,
//     required: false
//   },
//   photo: {
//     type: Buffer,
//     contentType: String
//   },
//   postedBy: {
//     type: ObjectId,
//     ref: 'User' //ref to the user model
//   },
//   created: {
//     type: Date,
//     default: Date.now
//   }
// })

// module.exports = mongoose.model('Post', postSchema)
