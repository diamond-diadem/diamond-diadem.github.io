---
title: How to use the GPUMD Apptainer image?
linkTitle: GPUMD tutorial
weight: 3
---

<div align="justify">

{{< callout context="note" title="" icon="tabler-icons/outline/info-circle" >}}

Before starting, you need to have Apptainer installed on your machine; see [this link](/en/documentation/install/install-apptainer/) for more details.

This tutorial focuses on using the GPUMD container image. GPUMD stands for **Graphics Processing Units Molecular Dynamics** and is a molecular dynamics package implemented for GPUs. For further information about GPUMD, its input files, and the available keywords, please refer to the [official GPUMD documentation](https://gpumd.org/).

The image contains the following tools:

- `gpumd`, the molecular dynamics executable;
- `nep`, the Neuroevolution Potential executable;
- `NepTrainKit`, a toolkit for preparing and analysing NEP training data.

For more information on Apptainer containers, please look at [this page](/en/about/apptainer/).

To have a quick look at Apptainer's main commands, you may refer to [this tutorial](/en/documentation/use/apptainer-image/).

{{< /callout >}}

## Recovering the image

The GPUMD image is distributed as an Apptainer image (`.sif` file format). The image is a relocatable and renamable file, so we recommend putting it in a dedicated directory to easily find it. While it can be any directory, in this tutorial we will assume you put it in `$HOME/apptainer-images`:

```bash
mkdir -p $HOME/apptainer-images
apptainer pull $HOME/apptainer-images/gpumd.sif \
  oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/gpumd.sif:latest
```

If you prefer to keep the name used during download, you can also run:

```bash
apptainer pull gpu.sif \
  oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/gpumd.sif:latest
mkdir -p $HOME/apptainer-images
mv gpu.sif $HOME/apptainer-images/gpumd.sif
```

In the rest of this tutorial, we suppose that the image is available at:

```bash
$HOME/apptainer-images/gpumd.sif
```

## Input files for the liquid Indium example

To illustrate the different commands, a set of GPUMD input files is provided for a molecular dynamics example in liquid Indium. The files can be downloaded via [this link](/downloads/gpumd-tutorial-inputs.tar.gz) and are as follows:

- `run.in` is the main GPUMD input file. It defines the simulation protocol and the GPUMD commands to execute.
- `model.xyz` contains the initial atomic structure used by the simulation.
- `nep.txt` contains the NEP potential used to describe the interactions in the system.

In this tutorial, we will assume that these files are in the current directory:

```bash
ls
# expected files: nep.txt  model.xyz  run.in
```

**Disclaimer**

> The commands presented here are for using the `gpumd` executable. To call another executable included in the image, such as `nep` or `NepTrainKit`, use `apptainer exec <options> <image> <executable-name>`.

## One liner command

For impatient folks, here is how to launch the GPUMD liquid Indium example using the container image, previously downloaded and stored in `$HOME/apptainer-images/gpumd.sif`:

```bash
apptainer exec --nv $HOME/apptainer-images/gpumd.sif gpumd
```

The `--nv` flag gives the container access to NVIDIA GPU devices and drivers from the host. If you reprocuced this image for a system where GPU access is handled differently, adapt this flag to the local Apptainer/GPU configuration.

## Detailed usage for the GPUMD container

This section presents different ways to use the GPUMD image. For more details about Apptainer commands, please look at [this tutorial](/en/documentation/use/apptainer-image/#apptainer-crash-course).

### Using the GPUMD container

To run GPUMD without any container, one would use the following command:

```bash
gpumd
```

where all GPUMD input files, including `run.in`, `model.xyz`, and `nep.txt`, are stored in the current directory.

To do the same inside a container, we can run three equivalent commands. In each case, we suppose the Apptainer image `gpumd.sif` can be found at `$HOME/apptainer-images/gpumd.sif`.

- One can use `apptainer exec` to execute a specific command in the container.

```bash
apptainer exec --nv $HOME/apptainer-images/gpumd.sif gpumd
```


### Accessing the other executables in the image

The image also contains `nep` and `NepTrainKit`. These programs are not the container's default command, so they must be launched with `apptainer exec`.

For example, to call the `nep` executable:

```bash
apptainer exec --nv $HOME/apptainer-images/gpumd.sif nep
```

To call `NepTrain` from NepTrainKit:

```bash
apptainer exec --nv $HOME/apptainer-images/gpumd.sif NepTrain
```

For the expected input files and options of `gpumd` and `nep`, please refer to the [GPUMD documentation](https://gpumd.org/).


### Display help and metadata

To display the container's help message, supposing the image is stored at `$HOME/apptainer-images/gpumd.sif`:

```bash
apptainer run-help $HOME/apptainer-images/gpumd.sif
```

To display the container's metadata, such as code owner, version, or image author:

```bash
apptainer inspect $HOME/apptainer-images/gpumd.sif
```

### Partial or total isolation

By default, Apptainer does not fully isolate the container from the host system. One can either have partial or total isolation using respectively the flags `--no-mount` or `--no-home` and `--containall` (see [this link](/en/documentation/use/apptainer-isolation-flags/) for more information).

Whenever `--containall` is activated, the directory on the host machine containing the GPUMD input files cannot be accessed from the container unless it is explicitly mounted.

```bash
apptainer exec --nv --containall $HOME/apptainer-images/gpumd.sif gpumd # run.in not found!
```

It is then required to manually mount the directory containing `run.in`, `model.xyz`, and `nep.txt` using the `--bind` flag. For instance, if the input files are in the current directory:

```bash
apptainer exec \
  --nv \
  --containall \
  --bind $PWD:/work \
  --pwd /work \
  $HOME/apptainer-images/gpumd.sif \
  gpumd
```

## Exercises

### First exercise

How to recover the GPUMD container image from the registry and store it in `$HOME/apptainer-images/gpumd.sif`?

**Data**

> - The image must be stored at: `$HOME/apptainer-images/gpumd.sif`
> - The image is available from the ORAS registry address shown in this tutorial.

Example of a possible answer:

```bash
mkdir -p $HOME/apptainer-images
apptainer pull $HOME/apptainer-images/gpumd.sif \
  oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/gpumd.sif:latest
```

### Second exercise

How to use the container image to run the GPUMD liquid Indium example?

**Data**

> - The image is located at: `$HOME/apptainer-images/gpumd.sif`
> - Input files `nep.txt`, `model.xyz`, and `run.in` are located in the current directory: `$PWD`

Possible answer:

- `apptainer exec --nv $HOME/apptainer-images/gpumd.sif gpumd`

### Third exercise

How to use the container image to run the GPUMD liquid Indium example while fully isolating the container from the host system?

**Data**

> - The image is located at: `$HOME/apptainer-images/gpumd.sif`
> - Input files `nep.txt`, `model.xyz`, and `run.in` are located at: `$HOME/gpumd-examples/liquid-indium/`

Example of a possible answer:

```bash
apptainer exec \
  --nv \
  --containall \
  --bind $HOME/gpumd-examples/liquid-indium:/work \
  --pwd /work \
  $HOME/apptainer-images/gpumd.sif gpumd
```

### Fourth exercise

How to call the `nep` executable included in the same image?

**Data**

> - The image is located at: `$HOME/apptainer-images/gpumd.sif`

Example of a possible answer:

```bash
apptainer exec --nv $HOME/apptainer-images/gpumd.sif nep
```

</div>
