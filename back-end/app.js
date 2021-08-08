/**
 * Required packeges
 */
const express = require('express')
const http = require('http');
require('module-alias/register'); // алиасы
// const fs = require('fs')
// const path = require('path')

/** 
 * App variables
 */
const app = express()
const PORT = process.env.PORT || 5000
const interval = 100;

/**
 * App Configuration
 */
app.use(express.json())

/**
 * Server init
 */
const server = app.listen(PORT, () => {
    console.log(`Listening to requests on http://localhost:${PORT}`);
})

/**
 * WebSocket connect settings
 */
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    }
});

/**
 * WebSocket connect init
 * Send data to client
 */
io.once('connection', (socket) => {
    console.log('WS: Клиент подключился')
    setInterval(sendDevicePosition, interval);
})

/**
 * get obj from TomCat
 */
function getDevicesPosition() {
    return new Promise((resolve) => {
        http.get('http:/ips.itelma.su:8080/qpe/getTagData?format=defaultLocation&humanReadable=true&maxAge=5000', (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () => {
                data = JSON.parse(data);
                try {
                    resolve(data.tags.length > 0 ? data : [])
                } catch (error) {
                    console.log('---', 'back-end:', error);
                }
            });
        });
    })
}

function sendDevicePosition() {
    getDevicesPosition().then(data => {
        io.emit('transferTagData', data);
    })
}