var express = require('express');
var app = express();
var http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 7000;

let onlineUsers = 0;

app.get('/' , function(req, res){
    res.sendFile(__dirname+'/index.html');
});

io.on('connection',function(socket){

    onlineUsers++;
    io.emit('updateUsers', onlineUsers);

    socket.on('disconnect', () => {
        onlineUsers--;
        io.emit('updateUsers', onlineUsers);
    });

    socket.on('message',function(msg){
        console.log('message: ' + msg);
        io.emit('message', msg);
    });
});

http.listen(PORT, function(){
    console.log('server listening. Port:' + PORT);
});
