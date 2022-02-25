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
