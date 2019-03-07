'use strict';

var express = require("express"),
  socket = require('socket.io'),
  path = require("path"),
  app = express(),
  server = require('http').Server(app),
  prefix = (10e15).toString(36),
  io = socket(server); // Socket setup

const db = require('quick.db');

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
  // .add(key, number, [options]) -> updatedRow
  // .all() -> array
  // .delete(key, [options]) -> boolean
  // .get(key, [options]) -> row
  // .has(key, [options]) -> boolean
  // .push(key, element, [options]) -> updatedRow
  // .set(key, data, [options]) -> updatedRow
  // .subtract(key, number, [options]) -> updatedRow
  // .startsWith(str, [options]) -> array

  socket.on(prefix + "set", function(key, data, cb_function) {
    try {
      // db.set(key, data);
      cb_function(db.set(key, data));
      console.log("set", key, data);
    } catch (err) {
      cb_function(err.message);
    }
  });

  socket.on(prefix + "all", function(key, data, cb_function) {
    // db.set(key, data);
    try {
      cb_function(db.all());
      console.log("sending ALL array");
    } catch (err) {
      cb_function(err.message);
    }
  });

  socket.on(prefix + "has", function(key, data, cb_function) {
    // db.set(key, data);
    try {
      cb_function(db.has(key));
      console.log("has cmd:", key, data);
    } catch (err) {
      cb_function(err.message);
    }
  });

  socket.on(prefix + "startswith", function(key, data, cb_function) {
    try {
      // db.set(key, data);
      cb_function(db.startsWith(key, data));
      console.log("startwith", key, data);
    } catch (err) {
      cb_function(err.message);
    }
  });

  socket.on(prefix + "get", function(key, data, cb_function) {
    try {
      if (db.has(key)) {
        cb_function(db.get(key));
        console.log("get", key);
      } else {
        cb_function(false);
        console.log("Not Found:", key);
      }
    } catch (err) {
      cb_function(err.message);
    }
  });

  socket.on(prefix + "push", function(key, data, cb_function) {
    try {
      if (db.has(key)) {
        var value = db.get(key);
        if (Array.isArray(value)) {
          cb_function(db.push(key, data));
          console.log("push to array", key, data);
        } else {
          cb_function(db.set(key, [value, data]));
          console.log(key, "is not array, combined with", data, "made new array.");
        }
      } else {
        cb_function(db.set(key, data));
        console.log("Not Found:", key, "use set instead of push data", data);
      }
    } catch (err) {
      cb_function(err.message);
    }
  });

  socket.on(prefix + "add", function(key, number, cb_function) {
    try {
      if (db.has(key)) {
        cb_function(db.set(key,
          +number_by_all_means(db.get(key)) + +number_by_all_means(number)
        ));
        // if (isNaN(number)) {} else {
        //   cb_function(db.add(key, Number(number)));
        //   cb_function(db.add(key, number));
        // }
        console.log("add", key, number);
      } else {
        cb_function(false);
        console.log("Not Found:", key);
      }
    } catch (err) {
      cb_function(err.message);
    }
  });

  socket.on(prefix + "subtract", function(key, number, cb_function) {
    try {
      if (db.has(key)) {
        cb_function(db.set(key,
          +number_by_all_means(db.get(key)) - +number_by_all_means(number)
        ));
        console.log("add", key, number);
      } else {
        cb_function(false);
        console.log("Not Found:", key);
      }
    } catch (err) {
      cb_function(err.message);
    }
  });

  socket.on(prefix + "delete", function(key, number, cb_function) {
    try {
      if (db.has(key)) {
        cb_function(db.delete(key));
        console.log("delete", key);
      } else {
        cb_function(false);
        console.log("Not Found:", key);
      }
    } catch (err) {
      cb_function(err.message);
    }
  });

});

// General function
function number_by_all_means(number) {
  //   try {
  //     console.log("input is number:",isNaN(number));
  //     return number + 0;
  //   } catch (err) {
  //     console.log("input", number, " is not a number.");
  //     try {
  //       return Number(number) + 0;
  //     } catch (err) {
  //       console.log("Number() failed.");
  //       try {
  //         return parseFloat(number) + 0;
  //       } catch (err) {
  //         console.log("parseFloat failed.");
  //         return 0;
  //       }
  //     }
  //   }
  //   return 0;
  // }
  var result;
  if (isNaN(number)) {
    try {
      result = Number(number);
      if (!(isNaN(result))) {
        console.log(result, "is a number after Number.");
        return result;
      }
    } catch (err) {
      try {
        result = parseFloat(number);
        if (!(isNaN(result))) {
          console.log(result, "is a number after parseFloat.");
          return result;
        }
      } catch (err) {
        return 0;
      }
    }
  } else {
    console.log(number, "is a number.");
    return number;
  }
}
