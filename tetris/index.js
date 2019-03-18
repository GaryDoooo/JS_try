'use strict';

const socket = require('socket.io'), // socket for serving the chat service
  express = require("express"),
  path = require("path"),
  app = express(),
  server = require('http').Server(app),
  server_io = socket(server); // the io for chat server  // db_entry = "chatroom2";

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

function found_id(id) {
  var i;
  for (i in keychain) {
    if (keychain[i].id === id) {
      return i;
    }
  }
}

function found_name(username) {
  var i;
  for (i in keychain) {
    if (keychain[i].name === username) {
      return i;
    }
  }
  return "not found";
}

function send_to_all(event, message) {
  var i;
  for (i in keychain) {
    keychain[i].socket.emit(event, message);
  }
}

function send_to_others(event, mysocket, message) {
  var i;
  for (i in keychain) {
    if (mysocket.id !== keychain[i].id) {
      keychain[i].socket.emit(event, message);
    }
  }
}

server_io.on('connection', function(socket) {
  console.log(`made socket connection ${socket.id}`, socket.id);
  //////// Login screen handling /////////
  socket.on('sendkey', function(key, username, cb_function) {
    try {
      console.log("got a key: ", key, "username", username);
      if (found_key(key) !== false) {
        console.log("new connect key", key, "already in keychain.", socket.id);
        cb_function("Duped id.");
      } else {
        if (!username) {
          cb_function("no username?");
        } else {
          keychain.push({
            key: key,
            timer: 0,
            name: username,
            id: socket.id,
            socket: socket,
            stage: 0 // stage 0 is in login screen.
          }); // init the new connect Object
          cb_function("success");
          // console.log("login create keychain", keychain);
        }
      }
    } catch (err) {
      console.log("sendkey event error key", key, err);
    }
  });

  //////// Chat screen handling /////////

  socket.on('chat', function(key, message) {
    try {
      var new_message_string = '<p><font size="3" face="Nunito"><strong>' +
        keychain[found_key(key)].name + ': </strong>' +
        word_filter.clean(message) + ' <font color="grey"><small>(' +
        date_time_string() + ')</small></font></font></p>';

      //server_io.sockets.emit
      send_to_all('chat', new_message_string);
      add_history(new_message_string);
    } catch (err) {
      console.log("on chat event", err, "key", key);
    }
  });

  socket.on('typing', function(key) {
    try {
      send_to_others('typing', socket, keychain[found_key(key)].name + " is typing...");
    } catch (err) {
      console.log("on typing event", err, "key", key);
    }
  });

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

////// Timeout connection handling
function intervalFunc() {
  var i;
  for (i in keychain) {
    if (++keychain[i].timer >= 2) { // timer 6x5s=30s timeout connection
      console.log("drop out key:", keychain[i].key);
      send_to_all('typing', keychain[i].name + " dropped out...");
      delete keychain[i];
    }
  }
  ////// emit userlist every 5 sec.
  send_to_all('userlist', userlist_html());
}

setInterval(intervalFunc, 5000);
////// userlist handling
function userlist_html() {
  var result = "<p><strong>Current Users</strong>";
  var i;
  for (i in keychain) {
    result += " / " + keychain[i].name;
  }
  return result + "</p>";
}
