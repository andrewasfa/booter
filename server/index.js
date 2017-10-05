
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + "/index.html");
});


io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('chat message', function(msg){
    //console.log("message: "+msg);
    io.emit('chat message', msg);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3005, function(){
  console.log('listening on *:3005');
});

/*
var app = require('http').createServer(handler).listen(1337);
var io = require('socket.io').listen(app);


function handler(req,res){
    console.log(req.url);
    res.writeHead(200, {'Content-Type':'text/plain'});
    res.end('Hello Node\n You are really really awesome!');
}

io.sockets.on('connection',function(socket){
    socket.emit('hello',{text:"node!"});
});
*/
