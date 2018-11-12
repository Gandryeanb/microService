const route = require('express').Router()
const newsController = require('../Controllers/newsController')
const { createNews, getAllNews, deleteNews, updateNews } = newsController

route
  .post('/', createNews)
  .get('/', getAllNews)
  .delete('/:id', deleteNews)
  .put('/:id', updateNews)

module.exports = route
