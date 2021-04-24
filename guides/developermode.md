---
layout: default
title: Development Mode
parent: Guides
nav_order: 3
---

# Setup needed to use the development mode to simplify usage of spARcl during development

During development it can become pretty annoying when relocalisation of the device is needed after every reload of the app. While it's fast over Wifi, but it's a repitive task taht gets boring fast. The need to use the tools of the discovery services in use definitely kills the development flow.

The development mode gets rid of both requirements. As there is no localisation done, content is automatically placed around the first pose reported from WebXR.

Setup is pretty easy:
* Open Dashboard
* Find setting for `ARMode` in `Application state`
* Select `Development`

That's it.

The content record that is used in this mode, can be found in the source file `src/core/locationTools.js`. The constant to look for is `fakeLocationResult`.

The format of the content record is defined in the OSCP [Spatial Content Discovery repository](https://github.com/OpenArCloud/oscp-spatial-content-discovery).
