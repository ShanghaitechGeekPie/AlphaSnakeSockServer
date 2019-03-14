var express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const EMIT_KEY = process.env.EMIT_KEY;

app.use('/websocket', express.static('public'));

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
    console.log('init: ' + JSON.stringify(msg));
    if(msg.hasOwnProperty('key') && msg.key == EMIT_KEY){
      delete msg.key;
      io.emit('init', msg);
    }
  });
  socket.on('judged', function(msg){
    console.log('judged: ' + JSON.stringify(msg));
    if(msg.hasOwnProperty('key') && msg.key == EMIT_KEY){
      delete msg.key;
      io.emit('judged', msg);
    }
  });
});

var port = process.env.PORT || 3000;

http.listen(port, function(){
  console.log('listening on *:',port);
});
