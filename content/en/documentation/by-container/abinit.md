---
title: How to use Abinit Apptainer image?
linkTitle: Abinit tutorial
weight: 4
description: "Tutorial on using the DIAMOND Abinit Apptainer container: pulling the image, running calculations, and usage examples for DFT computations."
---

<div align="justify">

{{< callout context="note" title="Prerequisites" >}}

- Apptainer (see either [our installation guide]({{% ref "/documentation/install/install-apptainer" %}}) or [the official documentation](https://apptainer.org/docs/user/latest/quick_start.html#installation))
- The [`abinit.sif` image]({{% ref "/codes/scientific-computing/abinit/" %}})
- The [input files](/downloads/abinit-tutorial-inputs.tar.gz)

{{< /callout >}}

For more information on Apptainer containers and their use, we provide [a description of Apptainer]({{% ref "/documentation/use/apptainer" %}}), a crash course on [how to use Apptainer]({{% ref "/documentation/use/apptainer-image" %}}), and of course there's also the [official Apptainer's documentation](https://apptainer.org/docs/user/latest/).


## Input files

To illustrate the various commands, a set of Abinit input files is available in the form of an archive via [this link](/downloads/abinit-tutorial-inputs.tar.gz).

Those files correspond to a tutorial example from the Abinit [official documentation](https://docs.abinit.org/tutorial/base1/). The archive contains the following files:

- `H8.psp8`: pseudopotentials for the hydrogen atom,
- `input.abi`: Abinit input file.

In this tutorial, we will assume that the input files contained in this archive are in the current directory. To extract them:

```bash
tar -xzf abinit-tutorial-inputs.tar.gz
```

## Quickstart

For impatient folks, here is how to launch a parallel Abinit computation on `N` cores using the container image in the case where the current directory contains the `abinit.sif` container image and all necessary Abinit input files:

```bash
apptainer exec abinit.sif mpirun -np <N> abinit input.abi
```

## Detailed usage for the Abinit container

This section presents different ways to use the Abinit image. For more details about Apptainer commands, please look at [this tutorial]({{% ref "/documentation/use/apptainer-image/#apptainer--crash-course" %}}).

### Introduction

Abinit is an MPI-parallelized open-source software suite for computing material properties via density functional theory (DFT).

The main executable in the image is the `abinit` executable. The code license can be found under the following path: `/share/doc/abinit-10.4.7/COPYING`, and can be accessed from outside the container as follows:

```bash
apptainer exec abinit.sif cat /share/doc/abinit-10.4.7/COPYING
```

### Using the Abinit container for parallel runs

The input file `input.abi` allows us to get the pseudo total energy, the bond length, the charge density and the atomisation energy of the $H_2$ molecule following the [official documentation tutorial](https://docs.abinit.org/tutorial/base1/). Once the input files have been extracted, Abinit can be run in parallel on `N` cores as follows:

```bash
apptainer exec abinit.sif mpirun -np <N> abinit input.abi
```

The command above uses Apptainer "embedded" parallel mode. More information on using Apptainer containers in parallel, including usage on clusters and the difference between embedded and hybrid parallel modes, can be found on [this page]({{% ref "/documentation/use/apptainer-hpc" %}}).

</div>
