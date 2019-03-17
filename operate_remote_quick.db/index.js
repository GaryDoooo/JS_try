'use strict';

const socket = require('socket.io'), // socket for serving the chat service
  //  db_socket = require('socket.io-client')('https://quantum-camp-225421.appspot.com'),
  db_socket = require('socket.io-client')('http://35.185.101.127'),
  //db_socket = require('socket.io-client')('https://secure-ridge-80588.herokuapp.com'),
  // client socket to db server
  prefix = (10e15).toString(36),
  commands = ["set", "add", "all", "push", "get", "delete", "has", "subtract", "startswith"],
  express = require("express"),
  path = require("path"),
  app = express(),
  server = require('http').Server(app),
  server_io = socket(server); // the io for chat server

/////// set the http listen and httpd working directory
app.set('view engine', 'html')
  .get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/'));
  })
  .use(express.static(path.join(__dirname, 'public')));
if (module === require.main) {
  const PORT = process.env.PORT || 8000;
  server.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
  });
}

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

server_io.on('connection', function(socket) {
  console.log(`made socket connection ${socket.id}`, socket.id);

  socket.on('chat', function(cmd, input1, input2, cb_function) {
    if (commands.includes(cmd)) {
      db_api(cmd, input1, input2, function(result) {
        cb_function(result);
      });
    } else if (cmd === "export") {
      db_api("all", "", "", function(result) {
        if (result === false) {
          cb_function("fetch all data failed.");
        } else {
          write_to_json("./import_export_data/" + input1 + ".json",
            result,
            function(write_file_result) {
              cb_function(write_file_result);
            });
        }
      });
    } else if (cmd === "import") {
      read_from_json("./import_export_data/" + input1 + ".json",
        function(result) {
          cb_function(result);
        });
    } else {
      cb_function("Wrong commands.");
    }
  });
});

////// Json file handling
function write_to_json(filename, data, cb_function) {
  var fs = require("fs");
  fs.writeFile(filename, JSON.stringify(data, null, 4), (err) => {
    if (err) {
      console.error(err);
      cb_function(err);
    } else {
      console.log("File has been created.", filename);
      cb_function("File created: " + filename);
    }
  });
}

function read_from_json(filename, cb_function) {
  var fs = require('fs');
  var obj, i;
  // fs.readFile(filename, 'utf8', function(err, data) {
  //   if (err) {
  //     console.error(err);
  //     cb_function(err);
  //   } else {
  try {
    obj = require(filename);
    for (i in obj) {
      db_api("set", obj[i].ID, obj[i].data, function(result) {
        console.log("set:", result);
      });
    }
    cb_function("Imported data from: " + filename);
  } catch (err2) {
    console.error(err2);
    cb_function(err2);
  }
}
// });
// }
// Content of the file -> {"a":1,"b":2,"c":{"x":11,"y":22}}
