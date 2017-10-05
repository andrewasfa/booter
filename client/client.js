
/*
  var socket = io();
  $('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });
  socket.on('chat message', function(msg) {
    $('#messages').append($('<li>').text(msg));
    console.log("pif paf");
  });
*/

chrome.storage.sync.get({
  enableme: false,
  serverUrl: "http://localhost:3000"
}, function(items) {
  //document.getElementById('color').value = items.favoriteColor;
  console.log(items.enableme);
  console.log(items.serverUrl);

  if(items.enableme == true){
    var socket = io.connect(items.serverUrl);

    /*
    socket.on("hello",function(msg) {
        if(items.enableme){
        console.log(msg.text);
        chrome.runtime.sendMessage({msg:"socket",text:msg.text},function(response){});

        }
    });
    */

    socket.on('chat message', function(msg) {
      if(items.enableme){
      //$('#messages').append($('<li>').text(msg));
      console.log("sending to redirect, text: ", msg);

      //chrome.runtime.sendMessage({msg:"socket", text:msg.text}, function(response){});
      chrome.runtime.sendMessage({msg:"socket",text: msg});
      //chrome.runtime.sendMessage({msg:"socket",text:msg.text},function(response){});
      //reloadCurrentTab();
      }
    });
  }

});
