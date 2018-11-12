const mongoose = require('mongoose')
const Schema = mongoose.Schema

const newsSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  tag: [{
    type: Schema.Types.ObjectId,
    ref: 'Tag' 
  }],
  like: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  dislike: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})

const News = mongoose.model('News', newsSchema)

module.exports = News
