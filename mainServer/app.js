require('dotenv').config()

const express =  require('express')
const port = process.env.PORT || 3010
const app = express()
const cors = require('cors')

const userRoute = require('./Routes/userRoute')
const newsRoute = require('./Routes/newsRouter')

app
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({extended: false}))

  .use('/users', userRoute)
  .use('/news', newsRoute)
  .use('/', (req, res) => {
    res.status(200).json({
      message: 'Server S0 Main active'
    })
  })

app.listen(port, () => {
  console.log(`\n> Server S0 Main activated on port ${port}`)
})
