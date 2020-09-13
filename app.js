var express = require('express');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/index.html');
});

app.use("/js",express.static(__dirname+"/client/js"));
app.use("/css",express.static(__dirname+"/client/css"));
app.use("/resources",express.static(__dirname+"/client/resources"));
app.use("/client",express.static(__dirname+"/client"));


http.listen(3000, () => {
    console.log('listening on *:3000');
  });

io.on('connection', (socket) => {
  console.log('a user connected');



});



