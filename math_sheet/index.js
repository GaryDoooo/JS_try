'use strict';

const socket = require('socket.io'), // socket for serving the chat service
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
    const PORT = process.env.PORT || 8080;
    server.listen(PORT, () => {
        console.log(`App listening on port ${PORT}`);
        console.log('Press Ctrl+C to quit.');
    });
}

try_js_py();

server_io.on('connection', function(socket) {
    console.log(`made socket connection ${socket.id}`, socket.id);

    socket.on('gen', function(
        problem_num, first_num_min, first_num_max,
        second_num_min, second_num_max, result_max,
        operator,
        cb_function) {
        try {
            var ps = require('python-shell');
            var options = {
                args: [
                    problem_num, first_num_min, first_num_max, second_num_min,
                    second_num_max, result_max, operator,
                ]
            }
            ps.PythonShell.run('./js_interface.py', options, function(err, results) {
                if (err){
                    console.log(err);
                cb_function({ 'done': err });}
                else {
                    console.log('finished');
                    console.log(results);
                    cb_function({
                        'done': true,
                        'problem_list': results[0],
                        'answer_list': results[1]
                    });
                    // console.log(results['problem_list'])
                }
            });
        } catch (err) {
            cb_function({ "done": err })
        }
    });
}); /// end of io connect

function try_js_py() {
    var ps = require('python-shell');
    var options = {
        args: [
            10, // number of simulations
            2,
            3,
            4,
            5,
            60,
            "a"
        ]
    }
    ps.PythonShell.run('./js_interface.py', options, function(err, results) {
        if (err)
            console.log(err);
        else {
            console.log('finished');
            console.log(results);
            // console.log(results['problem_list'])
        }
    });
}