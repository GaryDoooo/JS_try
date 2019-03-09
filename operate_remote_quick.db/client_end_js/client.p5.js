var feedback_timeout = 0;

var input1 = document.getElementById('message'),
  input2 = document.getElementById('message2'),
  output = document.getElementById('output'),
  send = document.getElementById('send'),
  cmd = document.getElementById('myname'),
  feedback = document.getElementById('feedback'),
  chat_window = document.getElementById('chat-window');

// Emit events
// Detect the click event on send key
send.addEventListener('click', function() {
  //var result;
  db_api(cmd.value,input1.value,input2.value,function(result){
    console.log("client js", result);
    output_result(result);
  });
  // switch (cmd.value) {
  //   case "set":
  //     db_set(input1.value, input2.value, function(result) {
  //       console.log("client js", result);
  //       output_result(result);
  //     });
  //     break;
  //   case "get":
  //     result = db_get(input1.value, function(result) {
  //       output_result(result);
  //     });
  //     break;
  //   default:
  //     feedback_timeout = 0;
  //     feedback.innerHTML = "<p>Unsupported Command...</p>";
  // }
});
// Detect the ENTER key pressed inside the message input box
input1.addEventListener("keypress", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    send.click();
  }
});
// Detect the ENTER key pressed inside the message input box
input2.addEventListener("keypress", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    send.click();
  }
});

cmd.addEventListener("keypress", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    send.click();
  }
});
// General functions
function output_result(result) {
  if (result === false) {
    output.innerHTML += "<p>Command failed. </p>";
  } else {
    output.innerHTML += "<p>" + result.toString() + "</p>";
  }
  scroll_to_bottom(chat_window);
}

function setup() {
  frameRate(10);
}

function scroll_to_bottom(element) {
  element.scrollTop = element.scrollHeight; // Auto scroll to the bottom
}

function draw() {
  // timeout feedback message
  if (++feedback_timeout > 50) {
    feedback.innerHTML = '';
    scroll_to_bottom(chat_window);
    feedback_timeout = 0;
  }
}
