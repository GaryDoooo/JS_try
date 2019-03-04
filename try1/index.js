var express = require("express");
var socket = require('socket.io');
var history = []; // chat history

// app setup
var app = express();
var server = app.listen(4000, function() {
  console.log("listen at port 4000");
});

// app stactic entry point

app.use(express.static('public'));

// Socket setup
var io = socket(server);

io.on('connection', function(socket) {
  console.log(`made socket connection ${socket.id}`, socket.id);
  // send back existing history
  socket.emit('history', read_history(50));

  socket.on('chat', function(data) {

    new_message_string = '<p><strong>' + data.myname + ': </strong>' +
      data.message + ' <font color="grey"><small>(' +
      date_time_string() + ')</small></font></p>';

    io.sockets.emit('chat', new_message_string);
    add_history(new_message_string);
    //console.log(new_message_string);
  });

  socket.on('typing', function(name_value) {
    socket.broadcast.emit('typing', name_value);
  });

});

// Generate current datetime string
var date_time_string = function() {
  var currentdate = new Date();
  var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  return currentdate.getDate() + "/" +
    month[currentdate.getMonth()] + "/" +
    currentdate.getFullYear() + " @ " +
    currentdate.getHours() + ":" +
    currentdate.getMinutes() + ":" +
    currentdate.getSeconds();
};

// chat history handling
function add_history(new_string) {
  if (history.length > 100) {
    history.shift();
  }
  history.push(new_string);
  //console.log(history.toString());
}

function read_history(num_of_lines) {
  var start_index = Math.max(history.length - num_of_lines, 0);
  console.log("read history", "start_index=", start_index, "length", history.length);
  sub_history = history.slice(start_index, history.length);
  //console.log(sub_history.toString());
  return sub_history.join("");
}
