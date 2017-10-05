// Saves options to chrome.storage.sync.
function save_options() {


  var serverUrl = document.getElementById('serverUrl').value;
  var enableme = document.getElementById('enableme').checked;
  chrome.storage.sync.set({
    enableme: enableme,
    serverUrl: serverUrl
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });

}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.

  chrome.storage.sync.get({
    enableme: false,
    serverUrl: "http://localhost:3000"
  }, function(items) {
    //document.getElementById('color').value = items.favoriteColor;
    document.getElementById('enableme').checked = items.enableme;
    document.getElementById('serverUrl').value = items.serverUrl;
  });
}

document.addEventListener('DOMContentLoaded', function(){
  restore_options();
  document.getElementById("save").addEventListener("click", save_options);
}
);
