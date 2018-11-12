const axios = require('axios')

const requestSender = ( url, method, data, headers = {} ) => {
  return axios({
    url,
    method,
    data,
    headers
  })
}

module.exports = requestSender
