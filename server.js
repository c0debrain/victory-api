// Dependencies
const express = require('express')
const http = require('http')
const socket = require('socket.io')
const chalk = require('chalk')

// Environment variables
const env = require('node-env-file')

env(`${__dirname}/.environment/.public.env`)
env(`${__dirname}/.environment/.private.env`)

// Instantiation
const configuration = require('./configuration')
const database = require('./database').connect()

const app = express()
const server = http.createServer(app)
const io = socket.listen(server)

// Bootstrapping
configuration.classes()
configuration.middleware(app, database)
configuration.sockets(io, database)
configuration.routes(app)

// Execute server
server.listen(process.env.NODE_PORT, '127.0.0.1', () => {
    console.log(chalk.green('Listening:'), `                on port ${process.env.NODE_PORT}.`)
}).on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.log(chalk.red(`Port ${process.env.NODE_PORT} is in use. Is the server already running?`))
    }
})

module.exports = server
