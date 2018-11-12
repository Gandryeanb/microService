const route = require('express').Router()
const isLogin = require('../Middlewares/isLogin')
const newsController = require('../Controllers/NewController')
const { getAllNews, createNews, deleteNews, updateNews } = newsController

route
  .post('/', isLogin, createNews)
  .get('/', getAllNews)
  .delete('/:id', isLogin, deleteNews)
  .put('/:id', isLogin, updateNews)

module.exports = route
