---
title: How to use Abinit Docker image?
linkTitle: Abinit tutorial
weight: 4
description: "Tutorial on using the DIAMOND Docker container: pulling the image, running calculations, and usage examples for DFT computations."
---

<div align="justify">

{{< callout context="note" title="Prerequisites" icon="tabler-icons/outline/info-circle" >}}

- Have **Docker** installed
- Have downloaded the **input files** [available here](/downloads/abinit-tutorial-inputs.tar.gz)

{{< /callout >}}

{{< callout context="note" icon="tabler-icons/outline/alert-circle" >}}

Docker is not integrated with job managers. The example here is just for demonstration. For serious usage on clusters, it is strongly recommended to follow [the tutorial](/en/documentation/by-container/abinit) using Apptainer.

{{< /callout >}}

## Pull docker image

Before starting, Docker image need to be pulled and can be tagged for convenience:

```bash
docker pull gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/abinit
docker tag gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/abinit abinit
```

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

For impatient folks, here is how to launch an Abinit computation where the current directory contains all necessary Abinit input files:

```bash
docker run --user $(id -u):$(id -u) -v /home:/home -e PWD -w $PWD abinit input.abi
```

## Detailed usage for the Abinit container

This section presents different ways to use the Abinit image.

### Introduction

Abinit is an MPI-parallelized open-source software suite for computing material properties via density functional theory (DFT).

The main executable in the image is the `abinit` executable. The code license can be found under the following path: `/share/doc/abinit-10.4.7/COPYING`, and can be accessed from outside the container as follows:

```bash
docker run --entrypoint "" abinit cat /share/doc/abinit-10.4.7/COPYING
```

### Using the Abinit container for parallel runs

The input file `input.abi` allows us to get the pseudo total energy, the bond length, the charge density and the atomization energy of the $H_2$ molecule following the [official documentation tutorial](https://docs.abinit.org/tutorial/base1/). Once the input files have been extracted, Abinit can be run in parallel on `N` cores as follows:

```bash
docker run --entrypoint "" --user $(id -u):$(id -u) -v /home:/home -e PWD -w $PWD abinit mpirun -np <N> abinit input.abi
```

By setting `--entrypoint` to empty, we are allowed to launch arbitrary command inside the container. However, since Docker does not subject to the resource restriction imposed by the job managers, so it can't be used with SLURM or OAR. See [here](/en/documentation/faq/#docker-is-also-a-containerization-solution-why-dont-we-just-use-docker) for detailed explanation.

</div>
