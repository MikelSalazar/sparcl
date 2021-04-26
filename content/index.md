---
layout: default
title: Content
nav_order: 10
has_children: true
---

# Details about the content types handled by sparcl

sparcl supports different content with different functionality and levels of difficulty to prepare. 

The simplest content type are the placeholders. So called because the record in the content discovery doesn't link to an actual 3D object, but defines it. The actual 3D object is generated client side by sparcl.

Placeholders will be highly configurable through the record stored in the content discovery ([scr](https://openarcloud.github.io/sparcl/guides/developmentmode.html)). A property will be added to the scr soonish to hold such definitions in key / value pairs. This isn't implemented, yet, but will likely be one of the next features to be worked on.

These will include definitions for:
* type:  billboard, sign post
* style: color, rotation
* interaction: click, ...

The idea here is, to keep these objects as lightweight as possible, because there might be loads of them in the AR scene at the same time.
