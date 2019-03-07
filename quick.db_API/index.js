'use strict';

var express = require("express"),
  socket = require('socket.io'),
  path = require("path"),
  app = express(),
  server = require('http').Server(app),
  prefix=(10e15).toString(36),
  io = socket(server); // Socket setup

// app stactic entry point
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

io.on('connection', function(socket) {
  console.log(`made socket connection ${socket.id}`, socket.id);
  // send back existing history
  // socket.emit('history', read_history(50));

  // socket.on('chat', function(data) {
  // //console.log(new_message_string);
  // });

});
