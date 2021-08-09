var debug = require('debug')('back-end:server')
/**
 * Event listener for HTTP server "listening" event.
 */
function onListening(server) {
    var addr = server.address()
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
    // console.log('---', 'addr', addr)
    // console.log('---', 'bind', bind)
    debug('Listening on ' + bind)
}

module.exports = onListening
