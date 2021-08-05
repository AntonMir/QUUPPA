/**
 * Required packeges
 */
const express = require('express')
const http = require('http');
// const fs = require('fs')
// const path = require('path')

/** 
 * App variables
 */
const app = express()
const PORT = process.env.PORT || 5000
let devicePosition = '';
const interval = 1000;

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
		methods: ["GET","POST"],
		credentials: true
	}
});

/**
 * WebSocket connect init
 * Send data to client
 */
io.once('connection', (socket) => {
    console.log('WS: Клиент подключился')
    let count = 0;
    setInterval(sendDevicePosition, interval);
})

/**
 * get obj from TomCat
 */
function getDevicesPosition(){
    http.get('http:/ips.itelma.su:8080/qpe/getTagData?format=defaultLocation&humanReadable=true&maxAge=5000', (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            devicePosition = JSON.parse(data); 
            console.log('---','Devices: ', devicePosition?.tags.length);          
        });
    });
}

function sendDevicePosition() {
    getDevicesPosition()
    io.emit('transferTagData', devicePosition)
}






   
// app.post('/image', (req, res) => {
//     try {
//         const data = req.body.img.replace(`data:image/png;base64,`, '')
//         fs.writeFileSync(path.resolve(__dirname, 'files', `${req.query.id}.jpg`), data, 'base64')
//         return res.status(200).json({message: "Загружено"})
//     } catch (e) {
//         console.log(e)
//         return res.status(500).json('error')
//     }
// })
// app.get('/image', (req, res) => {
//     try {
//         const file = fs.readFileSync(path.resolve(__dirname, 'files', `${req.query.id}.jpg`))
//         const data = `data:image/png;base64,` + file.toString('base64')
//         res.json(data)
//     } catch (e) {
//         console.log(e)
//         return res.status(500).json('error')
//     }
// })
