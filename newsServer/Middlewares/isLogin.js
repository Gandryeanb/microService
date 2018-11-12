const JWT = require('jsonwebtoken')

const isLogin = (req, res, next) => {
  let token = req.headers.token

  if (token) {

    let decoded = JWT.verify(token, process.env.SECRET_TOKEN)

    if (decoded) {
      req.decoded = decoded

      next()
    } else {
      res.status(403).json({
        message: 'you need to login first'  
      })
    }
  } else {
    res.status(403).json({
      message: 'you need to login first'
    })
  }

}

module.exports = isLogin
