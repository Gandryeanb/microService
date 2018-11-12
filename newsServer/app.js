require('dotenv').config()

const express =  require('express')
const port = process.env.PORT || 3001
const app = express()
const mongoose = require('mongoose')
const db = mongoose.connection
const cors = require('cors')

const newsRoute = require('./Routes/newsRoute')

mongoose.set('useCreateIndex', true)
mongoose.connect(process.env.DB_USER, { useNewUrlParser: true })

app
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({extended: false}))

  .use('/news', newsRoute)
  .use('/', (req, res) => {
    res.status(200).json({
      message: 'Server S2 news active'
    })
  })

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log('> DB news connected')
})

app.listen(port, () => {
  console.log(`\n> Server S2 news activated on port ${port}`)
})
