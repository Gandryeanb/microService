const route = require('express').Router()
const userController = require('../Controllers/userController')
const { login, register } = userController

route
  .post('/login', login)
  .post('/register', register)

module.exports = route
