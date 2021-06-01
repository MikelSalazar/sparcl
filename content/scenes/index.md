---
layout: default
title: Scenes
nav_order: 1
has_children: true
---

# WebGL scenes

sparcl can import 3D scenes created with 3D frameworks and game engines exported to WebGL. They are loaded into an iframe, placed on top of the WebXR canvas. 

To make this work, only some simple preparations need to be made:
* the html containing it needs to have transparent backgrounds
* sending an event of type 'loaded' to sparcl
```javascript
// Sending a message to the parent window
window.parent.postMessage({type:"loaded"},"*");
```
* receiving an event of type 'pose' to receive the current camera position from sparcl
```javascript
// Receiving messages from the parent window
window.addEventListener("message", msg => {
    console.log(msg.data);
});
```

The pose sparcl sends to the scene is prepared like this. `experienceMatrix` represents the location and orientation of the scene in the WebXR canvas:
```javascript
const cameraMatrix = new Mat4();
cameraMatrix.copy(experienceMatrix).inverse().multiply(view.transform.matrix);

return {
    projection: view.projectionMatrix,
    camerapose: cameraMatrix
}
```

The complete flow between sparcl and the imported scene looks like this:
![image](https://user-images.githubusercontent.com/231274/116106498-727b3a00-a6b2-11eb-8367-615c423f7c31.png)

The lower part of the diagram above shows how an imported scene can send events to sparcl, and sparcl distributes them over a P2P network using automerge.

To make this work, the P2P network needs to be registered with the [service discovery](/sparcl/glossary.html#spatial-service-discovery-ssd), containing the peer ID of an headless client. When sparcl sees that an headless client is available, it connects to it and uses it to distributes the events received from the imported scene. To which events to listen to is announced to sparcl throught the [content record](https://openarcloud.github.io/sparcl/glossary.html#spatial-content-record-scr) of the imported scene.

This will be easy to understand with a sample. Please see the [guide](/sparcl/guides/multiuser.md) for more info. 
