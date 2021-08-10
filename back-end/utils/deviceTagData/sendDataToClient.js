const getDataFromSensor = require('@utils/deviceTagData/getDataFromSensor.js')
/**
 * send obj to client
 */
function sendDataToClient(io) {
    getDataFromSensor().then((data) => {
        io.emit('transferDevicePosition', data)
    })
}

module.exports = sendDataToClient
