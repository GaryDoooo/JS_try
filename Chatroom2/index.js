'use strict';

const socket = require('socket.io'), // socket for serving the chat service
  db_socket = require('socket.io-client')('https://quantum-camp-225421.appspot.com'),
  // client socket to db server
  prefix = (10e15).toString(36),
  commands = ["set", "add", "all", "push", "get", "delete", "has", "subtract", "startswith"],
  express = require("express"),
  path = require("path"),
  Badword_Filter = require('bad-words'),
  word_filter = new Badword_Filter(),
  app = express(),
  server = require('http').Server(app),
  server_io = socket(server), // the io for chat server
  db_entry="chatroomdev2";

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
///////// Test the DB has the chatroom entry, if not then create one
db_api("has", db_entry, "", function(result) {
  console.log("check the db_entry with has to db, feedback:", result);
  if (result === false) {
    console.log("no entry existing try to set a new one.");
    db_api("set", db_entry, {
      history: ['<p>BIG BANG</p>']
    }, function(set_result) {
      console.log("set new db_entry entry feedback:", set_result);
    });
  }
});
//////// client interface to talk to DB server
function db_api(command, input1, input2, cb_function) {
  if (commands.includes(command)) {
    db_socket.emit(prefix + command, input1, input2,
      function(return_data) { //Set callback function got return from server
        console.log("callback of", command, "result", return_data);
        cb_function(return_data);
      });
  } else {
    cb_function("wrong command.");
  }
}

///////// server events for chat server
var keychain = [];

function found_key(key) {
  var i;
  for (i in keychain) {
    if (keychain[i].key === key) {
      return i;
    }
  }
  return false;
}

server_io.on('connection', function(socket) {
  console.log(`made socket connection ${socket.id}`, socket.id);

  socket.on('sendkey', function(key) {
    console.log("got a key: ", key);
    if (found_key(key) !== false) {
      console.log("new connect key", key, "already in keychain.", socket.id);
    } else {
      keychain.push({
        key: key,
        timer: 0,
        name: "TBD",
        id:socket.id
      }); // init the new connect Object
      // send back existing history
      read_history(50, function(result) {
        socket.emit('history', result);
        console.log("history sent to new client.", socket.id, "w/key", key);
      });
    }
  });

  socket.on('chat', function(data) {

    var new_message_string = '<p><strong>' +
      word_filter.clean(data.myname) + ': </strong>' +
      word_filter.clean(data.message) + ' <font color="grey"><small>(' +
      date_time_string() + ')</small></font></p>';

    server_io.sockets.emit('chat', new_message_string);
    add_history(new_message_string);
    //console.log(new_message_string);
  });

  socket.on('typing', function(name_value) {
    socket.broadcast.emit('typing', name_value);
  });

  socket.on('time_out_check', function(key) {
    try {
      keychain[found_key(key)].timer = 0;
    } catch (err) {
      console.log("got timerout check with UNfound key", key);
    }
  });
});


//////// Generate current datetime string
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

///////// chat history handling
function add_history(new_string) {
  db_api("push", db_entry+".history", new_string, function(result) {
    console.log("history recorded:", result);
  });
}

function read_history(num_of_lines, cb_function) {
  db_api("get",  db_entry+".history", "", function(history) {
    var start_index = Math.max(history.length - num_of_lines, 0);
    var sub_history;
    console.log("read history", "start_index=", start_index, "length", history.length);
    sub_history = history.slice(start_index, history.length);
    cb_function(sub_history.join(""));
    ////// trim the history if it's too long >100
    if (history.length > 100) {
      db_api("set",  db_entry+".history", sub_history, function(result) {
        console.log("history is > 100, trim it to 50, feedback:", result);
      });
    }
  });
}

////// Timeout connection handling
function intervalFunc() {
  var i;
  for (i in keychain) {
    if (++keychain[i].timer === 60) { // timer 6x5s=30s timeout connection
      console.log("drop out key:", keychain[i].key);
      delete keychain[i];
    }
  }
  //console.log("current keychain", keychain);
}

setInterval(intervalFunc, 5000);
