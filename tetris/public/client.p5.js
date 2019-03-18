// Make connection socket

// const key = client_random_key_gen(); // get the unique random key for this session
var stage = localStorage.getItem("stage");
if (stage === "login") {
  localStorage.setItem("stage", "chat");
} else {
  window.location.href = "index.html";
} /////check if it's reload from itself, if so kick back to login screen.

const key = localStorage.getItem("key");
console.log("Got client key: ", key);

var socket = io();
var feedback_timeout = 0;

// var buttonA = document.getElementById('a'),
//   buttonB = document.getElementById('b'),
//   up = document.getElementById('up'),
//   // userlist = document.getElementById('userlist'),
//   feedback = document.getElementById('feedback'),
//   down = document.getElementById('down'),
//   left=document.getElementById('left'),
//   right=document.getElementById('right');


// Emit events
// Detect the click event on send key
// buttonA.addEventListener('click', function() {
//   if (message.value === "") {
//     feedback_timeout = 0;
//     feedback.innerHTML = "<p> Message is missing...</p>";
//   } else {
//     socket.emit('chat', key, message.value);
//     message.value = "";
//   }
// });
// Detect the ENTER key pressed inside the message input box
// message.addEventListener("keypress", function(event) {
//   // Number 13 is the "Enter" key on the keyboard
//   if (event.keyCode === 13) {
//     // Cancel the default action, if needed
//     event.preventDefault();
//     // Trigger the button element with a click
//     send.click();
//   } else {
//     socket.emit('typing', key);
//   }
// });

// listen server data

socket.on('connect', function() {
  console.log("received connection event and send inchat event.");
  socket.emit('inchat', key);
});

socket.on('history', function(history_html_string) {
  // output.innerHTML = history_html_string;
  // scroll_to_bottom(chat_window);
});

socket.on('chat', function(message_html_string) {
  // feedback.innerHTML = '';
  // output.innerHTML += message_html_string;
  // scroll_to_bottom(chat_window);
});

socket.on('typing', function(name_value) {
  // feedback.innerHTML = '<p>' + name_value + '</p>';
  // feedback_timeout = 0;
  // scroll_to_bottom(chat_window);
});

socket.on('userlist', function(userlist_html) {
  // userlist.innerHTML = userlist_html;
});

socket.on('kicked', function() {
  // output.innerHTML = "<p><strong>Same user has logged in from another place." +
  //   " This session dropped. If is not done by yourself, please... " +
  //   "OK there is no way to change your password so far...</stong></p>";
});

// General functions
var x = 100.0;
var y = 100;
var speed = 2.5;
setup = function() {
  createCanvas(600, 400);
};

draw = function() {
  background(100);
  fill(1);
  x += speed;
  if (x > 600) {
    x = 0;
  }
  ellipse(x, y, 50, 50);

};
// };
//
// var canvas = new p5(sketch0, 'output'); //assigning the canvas to d
//

////// Timeout connection handling
///// setInterval function runs at the background too.
function intervalFunc() {
  socket.emit("time_out_check", key, function(result) {
    if (result !== "alive") {
      // feedback.innerHTML = "<p> <strong>Connection lost. Try to refresh your browser.</stong></p>";
    } else {
      connection_timeout = 0;
    }
  });
  // if (++feedback_timeout > 5) {
  //   feedback.innerHTML = '';
  //   //scroll_to_bottom(chat_window);
  //   feedback_timeout = 0;
  // }
  if (++connection_timeout > 30) {
    // feedback.innerHTML = "<p> <strong>Connection lost. Try to refresh your browser.</stong></p>";
  }
}
var connection_timeout = 0;
setInterval(intervalFunc, 1000);
