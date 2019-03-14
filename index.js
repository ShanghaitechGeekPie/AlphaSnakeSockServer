var express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'), {path: '/websocket'});

app.get('/websocket', function(req, res){
  res.sendfile('index.html');
});
app.get('/websocket/monitor', function(req, res){
  res.sendfile('monitor.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('reset', function(){
    console.log('reset');
    io.emit('reset');
  });
  socket.on('init', function(msg){
    console.log('init: ' + msg);
    io.emit('init', msg);
  });
  socket.on('judged', function(msg){
    console.log('judged: ' + msg);
    io.emit('judged', msg);
  });
});

var port = process.env.PORT || 3000;

http.listen(port, function(){
  console.log('listening on *:',port);
});
