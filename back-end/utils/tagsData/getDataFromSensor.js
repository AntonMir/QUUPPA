var http = require('http')
const config = require('config')
const getTagDataUrl = config.get('Tag.getTagDataUrl')

/**
 * get obj from TomCat
 */
function getDataFromSensor() {
    return new Promise((resolve) => {
        http.get(getTagDataUrl, (resp) => {
            let data = ''
            resp.on('data', (chunk) => {
                data += chunk
            })
            resp.on('end', () => {
                data = JSON.parse(data)
                try {
                    resolve(data.tags.length > 0 ? data : [])
                } catch (error) {
                    console.log('---', 'back-end:', error)
                }
            })
        })
    })
}

module.exports = getDataFromSensor
