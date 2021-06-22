---
layout: default
title: Creating an experiment
parent: Guides
nav_order: 30
---

# Setting up a new experiment

The main aim of sparcl is to consume content from the AR Cloud. To make this as easy and enjoyable as possible for the end user is clrearly the highest priority for the development process of sparcl. 

One important requirement for this is, to make sure the content received from an AR Cloud provider is displayed correctly, and it can be used as intendet. For this, sparcl offers separate modes to help with content creation and development. While we think that these modes are quite useful as they are, because they take away any dependency on a correctly set up server configuration, they might be too inflexible for some requirements.

This is why sparcl also offers the possibility to write experiments, which removes any restrictions. The developer can use the functionality sparcl offers or create something completely new, like replacing the XR or 3D engine.

This guide wants to get you started quickly with a new experiment. Feel free to have a look at the [description of the architecture](https://openarcloud.github.io/sparcl/architecture/experiments.html) behind this functionality.


## Add the submodule for the experiment

Source code of an experiment has to come from a separate repository. [Git submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules) look like a perfect fit for this requirement. While they seem to have a negative reputation in the community, the positives outweight the negatives as the submodules are used for experiments. Maybe the article ['Working with submodules'](https://github.blog/2016-02-01-working-with-submodules/) helps to get comfortable with them.

- Create a fork of sparcl's repository and clone it (replace `<user>` with your Git username)

    `git clone https://github.com/<user>/sparcl`

- Create a new repository for your experiment
- Open a terminal with the path set to sparcl's project folder and add the submodule (replace `<user>`, `<repository>` and `<shorthand>` with your actual values). 

    `git submodule add https://github.com/<user>/<repository> src/experiments/<shorthand>`

Let's use 'oarc', 'sparcl_experiment' and 'arc' as values for this guide: 

    `git submodule add https://github.com/oarc/sparcl_experiments src/experiments/arc`
  
This creates the submodule in the folder `/src/experiments/<shorthand>`. This is the folder where the experiments can be implemented. Feel free to choose any unique shorthand for your submodule. That way you can also add experiment submodules from others.
  
The submodule command creates 2 new files: .gitmodules and a file representing your experiment repository. Feel free to save these files to your fork if you wish. But these files should not be pushed to the original sparcl repository.


## Register the experiment

The experiment to use is selected in the [Dashboard](https://openarcloud.github.io/sparcl/glossary.html#dashboard). sparcl comes with `/src/experiments/Selector.svelte`, an example component to choose an experiment using a select HTML element. You're free to change this file in any way you wish, as long as `Promises` of svelte components are sent to the dashboard.

When using the `Selector.svelte`, add your experiment to the `EXPERIMENTTYPES` object. Let's say the name of the new experiment is 'Particles':

```svelte
    const EXPERIMENTTYPES = {
        // TODO: Enter a key/value pairs for experiments. 
        particle: 'Particle'
    };
```

When opening the dashboard, the experiment entry is displayed when selecting AR mode `Experiment`

![image](https://user-images.githubusercontent.com/231274/122954595-ddc64d00-d37f-11eb-9c5f-7cd7cc9bc549.png)


## Add `Settings` and `Viewer` component files

The next step is to define settings for the experiment. The Javascript framework used for sparcl is svelte. While there is an intention to use Web Components in sparcl in the future, for now a svelte components is needed to define the settings. This file needs to be added to `src/experiments/<shorthand>/<experimentid>`. With the value of 'arc' for `<shorthand>` and 'particle' for the `experimentid`, the full path for the file looks like this:

    /src/experiments/arc/particle/Settings.svelte


## Providing settings

A simple settings component could be as simple as this:

```svelte
<dl class="radio">
    <dt>Lifetime</dt>
    <dd>
        <input id="lt5" type="radio" value="500" />
        <label for="lt5">500ms</label>
    </dd>
    <dd>
        <input id="lt10" type="radio" value="1000" />
        <label for="lt10">1000ms</label>
    </dd>
</dl>
```

sparcl handles the actual settings automatically. To take advantage of this, the settings component can receive the settings for the specific experiment simply by exporting a field called settings and binding it to the form elements. As a bonus, feel free to define defaults for your settings.

```svelte
<script>
    export let settings;

    if (Object.keys(settings).length === 0) {
        settings.lifetime = '500';
        settings.translucent = false;
    }
</script>

<dl class="radio">
    <dt>Lifetime</dt>
    <dd>
        <input id="lt5" type="radio" bind:group={settings.lifetime} value="500" />
        <label for="lt5">500ms</label>
    </dd>
    <dd>
        <input id="lt10" type="radio" bind:group={settings.add} value="1000" />
        <label for="lt10">1000ms</label>
    </dd>

    <dt>
        <input id="translucent" type="checkbox" bind:checked={settings.translucent} />
        <label for="translucent">Translucent</label>
    </dt>
</dl>
```


## Implementing the viewer
