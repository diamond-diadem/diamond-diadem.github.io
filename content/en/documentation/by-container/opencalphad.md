---
title: How to use OpenCalphad Apptainer image?
linkTitle: OpenCalphad tutorial
weight: 8
description: "Tutorial on using the DIAMOND OpenCalphad Apptainer container: pulling the image, running calculations, and usage examples for phase diagrams computation."
---

<div align="justify">

{{< callout context="note" title="Prerequisites" icon="tabler-icons/outline/info-circle" >}}

- Have **Apptainer** installed [(installation guide)](/en/documentation/install/install-apptainer/)
- Have downloaded the **opencalphad.sif** image [available here](/en/codes/scientific-computing/opencalphad/)
- Have downloaded the **input files** [available here](/downloads/opencalphad-tutorial-inputs.tar.gz)

For more information on Apptainer containers, please look at [this page](/en/about/apptainer/) or refer to [this tutorial](/en/documentation/use/apptainer-image/) to have a quick look at Apptainer's main commands.

{{< /callout >}}


## Input files

To illustrate the various commands, a set of OpenCalphad input files is available in the form of an archive via [this link](/downloads/opencalphad-tutorial-inputs.tar.gz).

Those files are adapted from a tutorial example from the OpenCalphad [official repository](https://github.com/sundmanbo/opencalphad/tree/v.6.0/macros). The archive contains the following files:

- `input.OCM`: an OpenCalphad input file to compute and plot the phase diagram for C-Fe,
- `steel1.TDB`: a database file.

In this tutorial, we will assume that the input files contained in this archive are in the current directory. To extract them:

```bash
tar -xzf opencalphad-tutorial-inputs.tar.gz
```

## Quickstart

For impatient folks, here is how to launch an OpenCalphad computation in the case where the current directory contains the `opencalphad.sif` container image and all necessary OpenCalphad input files:

```bash
apptainer exec opencalphad.sif oc6P input.OCM
```

## Detailed usage for the OpenCalphad container

This section explains how to use the OpenCalphad image to compute and plot the classical phase diagram for C-Fe. For more details about Apptainer commands, please look at [this tutorial](/en/documentation/use/apptainer-image/#apptainer--crash-course).

### Introduction

OpenCalphad is an OpenMP-parallelized open-source software suite designed for thermodynamic calculations in multicomponent systems.

The main executable in the image is the `oc6P` executable. The diagrams produced by OpenCalphad are plotted with the `gnuplot` executable, also embedded in the image.

### Using OpenCalphad on the tutorial example

The input file `input.OCM` allows us to plot the phase diagram for the C-Fe system. It is adapted from the `map1.OCM` example from the *macros* directory of the [official repository](https://github.com/sundmanbo/opencalphad/tree/v.6.0/macros) corresponding to the release version of the software embedded in the container (`v.6.0`). A description of this example can be found in the official [documentation](https://github.com/sundmanbo/opencalphad/blob/v.6.0/documentation/OC-macros.pdf) on page 14, under section 4.3.3: *Phase diagram for C-Fe*.

To run the computation:

```bash
apptainer exec opencalphad.sif oc6P input.OCM
```

This command displays different `gnuplot` diagrams such as a phase diagram for the system where the whole carbon range up to graphite is included and the metastable C-Fe system phase diagram with cementite. After each plot, the user is invited to hit the `Enter` key inside their shell to trigger the next plot. Some of the expected plots are shown in the example [documentation](https://github.com/sundmanbo/opencalphad/blob/v.6.0/documentation/OC-macros.pdf).

At the end of the computation, an interactive shell is opened by OpenCalphad. This shell can be safely closed with the `Ctrl/Command + C` keys combination.

### Running other examples with the OpenCalphad container image

The official [documentation](https://github.com/sundmanbo/opencalphad/blob/v.6.0/documentation/OC-macros.pdf) describes many more simple examples to expose the abilities of the OpenCalphad software. The associated input files can be found in the [macros](https://github.com/sundmanbo/opencalphad/tree/v.6.0/macros) directory of the release repository. A minor adaptation is required to run those examples with the containerized version of the software. To allow a `.OCM` macro to be run with the OpenCalphad container image, simply add the following lines at the very beginning of the script:

```txt
enter gnuplot_term
SCREEN
x11 size 600,500 font "Arial,16"
```

These lines ensure that `gnuplot` uses the `X11` window system instead of the `Qt` library which is not embedded in the container.

In most of the example scripts, the `@&` keyword is used at multiple places to pause the execution until a key is pressed. These commands can be safely deleted for convenience when they are not placed between two plots. Otherwise, when they do separate plots, these pauses should not be deleted as doing so would make `gnuplot` display the same diagram twice in a row.

Similarly, the `set inter` command at the end of an OpenCalphad script is responsible for triggering the interactive shell at the end of the script execution. Deleting this command makes the executable exit with an error at the end of a script.

</div>
