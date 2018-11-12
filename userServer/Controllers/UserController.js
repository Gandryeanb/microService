const User = require('../Models/user')
const JWT = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

class UserController {

  static login (req, res) {
    
    User.findOne({ email: req.body.email})
      .then(({ _id, email, role, password }) => {
        if (bcrypt.compareSync(req.body.password, password)) {
          let token = JWT.sign({
            id: _id,
            email: email,
            role: role
          }, process.env.SECRET_TOKEN)

          res.status(200).json({
            token
          })  
        } else {
          throw new Error('wrong password or email')
        }
      })
      .catch(({ message }) => {
        res.status(500).json({
          message
        })
      })
  }

  static register (req, res) {

    let newUser = {
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      password: req.body.password,
    }

    let user = new User(newUser)

    user.save()
      .then(({ email }) => {
        res.status(201).json({
          message: `creating new account with email ${email} success`
        })
      })
      .catch(({ message }) => {
        res.status(500).json({
          message
        })
      })

  }

}

module.exports = UserController
