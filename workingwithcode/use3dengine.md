---
layout: default
title: Using the 3D engine
parent: Working with code
nav_order: 50
---

# Using the default 3D engine

[OGL](https://github.com/oframe/ogl) was seleceted as the default 3D engine for sparcl, because it is very small and still manages to hide away the specifics of [WebGL](https://www.khronos.org/webgl/). 

The idea is, that the 3D engine can 'easily' be replaced by another one, but still being able to use the default `Viewer` and XR engine. For this we will have some kind of API defined. This is not the accomplished so far, unfortunately. 

To give you an overview what can be used right now, we added a list with currently available functions. Please be aware that this is likely to change, because it doesn't make much sense so far :(

```svelte
init()
addModel(position, orientation, url)
addObject(position, orientation, description)
addPlaceholder(keywords, position, orientation)
addExperiencePlaceholder(position, orientation)
remove(3dObject)
clearScene()
render(time, view)
stop()

addClickEvent(3dobject, handlerFunction)
addExperiencePlaceholder(position, orientation)
getExternalCameraPose(view, matrix)
setWaiting(3dObject)


// Don't use. Will change or being removed
addAxes()
beginSpatialContentRecords()
endSpatialContentRecords()
addSpatialContentRecord()
convertGeoPoseToLocalPose()


```
