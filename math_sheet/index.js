'use strict';

const socket = require('socket.io'), // socket for serving the chat service
    express = require("express"),
    path = require("path"),
    app = express(),
    server = require('http').Server(app),
    server_io = socket(server), // the io for chat server

    /////// set the http listen and httpd working directory
    app.set('view engine', 'html')
    .get('/', function(req, res) {
        res.sendFile(path.join(__dirname + '/public/'));
    })
    .use(express.static(path.join(__dirname, 'public')));
if (module === require.main) {
    const PORT = process.env.PORT || 8080;
    server.listen(PORT, () => {
        console.log(`App listening on port ${PORT}`);
        console.log('Press Ctrl+C to quit.');
    });
}

server_io.on('connection', function(socket) {
    console.log(`made socket connection ${socket.id}`, socket.id);

    socket.on('time_out_check', function(key, cb_function) {
        try {
            keychain[found_key(key)].timer = 0;
            cb_function("alive");
        } catch (err) {
            //cb_function(err);
            //console.log("got timeout check with UNfound key", key);
        }
    });

}); /// end of io connect