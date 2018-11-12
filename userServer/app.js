require('dotenv').config()

const express =  require('express')
const port = process.env.PORT || 3000
const app = express()
const mongoose = require('mongoose')
const db = mongoose.connection
const cors = require('cors')

const userRoute = require('./Routes/userRoute')

mongoose.set('useCreateIndex', true)
mongoose.connect(process.env.DB_USER, { useNewUrlParser: true })

app
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({extended: false}))

  .use('/users', userRoute)
  .use('/', (req, res) => {
    res.status(200).json({
      message: 'Server S1 user active'
    })
  })

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log('> DB user connected')
})

app.listen(port, () => {
  console.log(`\n> Server S1 user activated on port ${port}`)
})
