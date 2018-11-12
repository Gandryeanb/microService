const Promise = require('bluebird')
const client = Promise.promisifyAll(require('redis').createClient())
const requestSender = require('../helpers/requestSender')

class RedisController {

  static redisGetterAndSetter(endPoint, context) {
    console.log(`renewing redis ${context} data`)
    requestSender(endPoint, 'get')
      .then(({ data : { data }})  => {
        RedisController.redisSetter(context, data)
      })
  }

  static redisGetter (context) {
    return client.getAsync(context)
  }

  static redisSetter (context, data) {
    console.log(`saving ${context} data to redis`)
    client.setAsync(context, JSON.stringify(data), 'EX', 10)
    console.log(`newdata ${context} was saved on redis`)
  }

}

module.exports = RedisController
