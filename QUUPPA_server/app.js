require('module-alias/register')
const express = require('express')
const config = require('config')

const app = express()

const PORT = process.env.PORT || config.get('App.port') || 9000
const sendDataToClient = require('@utils/deviceTagData/sendDataToClient.js')
const interval = 100

// server init
const server = app.listen(PORT, () => {
    console.log(`>>> QUUPPA server listen http://localhost:${PORT}`)
})

// web sockets wrapped server
const io = require('socket.io')(server, config.get('WSServer.cors'))

// send device position after connet with client
io.once('connection', (socket) => {
    console.log('WS: Соединение с клиентом установлено')
    setInterval(() => {
        sendDataToClient(io)
    }, interval)
})
