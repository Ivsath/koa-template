const Koa = require('koa')
const bodyParser = require('koa-bodyparser')()
const cors = require('@koa/cors')()
const helmet = require('koa-helmet')()
const logger = require('koa-logger')()

const errorHandler = require('./middleware/error.middleware')
const applyApiMiddleware = require('./api')
const { isDevelopment } = require('./config')

const server = new Koa()

if (isDevelopment) {
  server.use(logger)
}

server.use(errorHandler).use(helmet).use(cors).use(bodyParser)

/**
 * Apply to our server the api router
 */
applyApiMiddleware(server)

module.exports = server
