# booter ![icon](https://github.com/andrewasfa/booter/blob/master/client/icon.png)

Check out screenshots here: (https://chrome.google.com/webstore/detail/booter/kgpdacpdhakobnbaeodpihkklilhedho)

A chrome extension that executes commands received from a server through [socket.io](https://socket.io/)

The *original goal* of this extension was to automate page reloads on dashboards (Google Slides published as presentation) running on wall monitors around the office. Instead of remoting into each one or even worse - clicking Reload manually, you should be able to type one command in a  and the browser page of each client will reload.

## Structure
### Client
This folder includes files for the Chrome extension.
Chrome extension is the client. It runs in the browser and listens for commands from the server. Currently it's required to _"Load unpacked extension..."_ in Chrome, but that will be changed.

### Server
This folder contains NodeJS server has a web interface (that contains a chat window where you can type your commands). List of commands is further below.
In the future you won't need to use the web interface of the server to type commands, it will integrate to other chat platforms (PureCloud, Slack, etc).

## Get started
### Server
1. Clone or download the repository.
2. Go to the server directory, install NodeJS modules. `cd server`
3. Start the NodeJS server `npm start`
4. Navigate to *http://localhost:3005* and type your commands (make sure there are clients connected if you expect some sort of result)
*Note:* The clients choose which server to connect via the configuration options, so it is assumed safe and no authentication between client server has been added.

### Client
1. Load the extension into Chrome.

    a. You can either load the unpacked extension from the repository folder, or

    b. You can install the latest version of the published unlisted extension: [chrome web store](https://chrome.google.com/webstore/detail/booter/kgpdacpdhakobnbaeodpihkklilhedho)

2. Right-click on the extension and go into *Options*, configure the **server url** and **Enable** the extension.



## Important notes:
1. Make sure to check in `manifest.json` the permissions on which URL's to execute the content scrips.
Currently it's:
```
"content_scripts": [
  {
    "matches": ["http://*/*","https://*/*" ],
    "js": ["/socket.io/socket.io.js", "client.js", "popup.js" ]
```
Which means any HTTP or HTTPS website. Or configure it to lock it down.

2. You may need to allow to run unauthenticated scripts (shield icon in Chrome url bar on the right).


## Supported commands and usage
You can navigate to the server and access the following endpoints:

`{server url}/` - chat interface to type commands

`{server url}/clients` - see the connected clients (array)

### Commands:
Just type the commands in the chat window on the server.
`reload` - reloads the current page

`fullscreen` - sets the current page to fullscreen

`seturl http://yoururl.here` - navigates the current URL in browser to http://yoururl.here


## ToDo
- [done] Make sure the extension runs on all URL types (even if URL cannot be found), otherwise it could cause the client to disconnect and be unrecoverable without manual intervention. (this one should be already done): >>TEST
- [done] Display a list of connected clients on the command page.
- [done] Add ability to configure username on each client for ease for visibility on the server.
- Change URL endpoint for clients and chat to be different (not default `/`)
- Add command to allow change IP of the server in client configuration (server should be able to tell clients if it's about to change IP)
- Add templates to display data nicely about connected users (create copy for the /clients endpoint)
- Fix encrypted connection

<div> Icon made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>
</div>
