---
layout: default
title: Integrating Experiments
parent: Architecture
nav_order: 20
---

# Integrating Experiments

The main goal of sparcl is, to serve as a proof of concept and as an experimentation platform around the AR Cloud. This document outlines how experiments can be integrated. An important pre-requisite is, that the experiments source needs to be integrated into the sparcl project from a separate repository. There are several ways to do so. The example uses Git submodules.


## Provided files from sparcl
sparcl has by default 2 files in the experiment folder

- **Readme**: General information around experiments and links for further information
- **'Empty' Selector component**: Complete select element to choose an experiment in the dashboard

The Selector is loaded by sparcl into the dashboard. It is the main registration point for an experiment. In its provided form it contains all the HTML and (empty) data structures required to select an experiment:
- Provides the UI to select an experiment
- Dynamically loads the settings and viewer files for the experiment

There are many ways to implement the Selector. The provided implementation serves just as a sample to make registering an experiment as easy as possible. It provides a select element to choose an experiment as an example. A list, radio boxes can also be used. 

Just fill in key/value pairs into the object `EXPERIMENTTYPES` for your experiments, which are then filled into the select element automatically.

```svelte
const EXPERIMENTTYPES = {
    // key: value
};

<select id="experimenttype"
        on:change={(event) => loadSettings(event.target.value)}
        disabled="{Object.keys(EXPERIMENTTYPES).length === 0}">
    <option value="none">None</option>
    {#each Object.entries(EXPERIMENTTYPES) as [key, value]}
        <option value="{key}">{value}</option>
    {/each}
</select>

```

The important function the Selector serves is to dynamically load the settings component (when needed) and viewer implementation (as a ```Promise```) of the experiment. This functionality is provided by the functions `loadSettings` and `loadViewer`. 

```svelte
export async function loadSettings(key) {
    let settings;

    switch (key) {
        case EXPERIMENTTYPES.key:
            settings = await import('@experiments/<subroot>/<experimentname>/Settings');
            break;
        default:
            settings = null;
    }

    dispatch('change', settings?.default);
}

export function loadViewer(key) {
    let viewerPromise;

    switch (key) {
        case EXPERIMENTTYPES.key:
            viewerPromise = import('@experiments/<subroot>/<experimentname>/Viewer');
            break;
        default:
            viewerPromise = null;
    }

    return viewerPromise;
}
```

The settings will then be automatically displayed right below the selector when the experiment is selected. The viewer implementation for the experiment is returned as a promise that will be resolved when the AR session is started.

Unfortunately, import functions only allow string literals as parameter, no variables allowed. So the paths to the selector and viewer need to be added as shown above. Replace the placeholders in the above strings to fit your paths.


## Required files for experiment
There are 2 required files to implement for an experiment

- Settings
  - Defines the UI for the settings to be displayed in the dashboard
- Viewer
  - The entry point to your experiments code

### Settings
No special requirements need to be taken into account for the settings. Very basic component is sufficient. Currently it needs to be a Svelte component, changing this to be a web component is possible. There will be a separate guide on how to get the default styling of the dashboard applied.

```svelte
<script>
    export let settings;
</script>

<dl class="radio">
    <dt>Localisation</dt>
    <dd>
        <input id="xlocalisation" type="checkbox" bind:checked={settings.localisation} />
        <label for="xlocalisation">Required</label>
    </dd>
</dl>
```

As shown in the code above, sparcl provides a `settings` object where the selected settings can be stored. sparcl cares to persist them and provide them to your viewer implementation. All you need to do is to bind this `settings` object to the values of the form objects used.

### Viewer

The viewer file contains the main source for the experiment. When the AR session is started, the function `startAr()` is called. As parameters, sparcl's default implementations for XR and 3D engine are provided. Through them, the complete default functionality of sparcl is available to the experiment. Hopefully this makes it possible to implement the experiment quickly and easily. Viewer functionality as such is available through the imported base `Viewer` component. Its functions are available through the variable `parentInstance`.

While the default XR and 3D engine implementations are provided to the function, feel free to use any other frameworks. Like using Zappar instead to make sparcl work with phone without WebXR compatibility.

Below is kind of a 'hello world' implementation of the viewer. It is the source of the default mode of sparcl, which is completely implemented in the parent viewer. 

The lifecycle functions are:
- startAR()
  - Initialisation of the experiment implementation
- startSession()
  - Initialisation of WebXR, when used, respectively your own implementation for XR
- update()
  - animation loop call, use to update the 3D scene
- noPose();
  - WebXR hasn't found a valid pose for the device
- sessionEnded()
  - Use to release resources

```svelte
<script>
    import Parent from '@components/Viewer';

    let parentInstance;

    export function startAr(thisWebxr, this3dEngine) {
        parentInstance.startAr(thisWebxr, this3dEngine);

        startSession();
    }

    async function startSession() {
        parentInstance.startSession(parentInstance.update, parentInstance.onSessionEnded, parentInstance.onNoPose,
            (xr, result, gl) => {
                xr.glBinding = new XRWebGLBinding(result, gl);
                xr.initCameraCapture(gl);
            },
            ['dom-overlay', 'camera-access', 'anchors', 'local-floor'],
        );
    }
</script>

<Parent bind:this={parentInstance} />
```

When adding the `Parent` component as above, the dom overlay implemented in the parent viewer is displayed. How to use this for an experiment will be introduced in an upcoming guide.
