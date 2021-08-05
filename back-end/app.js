/**
 * Required packeges
 */
 const express = require('express')
 const app = express()
 const WSServer = require('express-ws')(app)
 const http = require('http');
 const cors = require('cors')
 const fs = require('fs')
 const path = require('path')
  
 
 /** 
  * App variables
  */
 const PORT = process.env.PORT || 5000
 let devicePosition = '';
 const interval = 1000;
 
 
 /**
  * App Configuration
  */
 app.use(cors())
 app.use(express.json())
 
 
 /**
  * Server init
  */
  const server = app.listen(PORT, () => {
     console.log(`Listening to requests on http://localhost:${PORT}`);
 })
 
 app.ws('/', (ws, req) => {
     console.log('---', 'ПОДКЛЮЧЕНИЕ УСТАНОВЛЕНО');
 })
 
 
 // app.ws('/', (ws, req) => {
 //     ws.on('message', (msg) => {
 //         msg = JSON.parse(msg)
 //         switch (msg.method) {
 //             case "connection":
 //                 connectionHandler(ws, msg)
 //                 break
 //             case "draw":
 //                 broadcastConnection(ws, msg)
 //                 break
 //         }
 //     })
 // })
 
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
 
 
 /**
  * get obj from TomCat
  */
 function getDevicesPosition(){
     http.get('http:/ips.itelma.su:8080/qpe/getTagData?format=defaultLocation&humanReadable=true&maxAge=5000', (resp) => {
         let data = '';
         
         // A chunk of data has been received.
         resp.on('data', (chunk) => {
             data += chunk;
         });
         
         // The whole response has been received. Print out the result.
         resp.on('end', () => {
             devicePosition = JSON.parse(data);
             let tagPos = 0;
             console.log('_______________________________________')
             devicePosition.tags.map(tag => {
                 console.log(
                     'TAG:', tagPos++,
                     '| x = ', tag.location[0],
                     '| y = ', tag.location[1],
                     '| z = ', tag.location[2]
                 )
             })
         });
     });
 }
 
 setInterval(getDevicesPosition, interval);