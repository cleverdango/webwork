var express = require('express');
var app = express();
var server = require('http').createServer(app);
var SocketIO = require('socket.io');
var io = SocketIO(server);
var port = process.env.PORT || 3000;
var cp = require('child_process');

server.listen(port, function () {
  console.log('Server listening at port %d', port);
  cp.exec(`explorer http://localhost:${port}/`);
});

app.use(express.static(__dirname + '/public'));

io.on("connection", function(socket){
    socket.on('message',function(message){
        console.log(message);
        socket.broadcast.emit('message',message);
    });
});