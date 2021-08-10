const getDataFromSensor = require('@utils/deviceTagData/getDataFromSensor.js')

// get Promise from <getDataFromSensor> and send to client
function sendDataToClient(io) {
    getDataFromSensor().then((data) => {
        io.emit('transferDevicePosition', data)
    })
}

module.exports = sendDataToClient
