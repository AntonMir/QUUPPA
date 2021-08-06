const http = require('http');

class Tag {
    position = '';

    getPosition() {
        http.get('http:/ips.itelma.su:8080/qpe/getTagData?format=defaultLocation&humanReadable=true&maxAge=5000', (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () => {
                this.position = JSON.parse(data); 
                console.log('---','position: ', position?.tags.length);          
            });
        });
    }
}

module.exports = Tag;

