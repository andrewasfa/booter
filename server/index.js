
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const handlebars = require('handlebars');
var exphbs = require('express-handlebars');
const util = require('util');
//const fs = require('fs-e'xtra);

//var fs = require('fs');
//var https = require('https');

//var options = {
//  key: fs.readFileSync('./file.pem'),
//  cert: fs.readFileSync('./file.crt')
//};

app.engine('hbs', exphbs({extname: '.hbs'}));
app.set('view engine', 'hbs');

var serverPort = 3005;

var clientsArray = [];
//var server = https.createServer(options, app);
//var io = require('socket.io')(server);


app.get('/', function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.get('/clients', function(req, res){
  var clientIds = [];
  for (i=0; i<clientsArray.length; i++){  //populate a new array of objects
    var hash =  clientsArray[i].id;
    var name = clientsArray[i].handshake.query["nickname"]|| "unnamed";
    clientIds.push({ hash: hash, name: name });
  }
  res.json(clientIds);
});


io.on('connection', function(socket){
  var nickname = socket.handshake.query["nickname"];
  console.log('a user connected '+socket.id + " " + nickname );
  clientsArray.push(socket);
  socket.on('chat message', function(msg){
    console.log("message: "+msg);
    io.emit('chat message', msg);
  });
  socket.on('disconnect', function(){
    var i = clientsArray.indexOf(socket);
    clientsArray.splice(i, 1);
    console.log('user disconnected');
  });
});

/*
server.listen(serverPort, function() {
  console.log('server up and running at %s port', serverPort);
});
*/

http.listen(serverPort, function(){
  console.log('listening on %s', serverPort);
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
