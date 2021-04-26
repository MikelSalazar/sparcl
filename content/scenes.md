---
layout: default
title: 3D Scenes
parent: Content
nav_order: 3
---

# WebGL scenes

sparcl can import 3D scenes created with 3D frameworks and game engines exported to WebGL. They are loaded into an iframe, placed on top of the WebXR canvas. 

To make this work, only some simple preparations need to be made:
* the html containing it needs to have transparent backgrounds
* sending an event of type 'loaded' to sparcl
* receiving an event of type 'pose' to receive the current camera position from sparcl

The complete flow between sparcl and the imported scene looks like this:
![image](https://user-images.githubusercontent.com/231274/116106498-727b3a00-a6b2-11eb-8367-615c423f7c31.png)

tbc...
