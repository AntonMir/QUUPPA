var http = require('http')
const config = require('config')
const tagDataUrl = config.get('Device.tag.tagDataUrl')

/**
 * get obj from TomCat
 */
function getDataFromSensor() {
    return new Promise((resolve) => {
        http.get(tagDataUrl, (resp) => {
            let data = ''
            resp.on('data', (chunk) => {
                data += chunk
            })
            resp.on('end', () => {
                data = JSON.parse(data)
                resolve(data)
            })
        })
    })
}

module.exports = getDataFromSensor
