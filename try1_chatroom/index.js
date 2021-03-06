'use strict';

var express = require("express");
var socket = require('socket.io');
var path = require("path");
var history = []; // chat history
var Badword_Filter = require('bad-words'),
  word_filter = new Badword_Filter();
// app setup
var app = express();
// var server = app.listen(4000, function() {
//   console.log("listen at port 4000");
// });
var server = require('http').Server(app);

// app stactic entry point

// app.use(express.static('public'));
// app.set('views', __dirname + '/public');
app.set('view engine', 'html');

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/'));
});

app.use(express.static(path.join(__dirname, 'public')));

//
// app.get('/', function(req, res){
//     res.render('home');
// });

if (module === require.main) {
  const PORT = process.env.PORT || 8080;
  server.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
  });
}

// Socket setup
var io = socket(server);

io.on('connection', function(socket) {
  console.log(`made socket connection ${socket.id}`, socket.id);
  // send back existing history
  socket.emit('history', read_history(50));

  socket.on('chat', function(data) {

    var new_message_string = '<p><strong>' +
      word_filter.clean(data.myname) + ': </strong>' +
      word_filter.clean(data.message) + ' <font color="grey"><small>(' +
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
  var usaTime = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York"
  });
  var currentdate = new Date(usaTime);
  var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  return currentdate.getDate() + "/" +
    month[currentdate.getMonth()] + "/" +
    currentdate.getFullYear() + "@" +
    currentdate.getHours() + ":" +
    currentdate.getMinutes() + "ET";
  // currentdate.getSeconds();
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
  var sub_history;
  console.log("read history", "start_index=", start_index, "length", history.length);
  sub_history = history.slice(start_index, history.length);
  //console.log(sub_history.toString());
  return sub_history.join("");
}
