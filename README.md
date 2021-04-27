# SPatial AR CLout `<viewer>`

This application started as a technology preview for the IEEE VR 2021 workshop from the Open AR Cloud association. The ideas behind this preview have been received positively, so development will continue.

The general idea is to create a generic client application, providing all the basic functionality needed to offer entertaining and inspiring AR experiences. It uses the concepts defined by Open AR Cloud to find available services and content at the  current location of the user.

As additional functionality, the application implements data synchronisation using automerge over p2p network using peerjs and perge. The applications connect to the p2p network automatically when allowed by the user.

Loads of ideas for additional base functionalities are available. All of this is easily available to AR scenes created with any 3D platform or game engine that exports to WebXR. Please check out the [documentation](https://openarcloud.github.io/sparcl/) for more detailed information.

**Any Feedback, recommendations and contributions of any kind are very welcome**

## Development

npm needs to be installed, because dependencies are handled with it. 

Steps to setup the project: 
* clone this repository
* run `npm install` in the project folder to download the dependencies
* run `npm run start`
* note the URL shown in the terminal after the server started
* Set up [remote debugging](https://developer.chrome.com/docs/devtools/remote-debugging/) with [port forwarding](https://developer.chrome.com/docs/devtools/remote-debugging/local-server/)

* open Chrome on an AR capable device, enter `chrome://flags` and enable _WebXR Incubations_
* enter the ULR shown in the terminal in the browser on the device 

There is an unfortunate problem with peerjs. Open the `node_modules\peerjs\dist\peerjs.min.js` file and paste this to the top:
```javascript
window.global = window; 
var parcelRequire;
```
