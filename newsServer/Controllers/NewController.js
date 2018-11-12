const News = require('../Models/news')

class NewsController {

  static getAllNews (req, res) {

    News.find() 
      .then(data => {
        res.status(200).json({
          data
        })
      })
      .catch(({ message }) => {
        res.status(500).json({
          message
        })
      })
  }

  static createNews (req, res) {

    let newData = {
      title: req.body.title,
      body: req.body.body,
      userId: req.decoded.id,
      tag: req.body.tag
    }

    let news = new News(newData)

    news.save()
      .then(data => {
        res.status(201).json({
          message: `creating new news success with id ${data.id}`
        })
      })
      .catch(({ message }) => {
        res.status(500).json({
          message
        })
      })
  }

  static deleteNews(req, res) {

    let _id = req.params.id
    let userId = req.decoded.id

    News.deleteOne({_id, userId})
      .then(data => {
        res.status(200).json({
          message: `news with Id ${req.params.id} was succesfully deleted`
        })
      })
      .catch(({ message }) => {
        res.status(500).json({
          message: message
        })
      })  
  }

  static updateNews(req, res) {
    
    let _id = req.params.id
    let userId = req.decoded.id
    let updatedData = {
      title: req.body.title,
      body: req.body.body
    }

    News.updateOne({ _id, userId }, updatedData)
      .then(data => {
        res.status(200).json({
          message: `news with id: ${_id} successfuly updated`
        })
      })
      .catch(({message}) => {
        res.status(500).json({
          message
        })
      })
  }
}

module.exports = NewsController
