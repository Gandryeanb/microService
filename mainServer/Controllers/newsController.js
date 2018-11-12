const requestSender = require('../helpers/requestSender')
const endPointNews = require('../EndPointList/news')
const RedisController = require('./redisController')

const { getAllNewsUrl, createNewsUrl, deleteNewsUrl, updateNewsUrl } = endPointNews
const { redisGetter, redisSetter, redisGetterAndSetter } = RedisController

class NewsController {

  static getAllNews (req, res) {
    
    let isReallyError = true

    redisGetter('newsAllData')
      .then(data => {
        if (data === null) {
          return requestSender(getAllNewsUrl, 'get')
        } else {
          console.log('data loaded from redis')
          res.status(200).json({
            data: JSON.parse(data)
          })
          isReallyError = false
          throw new Error()
        }
      })
      .then(({ data : { data }})  => {
        res.status(200).json({
          data
        })
        redisSetter('newsAllData', data)
      })
      .catch(err => {
        if (isReallyError) {
          res.status(500).json({
            message: err.response
          })
        }
      })
  }

  static createNews (req, res) {
    
    let { title, body } = req.body
    let { token } = req.headers
    
    requestSender( createNewsUrl, 'post', { title, body }, { token: token })
      .then(({ data : { message }}) => {

        redisGetterAndSetter(getAllNewsUrl, 'newsAllData')

        res.status(201).json({
          message
        })
      })
      .catch(err => {
        res.status(500).json({
          message: err.response.data.message
        })
      })
  }

  static deleteNews(req, res) {

    let { id } = req.params
    let { token } = req.headers

    requestSender(`${ deleteNewsUrl }/${ id }`, 'delete', null, { token: token })
      .then(({ data: { message } }) => {

        redisGetterAndSetter(getAllNewsUrl, 'newsAllData')
        res.status(200).json({
          message
        })
      })
      .catch(err => {
        res,status(500).json({
          message: err.response.data.message
        })
      })
  }

  static updateNews(req, res) {

    let { id } = req.params
    let { token } = req.headers
    let  { title, body } = req.body
    let newData = {
      title,
      body
    }

    requestSender(`${ updateNewsUrl }/${ id }`, 'put', newData, { token: token })
      .then(({ data: { message } }) => {

        redisGetterAndSetter(getAllNewsUrl, 'newsAllData')
        res.status(200).json({
          message
        })
      })
      .catch(err => {
        res,status(500).json({
          message: err.response.data.message
        })
      })

  }

}

module.exports = NewsController
