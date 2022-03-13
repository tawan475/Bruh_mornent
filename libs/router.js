const path = require('path')
module.exports = ({ app }) => {
    // get
    app.get('/socket.io.js', (req, res) => {
        return res.sendFile(path.join(app.client.dirname + '/libs/socket.io.js'));
    });
    
    app.get('/socket.io.js.map', (req, res) => {
        return res.sendFile(path.join(app.client.dirname + '/libs/socket.io.js.map'));
    });
    
    app.get(`/mediashare`, (req, res) => {
        return res.renderMin("mediashare");
    });
    
    // io
    app.io.on('connection', (socket) => {
        if (socket.handshake.headers['service'] == 'mediashare'){
            // future use
        }
        // future use
    });
}
