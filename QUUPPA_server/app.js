require('module-alias/register')
const express = require('express')
const config = require('config')
const chalk = require('chalk')

const app = express()

const PORT = process.env.PORT || config.get('App.port') || 9000
const sendDataToClient = require('@utils/deviceTagData/sendDataToClient.js')
// const cors = config.get('WSServer.cors')
const interval = 100

// server init
const server = app.listen(PORT, () => {
    console.log(chalk.magenta(`>>> QUUPPA server listen http://localhost:${PORT}`))
})

// web sockets wrapped server
const io = require('socket.io')(server, { cors: config.get('WSServer.cors') })

// send device position after connet with client
io.once('connection', (socket) => {
    console.log(chalk.blue('>> WS: Соединение с клиентом установлено'))
    setInterval(() => {
        sendDataToClient(io)
    }, interval)
})
