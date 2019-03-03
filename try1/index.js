var express = require("express");
// app setup
var app=express();
var server=app.listen(4000,function(){
	console.log("listen at port 4000");
});

// app stactic entry point

app.use(express.static('public'));
