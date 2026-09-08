---
title: How to use NWChem Apptainer image?
linkTitle: NWChem tutorial
weight: 1
description: "Tutorial on using the DIAMOND NWChem Apptainer container: pulling the image and usage example for geometry optimization."
---

<div align="justify">

{{< callout context="note" title="Prerequisites" icon="tabler-icons/outline/info-circle" >}}

- Have **Apptainer** installed [(installation guide)](/en/documentation/install/install-apptainer/)
- Have downloaded the **nwchem.sif** image [available here](/en/codes/scientific-computing/nwchem/)
- Have downloaded the **input files** [available here](/downloads/nwchem-tutorial-inputs.tar.gz)

For more information on Apptainer containers, please look at [this page](/en/about/apptainer/) or refer to [this tutorial](/en/documentation/use/apptainer-image/) to have a quick look at Apptainer's main commands.

{{< /callout >}}


## Input files

To illustrate the various commands, a NWChem input files is available in the form of an archive via [this link](/downloads/nwchem-tutorial-inputs.tar.gz). This file corresponds to a tutorial example from the NWChem [Getting Started](https://nwchemgit.github.io/Getting-Started.html#water-molecule-sample-input-file) page.

In this tutorial, we will assume that the input file contained in this archive is in the current directory. To extract it:

```bash
tar -xzf nwchem-tutorial-inputs.tar.gz
```

## Quickstart

For impatient folks, here is how to launch a NWChem geometry optimization computation using the container image in the case where the current directory contains the `nwchem.sif` container image and all necessary NWChem input files:

```bash
apptainer exec nwchem.sif nwchem nwchem.nw > output.txt
```

## Detailed usage for the NWChem container

This section explains how to use the NWChem image. For more details about Apptainer commands, please look at [this tutorial](/en/documentation/use/apptainer-image/#apptainer--crash-course).

### Introduction

NWChem is a parallelized open-source software designed to perform calculations on chemical systems ranging from small molecules to solid-state materials and macromolecules. It provides a comprehensive suite of computational methods, including quantum mechanics (ab initio, DFT), molecular dynamics, and multi-scale simulations.

The main executable in the image is the `nwchem` executable.

### Description of the example simulation

The present input file `nwchem.nw` is extracted from the [Getting Started](https://nwchemgit.github.io/Getting-Started.html#water-molecule-sample-input-file) example titled *Water Molecule Sample Input File*. As described in this page, the simulation consists in optimizing a positively charged water molecule using second-order Møller-Plesset perturbation theory (MP2), followed by a computation of frequencies at the optimized geometry. A preliminary SCF geometry optimization is performed using a computationally inexpensive basis set (STO-3G) as an initialization to MP2 method.

The [Getting Started](https://nwchemgit.github.io/Getting-Started.html#water-molecule-sample-input-file) documentation page provides an explanation for the different directives present in the `nwchem.nw` input file. Below is a short description of the directives used in the file:

- The `start` directive indicates that this run is to be started from the beginning and not restarted from already present output files,
- the `charge` directive defines the total charge of the system,
- the `basis` directive defines a basis set,
- the `task` directive specifies a computation to be made, for example, `task mp2 optimize` runs a MP2 optimization using the previously defined basis. 

### Running the simulation

The following command runs the NWChem simulation using the `nwchem.sif` container image:

```shell
apptainer exec nwchem.sif nwchem nwchem.nw > output.txt
```

By default, the simulation is run in parallel on as many threads as possible using OpenMP. A different number `N` of threads can be specified with the following command:

```shell
apptainer exec --env "OMP_NUM_THREADS=<N>" nwchem.sif nwchem nwchem.nw > output.txt
```

The `> output.txt` at the end of the command captures the logs of the simulation that would otherwise be written in the current shell. Once the simulation is over, this file can be read by any classical text editor software. The output file contains a lot of information, such as the code version and license, the number of threads used for the simulation, the total execution time, as well as various quantities computed by the software.

### To go further

The [Getting Started](https://nwchemgit.github.io/Getting-Started.html#water-molecule-sample-input-file) and the [official documentation](https://nwchemgit.github.io/index.html) pages contain multiple examples and tutorials presenting how to use the features of the software. Interested readers can easily extrapolate the commands shown in this tutorial to run those examples.

</div>
