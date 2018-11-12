const endPointUser = require('../EndPointList/user')
const requestSender = require('../helpers/requestSender')
const { login, register } = endPointUser

class UserController {

  static login (req, res) {

    let { email, password } = req.body

    requestSender(login, 'post', { email, password })
      .then(({ data : { token }}) => {
        res.status(200).json({
          token: token
        })
      })

      .catch((err) => {
        res.status(500).json({
          message : err.response.data.message
        })
      })
  }

  static register (req, res) {

    let { fname, lname, email, password } = req.body

    requestSender(register, 'post', { fname, lname, email, password })
      .then(({ data : { message }}) => {
        res.status(201).json({
          message
        })
      })
      .catch((err) => {
        res.status(500).json({
          message : err.response.data.message
        })
      })

  }
}

module.exports = UserController
