---
title: How to use abinit Apptainer image?
linkTitle: Abinit tutorial
weight: 1
---

<div align="justify">

{{< callout context="note" title="Prerequisites" icon="tabler-icons/outline/info-circle" >}}

- Have **Apptainer** installed [(installation guide)](/en/documentation/install/install-apptainer/)
- Have downloaded the **abinit.sif** image [available here](/en/codes/scientific-computing/abinit/)
- Have downloaded the **input files** [available here](/downloads/abinit-tutorial-inputs.tar.gz)

For more information on Apptainer containers, please look at [this page](/en/about/apptainer/) or refer to [this tutorial](/en/documentation/use/apptainer-image/) to have a quick look at Apptainer's main commands.

{{< /callout >}}


## Input files

To illustrate the various commands, a set of abinit input files is available in the form of an archive via [this link](/downloads/abinit-tutorial-inputs.tar.gz). 

Those files correspond to a tutorial example from the abinit [official documentation](https://docs.abinit.org/tutorial/base1/). The archive contains the following files:

- `H8.psp8`: pseudo-potentials for the hydrogen atom,
- `input.abi`: abinit input file.

In this tutorial, we will assume that the input files contained in this archive are in the current directory. To extract them:

```bash
tar -xzf abinit-tutorial-inputs.tar.gz
```

## Quickstart

For impatient folks, here is how to launch a parallel abinit computation on `N` cores using the container image in the case where the current directory contains the `abinit.sif` container image and all necessary abinit input files :

```bash
apptainer exec abinit.sif mpirun -np <N> abinit input.abi
```

## Detailed usage for the abinit container

This section presents different ways to use the abinit image. For more details about Apptainer commands, please look at [this tutorial](/en/documentation/use/apptainer-image/#apptainer-crash-course).

### Introduction

Abinit is an MPI-parallelized open-source software suite for computing material properties via density functional theory (DFT). 

The main executable in the image is the `abinit` executable. The code license can be found under the following path: `/share/doc/abinit-10.4.7/COPYING`, and can be accessed from outside the container as follows:

```bash
apptainer exec abinit.sif cat /share/doc/abinit-10.4.7/COPYING
```

### Using the abinit container for parallel runs

The input file `input.abi` allows to get the pseudo total energy, the bond length, the charge density and the atomisation energy of the $H_2$ molecule following the [official documentation tutorial](https://docs.abinit.org/tutorial/base1/). Once the input files have been extracted, abinit can be run in parallel on `N` cores as follows:

```bash
apptainer exec abinit.sif mpirun -np <N> abinit input.abi
```

The command above uses Apptainer "embedded" parallel mode. More information on using Apptainer containers in parallel, including usage on clusters and difference between embedded and hybrid parallel modes, on [this page](/en/documentation/use/apptainer-parallel).

</div>
