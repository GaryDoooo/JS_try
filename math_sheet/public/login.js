localStorage.setItem("stage", "login");

var socket = io();
var problem_num = document.getElementById('problem_num'),
    first_num_max = document.getElementById('first_num_max'),
    first_num_min = document.getElementById('first_num_min'),
    second_num_max = document.getElementById('second_num_max'),
    second_num_min = document.getElementById('second_num_min'),
    operator = document.getElementById('operator'),
    generate = document.getElementById('generate'),
    result_max = document.getElementById('result_max');

guest.addEventListener('click', function() {
    do {
        var myname = prompt("Hey type your name here: ");
    } while (myname === "" | myname === null);
    go_next("GUEST-" + myname);
});

register.addEventListener('click', function() {
    if (new_userid.value === "" | new_password1.value === "" | new_password2.value === "") {
        alert("Missing username or password... Try again.");
    } else if (new_password1.value !== new_password2.value) {
        alert("The two password inputs are not identical. Try again.");
    } else {
        socket.emit("new_userid", new_userid.value, new_password1.value, function(result) {
            console.log("creat new user feedback", result);
            if (result === "Duped name.") {
                alert("Username existed on the server. Try another name.");
            } else if (result === "success") {
                go_next(new_userid.value);
            } else {
                alert("Something wrong. Got server feedback:", result);
            }
        });
    }
});

login.addEventListener('click', function() {
    if (userid.value === "" | password.value === "") {
        alert("Missing username or password... Try again.");
    } else {
        socket.emit("user_login", userid.value, password.value, function(result) {
            console.log("login feedback", result);
            if (result === "success") {
                go_next(userid.value);
            } else {
                alert("Wrong username or password.");
                console.log("login feedback", result);
            }
        });
    }
});

function go_next(myname) {
    socket.emit('sendkey', key, myname, function(result) {
        console.log("sendkey feedback", result);
        if (result === "success") {
            window.location.href = "chat.html";
        } else {
            alert("Can not talk to server. Please try reloading the page.");
        }
    });
}