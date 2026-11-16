---
title: How to use Abinit container image?
linkTitle: Abinit tutorial
weight: 4
category: scientific-computing
icon: icon-abinit
description: "Tutorial on using the DIAMOND Abinit container image with Apptainer or Docker: pulling the image, running calculations, and usage examples for DFT computations."
---

{{< callout context="note" title="Prerequisites" >}}

- Apptainer (see either [our installation guide]({{% ref "/documentation/install/install-apptainer" %}}) or [the official documentation](https://apptainer.org/docs/user/latest/quick_start.html#installation)) or Docker (see [the official installation guide](https://docs.docker.com/engine/install/))
- The [input files](/downloads/abinit-tutorial-inputs.tar.gz)

{{< /callout >}}

For more information on Apptainer containers and their use, we provide [a description of Apptainer]({{% ref "/documentation/use/apptainer" %}}), a crash course on [how to use Apptainer]({{% ref "/documentation/use/apptainer-image" %}}), and of course there's also the [official Apptainer's documentation](https://apptainer.org/docs/user/latest/).

{{< callout context="tip" title="Apptainer or Docker?" icon="tabler-icons/outline/help-circle" >}}

Every command on this page is given for both Apptainer and Docker: pick your tool in any of the tabs below and the whole page follows your choice. Docker is fine for trying the image on your own computer, but on clusters you should use Apptainer ([why?]({{% ref "/faqs" %}}#why-not-docker)).

{{< /callout >}}

## Container image

Retrieve the Abinit image:

{{< tabs "abinit-pull" >}}
{{< tab "Apptainer" >}}
```bash
apptainer pull abinit.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/abinit.sif:latest
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker pull gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/abinit
docker tag gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/abinit abinit
```

The second command gives the image the short name `abinit`, which is used in the rest of this tutorial.
{{< /tab >}}
{{< /tabs >}}

## Input files

To illustrate the various commands, a set of Abinit input files is available in the form of an archive via [this link](/downloads/abinit-tutorial-inputs.tar.gz).

Those files correspond to a tutorial example from the Abinit [official documentation](https://docs.abinit.org/tutorial/base1/). The archive contains the following files:

- `H.psp8`: pseudopotentials for the hydrogen atom,
- `input.abi`: Abinit input file.

In this tutorial, we will assume that the input files contained in this archive are in the current directory. To extract them:

```bash
tar -xzf abinit-tutorial-inputs.tar.gz
```

## Quickstart

For impatient folks, here is how to launch a parallel Abinit computation on `N` cores, in the case where the current directory contains all necessary Abinit input files:

{{< tabs "abinit-quickstart" >}}
{{< tab "Apptainer" >}}
The `abinit.sif` image is assumed to be in the current directory.

```bash
apptainer exec abinit.sif mpirun -np <N> abinit input.abi
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker run --rm --entrypoint "" -u $(id -u):$(id -g) -v "$PWD":/work -w /work abinit mpirun -np <N> abinit input.abi
```

Here, `-v "$PWD":/work -w /work` makes the current directory available inside the container and runs the computation from there, `-u $(id -u):$(id -g)` ensures output files belong to you rather than to `root`, and `--rm` deletes the container once the computation is over. On systems using SELinux (Fedora, RHEL…), append `:z` to the volume (`-v "$PWD":/work:z`) if you get "Permission denied" errors.
{{< /tab >}}
{{< /tabs >}}

## Detailed usage for the Abinit container

This section presents different ways to use the Abinit image. For more details about Apptainer commands, please look at [this tutorial]({{% ref "/documentation/use/apptainer-image/#apptainer--crash-course" %}}).

### Introduction

Abinit is an MPI-parallelized open-source software suite for computing material properties via density functional theory (DFT).

The main executable in the image is the `abinit` executable. The code license can be found under the following path: `/share/doc/abinit-10.4.7/COPYING`, and can be accessed from outside the container as follows:

{{< tabs "abinit-license" >}}
{{< tab "Apptainer" >}}
```bash
apptainer exec abinit.sif cat /share/doc/abinit-10.4.7/COPYING
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker run --rm --entrypoint "" abinit cat /share/doc/abinit-10.4.7/COPYING
```

The image's default command is `abinit`; setting `--entrypoint ""` allows running any other command inside the container.
{{< /tab >}}
{{< /tabs >}}

### Running a sequential computation

The input file `input.abi` allows us to get the pseudo total energy, the bond length, the charge density and the atomisation energy of the $H_2$ molecule following the [official documentation tutorial](https://docs.abinit.org/tutorial/base1/). Once the input files have been extracted, Abinit can be run on a single core as follows:

{{< tabs "abinit-sequential" >}}
{{< tab "Apptainer" >}}
```bash
apptainer run abinit.sif input.abi
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker run --rm -u $(id -u):$(id -g) -v "$PWD":/work -w /work -e PWD=/work abinit input.abi
```

Abinit requires the `PWD` environment variable, which is not defined when `abinit` is launched directly as the image's default command: `-e PWD=/work` sets it.
{{< /tab >}}
{{< /tabs >}}

### Using the Abinit container for parallel runs

The same computation can be run in parallel on `N` cores as follows:

{{< tabs "abinit-parallel" >}}
{{< tab "Apptainer" >}}
```bash
apptainer exec abinit.sif mpirun -np <N> abinit input.abi
```

The command above uses Apptainer "embedded" parallel mode. More information on using Apptainer containers in parallel, including usage on clusters and the difference between embedded and hybrid parallel modes, can be found on [this page]({{% ref "/documentation/use/apptainer-hpc" %}}).
{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker run --rm --entrypoint "" -u $(id -u):$(id -g) -v "$PWD":/work -w /work abinit mpirun -np <N> abinit input.abi
```

{{< callout context="caution" icon="tabler-icons/outline/alert-triangle" >}}
With Docker, parallel runs are limited to the cores of a single machine. Docker is not integrated with job schedulers such as SLURM or OAR, so it cannot be used for computations on clusters: use Apptainer instead ([why?]({{% ref "/faqs" %}}#why-not-docker)).
{{< /callout >}}
{{< /tab >}}
{{< /tabs >}}
