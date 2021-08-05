import React from 'react'
import { io } from "socket.io-client"
/**
 * new WebSocket conntect to server on localhost:5000
 */
let socket = io.connect("http://localhost:5000");

socket.on("connect", () => {
    console.log('---','FRONT_END: Соединение успешно установлено'); 
})

 // socket.emit('ggg', 'client data')
    // socket.on('tagLocation', (tagLocation) => {
    //     console.log('---','tagLocation', tagLocation);
    // })

socket.on('transferTagData', (data) => {
    try {
        let tagLocation = data;
        let tagPos = 0;
        tagLocation?.tags.map(tag => {
            console.log(
                'TAG:', tagPos++,
                '| x = ', tag.location[0],
                '| y = ', tag.location[1],
                '| z = ', tag.location[2]
            )
        })
    } catch(error) {
        console.log('Error: ', error)
    }
      

})






function App() {
    return (
        <div className="App">
            {/* <Map /> */}
        </div>
    );
}

export default App;
