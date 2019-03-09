// Make connection socket
//const socket = io.connect('https://secure-ridge-80588.herokuapp.com'),
const socket = io.connect('https://quantum-camp-225421.appspot.com'),
//const socket = io.connect('http://127.0.0.1:8080'),
  prefix = (10e15).toString(36),
  commands = ["set", "add", "all", "push", "get", "delete", "has", "subtract", "startswith"];


function db_api(command, input1, input2, cb_function) {
  if (commands.includes(command)) {
    socket.emit(prefix + command, input1, input2,
      function(return_data) { //Set callback function got return from server
        console.log("callback of", command, "result", return_data);
        cb_function(return_data);
      });
  }else {
    cb_function("wrong command.");
  }
}
//
// function db_set(key, data, cb_function) {
//   var return_data = false;
//   socket.emit(prefix + "set", key, data,
//     function(return_data_) { //Set callback function got return from server
//       console.log("callback set result", return_data_);
//       return_data = return_data_;
//       cb_function(return_data);
//     });
// }
//
// function db_get(key, cb_function) {
//   var return_data = false;
//   socket.emit(prefix + "get", key,
//     function(return_data_) { //Set callback function got return from server
//       return_data = return_data_;
//       cb_function(return_data);
//     });
// }
//
// function db_add(key, number, cb_function) {
//   var return_data = false;
//   socket.emit(prefix + "add", key, number,
//     function(return_data_) { //Set callback function got return from server
//       console.log("callback add result", return_data_);
//       return_data = return_data_;
//       cb_function(return_data);
//     });
// }
