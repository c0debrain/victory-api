// Dependencies
const helmet = require('helmet')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const httpStatus = require('http-status-codes')
const handlers = require('../services/handlers')
const consoleLogger = require('../services/logger/console.logger')
const fileLogger = require('../services/logger/file.logger').accessLogger
const expressJwt = require('express-jwt')
const secret = require('../services/authentication/.secrets').secretKey

module.exports = (app, database) => {
    // For getting IP
    //app.set('trust proxy', 'uniquelocal')
    // Parse the body of requests
    app.use(bodyParser.json())

    // Logging
    if (process.env.NODE_ENV !== 'test') {
        app.use(morgan('dev', {
            stream: { write: message => consoleLogger.info(message) } }
        ))
        app.use(morgan('tiny', {
            stream: { write: message => fileLogger.info(message) } }
        ))
    }

    // Security
    app.use(helmet())

    // Attach IP info to request
    app.use((request, response, next) => {
        request.client_ip_addr = request.ip
        next()
    })

    // Http status codes for request objects
    app.use((request, response, next) => {
        request.status = httpStatus
        next()
    })

    // Database Middleware
    app.use((request, response, next) => {
        request.models = database.models
        request.connection = database.connection
        next()
    })


    // Enable CORS to avoid Cross Domain Origin issues
    app.use((request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*')
        response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
        response.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
        next()
    })

    // Error Handling
    app.use((request, response, next) => {
        response.handlers = handlers
        next()
    })

    app.use((error, request, response, next) => {
        console.error(error.stack)
        console.log("I AM HEREEEEEEEEEEEEEEEEE")
        next()
    })
}
