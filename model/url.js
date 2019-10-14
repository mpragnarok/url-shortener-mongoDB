const mongoose = require('mongoose')

// Create Url schema
const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  shortenedUrl: {
    type: String,
    required: true,
    unique: true,
    trim: true
  }
})

// export Url model
module.exports = mongoose.model('Url', urlSchema)