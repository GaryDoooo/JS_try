// Make connection socket

const key = client_random_key_gen(); // get the unique random key for this session
console.log("client key: ",key);

var socket = io();
var feedback_timeout = 0;

var message = document.getElementById('message'),
  output = document.getElementById('output'),
  send = document.getElementById('send'),
  myname = document.getElementById('myname'),
  feedback = document.getElementById('feedback'),
  chat_window = document.getElementById('chat-window');

// Emit events
// Detect the click event on send key
send.addEventListener('click', function() {
  if (message.value === "" | myname.value === ""){
      feedback_timeout=0;
      feedback.innerHTML="<p> Either Name or Message is missing...</p>";
  }else{
  socket.emit('chat', {
    message: message.value,
    myname: myname.value
  });
  message.value = "";
  }
});
// Detect the ENTER key pressed inside the message input box
message.addEventListener("keypress", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    send.click();
  } else {
    socket.emit('typing', myname.value);
  }
});

// listen server data

socket.on('connect',function(){
  console.log("received connection event and send key.");
  socket.emit('sendkey',key);
});

socket.on('history', function(history_html_string) {
  output.innerHTML = history_html_string;
  scroll_to_bottom(chat_window);
});

socket.on('chat', function(message_html_string) {
  feedback.innerHTML = '';
  output.innerHTML += message_html_string;
  scroll_to_bottom(chat_window);
});

socket.on('typing', function(name_value) {
  feedback.innerHTML = '<p>' + name_value + ' is typing...</p>';
  feedback_timeout = 0;
  scroll_to_bottom(chat_window);
});

// General functions
function setup() {
  frameRate(5);
}

function scroll_to_bottom(element) {
  element.scrollTop = element.scrollHeight; // Auto scroll to the bottom
}

function draw() {
  // DRAW function is only called when it's in the front, by each frame
}
////// Timeout connection handling
///// setInterval function runs at the background too.
function intervalFunc() {
  socket.emit("time_out_check",key);
  if (++feedback_timeout > 5) {
    feedback.innerHTML = '';
    scroll_to_bottom(chat_window);
    feedback_timeout = 0;
  }
}

setInterval(intervalFunc, 1000);
