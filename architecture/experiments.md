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

There are many ways to implement the Selector. The provided implementation serves just as a sample to make registering an experiment as easy as possible. It provides a select element to choose an experiment as an example. A list, radio boxes could've also be used. 

Just fill in key/value pairs into the object EXPERIMENTTYPES for your experiments, which are then filled into the select element automatically.

```javascript
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

```javascript
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

    dispatch('change', viewerPromise);
}
```

The settings will then be automatically displayed right below the selector when the experiment is selected. The viewer implementation for the experiment is returned as a promise that will be resolved when the AR session is started.

Unfortunately, import functions only allow string literals as parameter, no variables allowed. So they need to be added as shown above.


## Required files for experiment
- Settings
- Viewer

## Dashboard integration
- Selector
- Settings

## Instantiation
- Selector
- Settings

## Setup
- startAR
- startSession
- Callbacks
-- nopose
-- update
-- session end
