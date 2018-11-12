const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

const userSchema = new Schema({
  fname: String,
  lname: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'reguler'
  }
}, {
  timestamps: true
})

userSchema.post('validate', (doc) => {

  let newPassword = bcrypt.hashSync(doc.password, Number(process.env.SECRET_PASSWORD))
  doc.password = newPassword
})

const User = mongoose.model('User', userSchema)

module.exports = User
