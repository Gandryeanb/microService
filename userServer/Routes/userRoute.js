const route = require('express').Router()
const userController = require('../Controllers/UserController')
const { register, login } = userController

route
  .post('/register', register)
  .post('/login', login)

module.exports = route
