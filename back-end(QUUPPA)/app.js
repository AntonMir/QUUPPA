/**
 * Default packeges.
 */
require('module-alias/register') // alias-path
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const app = express()

/**
 * Routes
 */
const indexRouter = require('@routes/index')
const usersRouter = require('@routes/users')

/**
 * Utils
 */
const sendDataToClient = require('@utils/deviceTagData/sendDataToClient.js')
const normalizePort = require('@utils/server/normalizePort.js')
const onListening = require('@utils/server/serverOnListening.js')
const onError = require('@utils/server/serverOnError.js')
// const WSServer = require('@utils/webSockets/WSServer.js')

/**
 * Config
 */
const config = require('config')
const cors = config.get('WSServer.cors')
const port = config.get('App.port')

/**
 * Get PORT from environment and store in Express.
 */
const PORT = normalizePort(process.env.PORT || port)
app.set('port', PORT)

/**
 * constiables
 */
const interval = 100

/**
 * Views with JADE (not yet required)
 */
// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.status(500).json({ Error: 'error' })
})

/**
 * Create HTTP server.
 */
const server = app.listen(PORT, () => {
    console.log(`Listening to requests on http://localhost:${PORT}`)
})

/**
 * Listen on provided port, on all network interfaces.
 */
server.on('connection', () => {
    // console.log('---', 'Someone joined...')
})
server.on('listening', () => {
    onListening(server)
    // console.log('---', 'Someone listening...')
})
server.on('error', () => {
    onError(error, PORT)
})

/**
 * WebSocket connect settings
 */
const io = require('socket.io')(server, { cors })

/**
 * WebSocket connect init
 * Send tag data to client
 */
io.once('connection', (socket) => {
    console.log('WS: Соединение с клиентом установлено')
    setInterval(() => {
        sendDataToClient(io)
    }, interval)
})
