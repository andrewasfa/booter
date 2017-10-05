

//TODO:
// - add authentication

chrome.runtime.onMessage.addListener(
    function(request,sender,senderResponse){
        if(request.msg==="socket"){
            console.log("receive from socket server: "+request.text);

            //here we should do a parse method, but for now lets just
            // rely on single
            var str = request.text;
            switch (true) {
              case str.includes("reload"):
                chrome.tabs.query({active: true, currentWindow: true},
                  function (arrayOfTabs)
                {
                  var code = 'window.location.reload();';
                  chrome.tabs.executeScript(arrayOfTabs[0].id, {code: code});
                  //chrome.tabs.reload(arrayOfTabs[0].id);
                });
                break;

              case str.includes("seturl"):
                chrome.tabs.query({active: true, currentWindow: true},
                  function (arrayOfTabs)
                {
                  //var code = 'window.location.redirect();';
                  //chrome.tabs.executeScript(arrayOfTabs[0].id, {code: code});

                  // need to implement checks but for now:
                  var newurl = getWordAt(str, 7);
                  chrome.tabs.update(arrayOfTabs[0].id, {url: newurl});

                  //chrome.tabs.reload(arrayOfTabs[0].id);
                });
                break;
              default:
                console.log("don't know what to do with this yet");
                break;
            }

        }

    }
);


function getWordAt(str, pos) {

    // Perform type conversions.
    str = String(str);
    pos = Number(pos) >>> 0;

    // Search for the word's beginning and end.
    var left = str.slice(0, pos + 1).search(/\S+$/),
        right = str.slice(pos).search(/\s/);

    // The last word in the string is a special case.
    if (right < 0) {
        return str.slice(left);
    }

    // Return the word, using the located bounds to extract it from the string.
    return str.slice(left, right + pos);

}
