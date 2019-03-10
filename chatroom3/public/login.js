const key = client_random_key_gen(); // get the unique random key for this session
console.log("Generate client key: ", key);

localStorage.setItem("key", key);
localStorage.setItem("stage", "login");

var myname; // = prompt("Hey type your name here: ");

var socket = io();




function go_next() {
  socket.emit('sendkey', key, myname, function(result) {
    if (result === "success") {
      window.location.href = "chat.html";
    } else {
      alert("Can not talk to server. Please try reloading the page.");
    }
  });
}
