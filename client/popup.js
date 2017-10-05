
/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback) {
// Query filter to be passed to chrome.tabs.query - see
// https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active:true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
// A tab is a plain object that provides information about the tab.
// See https://developer.chrome.com/extensions/tabs#type-Tab
  var url = tab.url;

  console.assert(typeof url == 'string', 'tab.url should be a string');
  callback(url);
});

// Most methods in Chrome extension API are ASYNC, don't forget that.
}



document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("btnReload").addEventListener("click",
  reloadCurrentTab);
});

function reloadCurrentTab() {
  chrome.tabs.query({active: true, currentWindow: true}, function (arrayOfTabs)
  {
    var code = 'window.location.reload();';
    chrome.tabs.executeScript(arrayOfTabs[0].id, {code: code});
    //chrome.tabs.reload(arrayOfTabs[0].id);

  });
  //alert("boots");
}

/*
chrome.commands.onCommand.addListener(function (command) {
    if (command === "reload") {
        //reloadCurrentTab();
        alert("boots");
    }
});
*/
