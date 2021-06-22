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

- Create a new repository for the experiment
- Open a terminal with the path set to sparcl's project folder and add the submodule (replace `<user>`, `<repository>` and `<shorthand>` with your actual values)

    `git submodule add https://github.com/<user>/<repository> src/experiments/<shorthand>`
  
This creates the submodule in the folder `/src/experiments/<shorthand>`. This is the folder where the experiments can be implemented. Feel free to choose any unique shorthand for your submodule. That way you can also add experiment submodules from others.
  
The submodule command creates 2 new files: .gitmodules and a file representing your experiment repository. Feel free to save these files to your fork. But these files should not be pushed to the original sparcl repository.

## Add `Settings` and `Viewer` component files




## Register the experiment

The experiment to use is selected in the [Dashboard](https://openarcloud.github.io/sparcl/glossary.html#dashboard). 


## Providing settings




## Implementing the viewer
